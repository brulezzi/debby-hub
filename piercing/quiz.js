/* Quiz de check-in do piercing (substitui o formulario unico).
   Fonte unica de verdade: catalogo-publico (locais + joias compativeis + fase NOVA/TROCA) e os
   tipos de procedimento do CRM (Atendimentos). Grava UM lead em leads_hub com o mesmo formato
   de colunas de antes; o texto de `detalhes` passa a listar um item por linha.
   Depende de script.js (SUPABASE_*, NUMERO_WHATSAPP_ESTUDIO, carregarCatalogo). */
(function () {
  var raiz = document.getElementById('quiz-checkin');
  if (!raiz) return;

  // Tipos de procedimento (espelham TIPOS_PROCEDIMENTO do CRM — Atendimentos.jsx)
  var TIPOS = [
    { id: 'PERFURACAO',     ico: '💎', nome: 'Perfuração nova',      dica: 'Furar um lugar novo' },
    { id: 'TROCA_JOIA',     ico: '🔄', nome: 'Troca de joia',        dica: 'Piercing já cicatrizado' },
    { id: 'MICRODERMAL',    ico: '✨', nome: 'Microdermal',          dica: 'Instalar, trocar topo ou remover' },
    { id: 'SURFACE',        ico: '🔹', nome: 'Surface',              dica: 'Instalar, trocar topo ou remover' },
    { id: 'LOBULOPLASTIA',  ico: '✂️', nome: 'Lobuloplastia',        dica: 'Fechar o lóbulo alargado' },
    { id: 'PIERCING_DENTE', ico: '😁', nome: 'Piercing de dente',    dica: 'Pedra colada no dente' },
    { id: 'REMOCAO',        ico: '🪶', nome: 'Remoção de joia',      dica: 'Tirar o piercing' },
    { id: 'AVALIACAO',      ico: '🤔', nome: 'Ainda não sei',        dica: 'A equipe me orienta no estúdio' }
  ];
  var NOME_TIPO = {};
  TIPOS.forEach(function (t) { NOME_TIPO[t.id] = t.nome; });

  var OPCOES_MICRO = {
    MICRODERMAL: [
      ['Instalação completa (joia inclusa)', 'R$170'], ['Troca de topo', 'R$70'],
      ['Remoção do topo', 'R$20'], ['Remoção total', 'R$50']
    ],
    SURFACE: [
      ['Instalação completa (joia inclusa)', 'R$180'], ['Troca de topo', 'R$70'],
      ['Remoção do topo', 'R$20'], ['Remoção total', 'R$50']
    ]
  };
  var PEDRAS = [['1 pedra', 'R$50'], ['2 pedras', 'R$90'], ['3 pedras', 'R$120'], ['4 pedras', 'R$155']];
  var MATERIAL_LABEL = { ACO: 'Aço Cirúrgico', PVD_GOLD: 'PVD Gold', TITANIO: 'Titânio' };
  var GRUPOS = [['ROSTO', '👃 Rosto'], ['ORELHA', '👂 Orelha'], ['CORPO', '💪 Corpo']];
  var NAO_SEI = 'Ainda não sei — a equipe me ajuda no estúdio';

  var estado = {
    tipos: [], locais: { PERFURACAO: [], TROCA_JOIA: [], REMOCAO: [] },
    joia: {},          // 'PERFURACAO|Helix' -> texto da joia
    propria: {},       // 'TROCA_JOIA|Helix' -> true (leva a joia dela)
    micro: { MICRODERMAL: { opcao: '', qtd: 1 }, SURFACE: { opcao: '', qtd: 1 } },
    lobu: 1, dente: '', primeira: '', pele: '', nome: '', whatsapp: ''
  };
  var catalogo = null, catalogoErro = false, passo = 0, enviando = false;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function evento(nome, extra) {
    try { if (typeof gtag !== 'undefined') gtag('event', nome, extra || {}); } catch (e) {}
  }

  // ---------- catalogo ----------
  function locaisDoCatalogo() {
    if (!catalogo) return [];
    return (catalogo.todos_locais || []).filter(function (l) { return GRUPOS.some(function (g) { return g[0] === l.grupo; }); });
  }
  function acharLocal(nome) {
    return locaisDoCatalogo().filter(function (l) { return l.nome === nome; })[0] || null;
  }
  // Perfuração nova só aceita joia de fase AMBOS; troca aceita AMBOS + TROCA (regra do catálogo)
  function joiasDoLocal(nome, tipo) {
    var l = acharLocal(nome);
    var js = l ? (l.joias_compativeis || []) : [];
    return js.filter(function (j) { return tipo === 'TROCA_JOIA' || j.fase !== 'TROCA'; });
  }

  // ---------- fluxo ----------
  function telas() {
    var t = [{ id: 'tipos' }];
    if (estado.tipos.length && estado.tipos.indexOf('AVALIACAO') === -1) t.push({ id: 'saude' });
    ['PERFURACAO', 'TROCA_JOIA', 'REMOCAO', 'MICRODERMAL', 'SURFACE', 'LOBULOPLASTIA', 'PIERCING_DENTE'].forEach(function (id) {
      if (estado.tipos.indexOf(id) === -1) return;
      if (id === 'PERFURACAO' || id === 'TROCA_JOIA' || id === 'REMOCAO') {
        t.push({ id: 'locais', tipo: id });
        if (id !== 'REMOCAO') estado.locais[id].forEach(function (loc) { t.push({ id: 'joia', tipo: id, local: loc }); });
      } else if (id === 'MICRODERMAL' || id === 'SURFACE') {
        t.push({ id: 'micro', tipo: id });
      } else if (id === 'LOBULOPLASTIA') {
        t.push({ id: 'lobu' });
      } else {
        t.push({ id: 'dente' });
      }
    });
    if (estado.tipos.indexOf('AVALIACAO') !== -1) t.push({ id: 'saude' });
    t.push({ id: 'contato' }, { id: 'resumo' });
    return t;
  }

  function valida(tela) {
    switch (tela.id) {
      case 'tipos': return estado.tipos.length > 0;
      case 'locais': return estado.locais[tela.tipo].length > 0;
      case 'joia':
        if (tela.tipo === 'TROCA_JOIA' && estado.propria['TROCA_JOIA|' + tela.local]) return true;
        return !!estado.joia[tela.tipo + '|' + tela.local];
      case 'micro': return !!estado.micro[tela.tipo].opcao;
      case 'dente': return !!estado.dente;
      case 'saude': return !!estado.primeira && !!estado.pele;
      case 'contato': return estado.nome.trim().length >= 2 && estado.whatsapp.replace(/\D/g, '').length >= 10;
      default: return true;
    }
  }

  // ---------- resumo / texto ----------
  function linhas() {
    var l = [];
    estado.locais.PERFURACAO.forEach(function (loc) {
      l.push('Perfuração nova · ' + loc + ' → ' + (estado.joia['PERFURACAO|' + loc] || NAO_SEI));
    });
    estado.locais.TROCA_JOIA.forEach(function (loc) {
      var p = estado.propria['TROCA_JOIA|' + loc];
      l.push('Troca de joia · ' + loc + ' → ' + (p ? 'joia da própria cliente (R$20)' : (estado.joia['TROCA_JOIA|' + loc] || NAO_SEI)));
    });
    ['MICRODERMAL', 'SURFACE'].forEach(function (id) {
      if (estado.tipos.indexOf(id) === -1) return;
      var m = estado.micro[id];
      l.push(NOME_TIPO[id] + (m.qtd > 1 ? ' ×' + m.qtd : '') + ' → ' + m.opcao);
    });
    if (estado.tipos.indexOf('LOBULOPLASTIA') !== -1) l.push('Lobuloplastia · ' + estado.lobu + (estado.lobu > 1 ? ' furos' : ' furo') + ' (R$50 cada)');
    if (estado.tipos.indexOf('PIERCING_DENTE') !== -1) l.push('Piercing de dente → ' + estado.dente);
    estado.locais.REMOCAO.forEach(function (loc) { l.push('Remoção de joia · ' + loc + ' (R$20)'); });
    if (estado.tipos.indexOf('AVALIACAO') !== -1) l.push('Ainda não sei o que fazer — quero uma avaliação');
    return l;
  }
  function textoDetalhes() {
    var l = linhas();
    return 'QUIZ DO SITE · ' + l.length + (l.length === 1 ? ' item' : ' itens') + '\n' +
      l.map(function (x) { return '• ' + x; }).join('\n') +
      '\nPrimeira vez: ' + estado.primeira + ' | Pele sensível: ' + estado.pele;
  }
  function textoWhats(titanio) {
    var t = 'Olá, vim pelo site da Debby Piercing.\n\nMeu nome é ' + estado.nome.trim() + '.\n\nQuero:\n' +
      linhas().map(function (x) { return '• ' + x; }).join('\n');
    if (estado.primeira === 'sim') t += '\n\nÉ minha primeira vez fazendo piercing.';
    if (estado.pele === 'sim') t += '\nTenho pele sensível / alergia a metal.';
    if (titanio) t += '\n\nGostaria de saber mais sobre as opções em titânio.';
    return t + '\n\nJá vi as informações no site e pretendo ir até o estúdio.';
  }

  // ---------- UI ----------
  var barra, area, rodape;
  function montarEsqueleto() {
    raiz.innerHTML = '';
    var topo = el('div', 'qz-topo');
    barra = el('div', 'qz-barra'); barra.appendChild(el('span'));
    topo.appendChild(barra);
    area = el('div', 'qz-area');
    rodape = el('div', 'qz-rodape');
    raiz.appendChild(topo); raiz.appendChild(area); raiz.appendChild(rodape);
  }

  function chip(texto, ativo, onClick, extraCls) {
    var b = el('button', 'qz-chip' + (ativo ? ' on' : '') + (extraCls ? ' ' + extraCls : ''), texto);
    b.type = 'button'; b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    b.addEventListener('click', onClick);
    return b;
  }
  function cartao(t, ativo, onClick) {
    var b = el('button', 'qz-card' + (ativo ? ' on' : ''));
    b.type = 'button'; b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    b.appendChild(el('span', 'qz-ico', t.ico));
    var tx = el('span', 'qz-card-tx');
    tx.appendChild(el('strong', null, t.nome)); tx.appendChild(el('small', null, t.dica));
    b.appendChild(tx);
    b.addEventListener('click', onClick);
    return b;
  }
  function titulo(txt, dica) {
    area.appendChild(el('h4', 'qz-titulo', txt));
    if (dica) area.appendChild(el('p', 'qz-dica', dica));
  }
  function alternar(lista, v) {
    var i = lista.indexOf(v);
    if (i === -1) lista.push(v); else lista.splice(i, 1);
  }
  function stepper(valor, min, max, onChange) {
    var w = el('div', 'qz-stepper');
    var menos = el('button', null, '−'), mais = el('button', null, '+'), n = el('b', null, String(valor));
    menos.type = mais.type = 'button';
    menos.setAttribute('aria-label', 'Diminuir'); mais.setAttribute('aria-label', 'Aumentar');
    menos.addEventListener('click', function () { if (valor > min) { valor--; n.textContent = valor; onChange(valor); } });
    mais.addEventListener('click', function () { if (valor < max) { valor++; n.textContent = valor; onChange(valor); } });
    w.appendChild(menos); w.appendChild(n); w.appendChild(mais);
    return w;
  }

  function renderTela(tela) {
    area.innerHTML = '';
    if (tela.id === 'tipos') {
      titulo('O que você quer fazer?', 'Pode marcar mais de uma coisa.');
      var g = el('div', 'qz-cards');
      TIPOS.forEach(function (t) {
        g.appendChild(cartao(t, estado.tipos.indexOf(t.id) !== -1, function () {
          if (t.id === 'AVALIACAO') estado.tipos = estado.tipos.indexOf('AVALIACAO') === -1 ? ['AVALIACAO'] : [];
          else {
            estado.tipos = estado.tipos.filter(function (x) { return x !== 'AVALIACAO'; });
            alternar(estado.tipos, t.id);
          }
          renderTela(tela); atualizaRodape();
        }));
      });
      area.appendChild(g);
    } else if (tela.id === 'locais') {
      var rotulo = { PERFURACAO: 'Onde você quer furar?', TROCA_JOIA: 'Em quais piercings você quer trocar a joia?', REMOCAO: 'De quais piercings você quer tirar a joia?' }[tela.tipo];
      titulo(rotulo, 'Marque quantos quiser.');
      if (!catalogo) {
        area.appendChild(el('p', 'qz-dica', catalogoErro ? 'Não consegui carregar a lista agora. Recarregue a página ou fale com a gente no WhatsApp.' : 'Carregando os locais…'));
        return;
      }
      GRUPOS.forEach(function (gr) {
        var ls = locaisDoCatalogo().filter(function (l) { return l.grupo === gr[0]; });
        if (!ls.length) return;
        area.appendChild(el('p', 'qz-grupo', gr[1]));
        var box = el('div', 'qz-chips');
        ls.forEach(function (l) {
          box.appendChild(chip(l.nome, estado.locais[tela.tipo].indexOf(l.nome) !== -1, function () {
            alternar(estado.locais[tela.tipo], l.nome); renderTela(tela); atualizaRodape();
          }));
        });
        area.appendChild(box);
      });
      if (estado.locais[tela.tipo].length) area.appendChild(el('p', 'qz-contagem', 'Selecionados: ' + estado.locais[tela.tipo].join(', ')));
    } else if (tela.id === 'joia') {
      var chave = tela.tipo + '|' + tela.local;
      titulo((tela.tipo === 'TROCA_JOIA' ? 'Nova joia para o ' : 'Qual joia para o ') + tela.local + '?', 'Só aparecem as joias que combinam com esse local' + (tela.tipo === 'PERFURACAO' ? ' em perfuração nova.' : '.'));
      var js = joiasDoLocal(tela.local, tela.tipo);
      var sel = el('select', 'qz-select'); sel.setAttribute('aria-label', 'Joia para ' + tela.local);
      var o0 = el('option', null, 'Escolha uma joia…'); o0.value = ''; o0.disabled = true; sel.appendChild(o0);
      var porMat = {};
      js.forEach(function (j) { (porMat[j.material] = porMat[j.material] || []).push(j); });
      var sensivel = estado.primeira === 'sim' || estado.pele === 'sim';
      if (sensivel) area.appendChild(el('p', 'qz-aviso', '⚑ Para você, o titânio é o material mais indicado (primeira vez ou pele sensível). Mostramos ele primeiro.'));
      var ordem = Object.keys(MATERIAL_LABEL);
      if (sensivel) ordem = ['TITANIO', 'ACO', 'PVD_GOLD'];
      ordem.forEach(function (m) {
        if (!porMat[m]) return;
        var og = document.createElement('optgroup'); og.label = '── ' + MATERIAL_LABEL[m] + ' ──';
        porMat[m].sort(function (a, b) { return a.preco_faixa - b.preco_faixa || a.nome.localeCompare(b.nome, 'pt-BR'); });
        porMat[m].forEach(function (j) {
          var t = j.nome + ' — R$' + j.preco_faixa;
          var o = el('option', null, t); o.value = t; o.dataset.foto = j.foto_url || ''; og.appendChild(o);
        });
        sel.appendChild(og);
      });
      var oN = el('option', null, NAO_SEI); oN.value = NAO_SEI; sel.appendChild(oN);
      sel.value = estado.joia[chave] || '';
      var prev = el('img', 'qz-prev'); prev.alt = ''; prev.hidden = true;
      function mostraFoto() {
        var o = sel.options[sel.selectedIndex];
        if (o && o.dataset && o.dataset.foto) { prev.src = o.dataset.foto; prev.hidden = false; } else prev.hidden = true;
      }
      sel.addEventListener('change', function () { estado.joia[chave] = sel.value; mostraFoto(); atualizaRodape(); });
      if (tela.tipo === 'TROCA_JOIA') {
        var lab = el('label', 'qz-check');
        var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!estado.propria[chave];
        lab.appendChild(cb); lab.appendChild(el('span', null, 'Vou levar a minha própria joia (R$20 a troca)'));
        cb.addEventListener('change', function () { estado.propria[chave] = cb.checked; sel.disabled = cb.checked; atualizaRodape(); });
        sel.disabled = cb.checked;
        area.appendChild(lab);
      }
      area.appendChild(sel); area.appendChild(prev); mostraFoto();
      if (!js.length) area.appendChild(el('p', 'qz-dica', 'Ainda não temos joias vinculadas a esse local no site. Escolha "Ainda não sei" e a equipe te mostra as opções.'));
    } else if (tela.id === 'micro') {
      var m = estado.micro[tela.tipo];
      titulo(NOME_TIPO[tela.tipo] + ': o que você precisa?');
      var box2 = el('div', 'qz-lista');
      OPCOES_MICRO[tela.tipo].forEach(function (o) {
        var b = el('button', 'qz-op' + (m.opcao === o[0] ? ' on' : ''));
        b.type = 'button'; b.setAttribute('aria-pressed', m.opcao === o[0] ? 'true' : 'false');
        b.appendChild(el('span', null, o[0])); b.appendChild(el('b', null, o[1]));
        b.addEventListener('click', function () { m.opcao = o[0]; renderTela(tela); atualizaRodape(); });
        box2.appendChild(b);
      });
      area.appendChild(box2);
      area.appendChild(el('p', 'qz-grupo', 'Quantas?'));
      area.appendChild(stepper(m.qtd, 1, 6, function (v) { m.qtd = v; }));
    } else if (tela.id === 'lobu') {
      titulo('Lobuloplastia: quantos lóbulos?', 'R$50 por lóbulo.');
      area.appendChild(stepper(estado.lobu, 1, 2, function (v) { estado.lobu = v; }));
    } else if (tela.id === 'dente') {
      titulo('Quantas pedras no dente?', 'O preço muda pela quantidade de pedras.');
      var box3 = el('div', 'qz-lista');
      PEDRAS.forEach(function (o) {
        var b = el('button', 'qz-op' + (estado.dente === o[0] ? ' on' : ''));
        b.type = 'button'; b.setAttribute('aria-pressed', estado.dente === o[0] ? 'true' : 'false');
        b.appendChild(el('span', null, o[0])); b.appendChild(el('b', null, o[1]));
        b.addEventListener('click', function () { estado.dente = o[0]; renderTela(tela); atualizaRodape(); });
        box3.appendChild(b);
      });
      area.appendChild(box3);
    } else if (tela.id === 'saude') {
      titulo('Duas perguntas rápidas', 'Elas ajudam a gente a indicar a joia certa para você.');
      [['primeira', 'É a sua primeira vez fazendo piercing?', 'Sim, primeira vez', 'Não, já fiz antes'],
       ['pele', 'Você tem pele sensível ou alergia a metal?', 'Sim', 'Não / Não sei']].forEach(function (q) {
        area.appendChild(el('p', 'qz-grupo', q[1]));
        var r = el('div', 'qz-chips');
        r.appendChild(chip(q[2], estado[q[0]] === 'sim', function () { estado[q[0]] = 'sim'; renderTela(tela); atualizaRodape(); }));
        r.appendChild(chip(q[3], estado[q[0]] === 'nao', function () { estado[q[0]] = 'nao'; renderTela(tela); atualizaRodape(); }));
        area.appendChild(r);
      });
    } else if (tela.id === 'contato') {
      titulo('Para a recepção te achar', 'Você paga só no estúdio.');
      var n = el('input', 'qz-input'); n.type = 'text'; n.placeholder = 'Seu nome completo'; n.autocomplete = 'name'; n.value = estado.nome; n.setAttribute('aria-label', 'Seu nome completo');
      var w = el('input', 'qz-input'); w.type = 'tel'; w.placeholder = 'Seu WhatsApp com DDD'; w.autocomplete = 'tel'; w.inputMode = 'tel'; w.value = estado.whatsapp; w.setAttribute('aria-label', 'Seu WhatsApp');
      n.addEventListener('input', function () { estado.nome = n.value; atualizaRodape(); });
      w.addEventListener('input', function () { estado.whatsapp = w.value; atualizaRodape(); });
      area.appendChild(n); area.appendChild(w);
    } else if (tela.id === 'resumo') {
      titulo('Confira antes de enviar');
      var ul = el('ul', 'qz-resumo');
      linhas().forEach(function (x) { ul.appendChild(el('li', null, x)); });
      area.appendChild(ul);
      area.appendChild(el('p', 'qz-dica', estado.nome.trim() + ' · ' + estado.whatsapp.trim()));
    }
  }

  function atualizaRodape() {
    var ts = telas();
    if (passo > ts.length - 1) passo = ts.length - 1;
    var tela = ts[passo], ultimo = passo === ts.length - 1;
    barra.firstChild.style.width = Math.round(((passo + 1) / ts.length) * 100) + '%';
    rodape.innerHTML = '';
    if (passo > 0) {
      var v = el('button', 'qz-voltar', '← Voltar'); v.type = 'button';
      v.addEventListener('click', function () { passo--; desenha(); });
      rodape.appendChild(v);
    }
    var b = el('button', 'btn-submit qz-seguir', ultimo ? 'Avisar a recepção e ir ao estúdio →' : 'Continuar →');
    b.type = 'button'; b.disabled = !valida(tela) || enviando;
    b.addEventListener('click', function () {
      if (!valida(tela) || enviando) return;
      if (ultimo) enviar(); else { passo++; desenha(); }
    });
    rodape.appendChild(b);
  }

  function desenha() {
    var tela = telas()[passo];
    renderTela(tela); atualizaRodape();
    evento('checkin_quiz_passo', { passo: passo + 1, tela: tela.id });
    if (raiz.getBoundingClientRect().top < 0) raiz.scrollIntoView({ block: 'start' });
  }

  // ---------- envio ----------
  function utm(k) {
    var v = new URLSearchParams(location.search).get(k);
    if (v) return v;
    try { return (JSON.parse(sessionStorage.getItem('hub_utm') || '{}'))[k] || ''; } catch (e) { return ''; }
  }
  async function enviar() {
    enviando = true; atualizaRodape();
    var titanio = estado.primeira === 'sim' || estado.pele === 'sim';
    var corpo = {
      nome: estado.nome.trim(), whatsapp: estado.whatsapp.trim(),
      detalhes: textoDetalhes(), segmento: 'piercing',
      utm_source: utm('utm_source') || 'direto', utm_medium: utm('utm_medium') || 'organico',
      utm_campaign: utm('utm_campaign') || 'nenhuma', utm_content: utm('utm_content') || 'nenhum'
    };
    try {
      var r = await fetch(SUPABASE_URL + '/rest/v1/leads_hub', {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify(corpo)
      });
      if (!r.ok) throw new Error('Erro ao salvar');
    } catch (e) { console.error('Supabase:', e); }
    evento('checkin_quiz_enviado', { itens: linhas().length });
    raiz.classList.add('hidden');
    var ok = document.getElementById('checkin-sucesso');
    ok.classList.remove('hidden');
    if (titanio) {
      document.getElementById('titanio-alerta').classList.remove('hidden');
      document.getElementById('sucesso-titulo').innerText = 'Ficha recebida! Uma dica antes de vir:';
    }
    var urlWa = 'https://wa.me/' + NUMERO_WHATSAPP_ESTUDIO + '?text=' + encodeURIComponent(textoWhats(titanio));
    document.getElementById('btn-whatsapp').href = urlWa;
    // O lead já está salvo: abre o WhatsApp sozinho (o botão continua na tela se o navegador bloquear)
    setTimeout(function () { window.location.href = urlWa; }, 2000);
    enviando = false;
  }

  // ---------- inicio ----------
  montarEsqueleto();
  desenha();
  carregarCatalogo().then(function (d) { catalogo = d; }).catch(function (e) { console.error('catalogo (quiz):', e); catalogoErro = true; })
    .then(function () { var t = telas()[passo]; if (t.id === 'locais' || t.id === 'joia') { renderTela(t); atualizaRodape(); } });

  // Teste/automacao: expoe leitura do estado sem alterar nada
  window.__quizCheckin = { estado: estado, textoDetalhes: textoDetalhes, telas: telas };
})();
