const SUPABASE_URL = "https://phzqwafwxmnboegjujqf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wUX9E6f0iBA_1C9YWibvUA_l0to00jW";
const NUMERO_WHATSAPP_ESTUDIO = "5519988404390";

// ── PERFIS DE JOIAS POR TIPO ANATÔMICO ────────────────────────────────────────

// Preços tirados das opções em 2026-08-12: Debby mudou vários valores no estúdio hoje e o
// dropdown estava desatualizado (é texto fixo, não vem do CRM). Fica só o nome/estilo até a
// precificação ser revisada e fechada (ver plano do Catálogo) — a equipe confirma o valor real
// no estúdio. Onde o preço era a única diferença entre opções (ex: PVD Gold da orelha em 5
// faixas iguais), as opções foram agrupadas numa só, porque sem valor elas ficam idênticas.
const PERFIS_JOIA = {
  ORELHA: { grupos: [
    { g: 'Aço Cirúrgico', opts: [
      { v: 'Aço Tradicional', l: 'Labret / Brinco Tradicional' },
      { v: 'Aço Brilhante',   l: 'Labret / Brinco Brilhante ⭐' },
      { v: 'Aço Delicada',    l: 'Labret / Brinco Delicada' },
      { v: 'Aço Decorada',    l: 'Labret / Brinco Decorada' },
      { v: 'Aço Marcante',    l: 'Labret / Brinco Marcante' },
      { v: 'Aço Premium',     l: 'Labret / Brinco Premium' },
    ]},
    { g: 'PVD Gold (dourado)', opts: [
      { v: 'PVD Gold',      l: 'PVD Gold' },
      { v: 'PVD Gold Luxo', l: 'PVD Gold Luxo' },
    ]},
    { g: 'Titânio', opts: [
      { v: 'Titânio Tradicional', l: 'Titânio Tradicional' },
      { v: 'Titânio Decorado',    l: 'Titânio Decorado' },
    ]},
  ]},
  BANANA_BARBELL: { grupos: [
    { g: 'Barbell Curvo', opts: [
      { v: 'Barbell Curvo Rosa Aço',  l: 'Barbell Curvo Rosa' },
      { v: 'Barbell Curvo Titânio',   l: 'Barbell Curvo Titânio' },
    ]},
    { g: 'Banana Bell / Barbell Curvo Colorido', opts: [
      { v: 'Banana Bell G Aço',              l: 'Banana Bell G' },
      { v: 'Barbell Curvo Aço Colorido',     l: 'Barbell Curvo Aço Colorido' },
      { v: 'Banana Bell Aço com Pedra',      l: 'Banana Bell Aço com Pedra' },
      { v: 'Banana Bell Aço Decorada',       l: 'Banana Bell Aço Decorada' },
      { v: 'Banana Bell PVD Gold Simples',   l: 'Banana Bell PVD Gold' },
      { v: 'Banana Bell PVD Gold Decorada',  l: 'Banana Bell PVD Gold Decorada' },
    ]},
  ]},
  BARBELL_RETO: { grupos: [
    { g: 'Barbell Reto', opts: [
      { v: 'Barbell Reto Aço',              l: 'Barbell Reto Aço' },
      { v: 'Barbell Reto Aço Ponto de Luz', l: 'Barbell Reto Aço Com Ponto de Luz' },
      { v: 'Barbell Reto Titânio',          l: 'Barbell Reto Titânio' },
      { v: 'Barbell Reto Titânio Decorado', l: 'Barbell Reto Titânio Decorado' },
    ]},
  ]},
  BARBELL_MAMILO_TRANSVERSAL: { grupos: [
    { g: 'Barbell Reto', opts: [
      { v: 'Barbell Reto Aço Tradicional',     l: 'Barbell Reto Aço Tradicional' },
      { v: 'Barbell Reto Titânio Tradicional', l: 'Barbell Reto Titânio Tradicional' },
    ]},
  ]},
  LINGUA: { grupos: [
    { g: 'Barbell', opts: [
      { v: 'Barbell Língua Aço Tradicional', l: 'Barbell Aço Tradicional' },
      { v: 'Barbell Língua Titânio',         l: 'Barbell Titânio' },
    ]},
  ]},
  MICROCURVA: { grupos: [
    { g: 'Microcurva', opts: [
      { v: 'Microcurva Aço 8/10/12mm', l: 'Microcurva Aço 8/10/12mm' },
      { v: 'Microcurva Aço com Pedra', l: 'Microcurva Aço com Pedra' },
      { v: 'Microcurva PVD Gold',      l: 'Microcurva PVD Gold' },
      { v: 'Microcurva Titânio',       l: 'Microcurva Titânio' },
    ]},
  ]},
  DAITH: { grupos: [
    { g: 'Argola', opts: [
      { v: 'Argola Aço',              l: 'Argola Aço' },
      { v: 'Argola Aço Decorada',     l: 'Argola Aço Decorada' },
      { v: 'Argola Aço Cravejada',    l: 'Argola Aço Cravejada' },
      { v: 'Argola PVD Gold',         l: 'Argola PVD Gold' },
      { v: 'Argola PVD Gold Cravejada', l: 'Argola PVD Gold Cravejada' },
      { v: 'Argola Titânio',          l: 'Argola Titânio' },
    ]},
    { g: 'Coração (especial Daith)', opts: [
      { v: 'Coração Aço',            l: 'Coração Aço' },
      { v: 'Coração com Pedra Aço',  l: 'Coração com Pedra Aço' },
      { v: 'Coração PVD Gold',       l: 'Coração PVD Gold' },
      { v: 'Coração PVD Gold Decorado', l: 'Coração PVD Gold Decorado' },
    ]},
  ]},
  INTIMO_CHRISTINA: { grupos: [
    { g: 'Banana Bell P', opts: [
      { v: 'Banana Bell P Aço',          l: 'Banana Bell P' },
      { v: 'Íntimo Titânio Decorada',    l: 'Íntimo Titânio Decorada' },
    ]},
  ]},
}

const LOCAL_PERFIL = {
  'Nostril':'ORELHA','Duplo Nostril ×2':'ORELHA','Septo':'ORELHA',
  'Bridge':'BARBELL_RETO','Sobrancelha':'MICROCURVA','Dimple':'ORELHA',
  'Monroe':'ORELHA','Medusa':'ORELHA','Medusa Vertical':'ORELHA',
  'Labret Central':'ORELHA','Labret Lateral':'ORELHA','Labret Vertical':'MICROCURVA',
  'Angel Fangs':'MICROCURVA',
  'Snake Bites ×2':'ORELHA','Spider Bites ×2':'ORELHA','Smiley':'ORELHA',
  'Ponta da Língua':'MICROCURVA','Meio da Língua':'LINGUA',
  'Lóbulo':'ORELHA','Lóbulo ×2':'ORELHA','Lóbulo 2':'ORELHA','Lóbulo 3':'ORELHA',
  'Helix':'ORELHA','Duplo Helix':'ORELHA','Anti Helix':'ORELHA','Mid Helix':'ORELHA',
  'Tragus':'ORELHA','Anti Tragus':'ORELHA','Conch':'ORELHA','Flat':'ORELHA',
  'Rook':'MICROCURVA','Snug':'ORELHA','Transversal':'BARBELL_MAMILO_TRANSVERSAL',
  'Californiano':'ORELHA','Australianos':'ORELHA','Minions':'ORELHA','Daith':'DAITH',
  'Umbigo':'BANANA_BARBELL','Umbigo Vertical':'BANANA_BARBELL',
  'Mamilo':'BARBELL_MAMILO_TRANSVERSAL','Mamilo ×2':'BARBELL_MAMILO_TRANSVERSAL',
  'Íntimo Christina':'INTIMO_CHRISTINA','Íntimo Clitóris':'MICROCURVA',
}

function populateEstiloSelect(perfil) {
  var sel = document.getElementById('estilo')
  sel.innerHTML = '<option value="" disabled selected>Escolha uma opção...</option>'
  if (!perfil || !PERFIS_JOIA[perfil]) return
  PERFIS_JOIA[perfil].grupos.forEach(function(grupo) {
    var og = document.createElement('optgroup')
    og.label = '── ' + grupo.g + ' ──'
    grupo.opts.forEach(function(opt) {
      var o = document.createElement('option')
      o.value = opt.v; o.textContent = opt.l; og.appendChild(o)
    })
    sel.appendChild(og)
  })
  var ogFinal = document.createElement('optgroup')
  ogFinal.label = '──────────────────'
  var oFinal = document.createElement('option')
  oFinal.value = 'Ainda não sei'
  oFinal.textContent = 'Ainda não sei — a equipe me ajuda no estúdio'
  ogFinal.appendChild(oFinal); sel.appendChild(ogFinal)
}

// ── GRUPO A: perfurações que seguem tabela de joias (todos exceto Micro/Surface/Lobu/Remocao/Outro)
const GRUPO_JOIA = [
  // Rosto
  'Nostril','Duplo Nostril ×2','Septo','Bridge','Sobrancelha','Dimple',
  'Monroe','Medusa','Medusa Vertical',
  'Labret Central','Labret Lateral','Labret Vertical','Angel Fangs',
  'Snake Bites ×2','Spider Bites ×2','Smiley',
  'Ponta da Língua','Meio da Língua',
  // Orelha
  'Lóbulo','Lóbulo ×2','Lóbulo 2','Lóbulo 3',
  'Helix','Duplo Helix','Anti Helix','Mid Helix',
  'Tragus','Anti Tragus','Conch','Daith','Flat',
  'Rook','Snug','Transversal','Californiano','Australianos','Minions',
  // Corpo
  'Umbigo','Umbigo Vertical','Mamilo','Mamilo ×2','Íntimo Christina','Íntimo Clitóris',
];

// Regiões restritas: só joia Tradicional em perfuração nova (boca/lábio/língua/sobrancelha).
// A maioria usa Labret reto 10/12mm (R$25). Sobrancelha, Labret Vertical e Smiley usam
// Microcurva (R$45) — por isso têm preço próprio aqui.
const REGIOES_RESTRITAS = [
  'Sobrancelha','Dimple',
  'Monroe','Medusa','Medusa Vertical',
  'Labret Central','Labret Lateral','Labret Vertical','Angel Fangs',
  'Snake Bites ×2','Spider Bites ×2','Smiley',
];
const PRECO_PRIMEIRA_PERFURACAO_RESTRITA = {
  'Sobrancelha': 45,
  'Labret Vertical': 45,
  'Angel Fangs': 45,
  'Smiley': 45,
};
function precoPrimeiraPerfuracaoRestrita(perfuracao) {
  return PRECO_PRIMEIRA_PERFURACAO_RESTRITA[perfuracao] || 25;
}

// GRUPO B: microdermal e surface
const GRUPO_MICRO = ['Microdermal','Surface'];

// GRUPO C: lobuloplastia
const GRUPO_LOBU = ['Lobuloplastia'];

// GRUPO E: remoção simples de joia
const GRUPO_REMOCAO = ['Remoção de joia'];

function resetGrupos() {
  ['grupo-tipo-perf','grupo-restrito','grupo-joia','grupo-micro','grupo-lobu','grupo-remocao','grupo-outro'].forEach(function(id) {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById('estilo').required     = false;
  document.getElementById('estilo-micro').required = false;
  document.getElementById('estilo').value        = '';
  document.getElementById('estilo-micro').value  = '';
  document.querySelectorAll('input[name="tipo_perf"]').forEach(function(r){ r.checked = false; });
}

function atualizarCampoJoia(perfuracao, tipoPerf) {
  resetGrupos();
  if (!perfuracao) return;

  if (GRUPO_MICRO.includes(perfuracao)) {
    document.getElementById('label-micro').textContent = perfuracao + ' — qual serviço você precisa?';
    document.getElementById('grupo-micro').style.display = '';
    document.getElementById('estilo-micro').required = true;
    return;
  }
  if (GRUPO_LOBU.includes(perfuracao)) {
    document.getElementById('grupo-lobu').style.display = '';
    return;
  }
  if (GRUPO_REMOCAO.includes(perfuracao)) {
    document.getElementById('grupo-remocao').style.display = '';
    return;
  }
  if (!GRUPO_JOIA.includes(perfuracao)) {
    document.getElementById('grupo-outro').style.display = '';
    return;
  }

  // Perfuração padrão: precisa saber se é nova ou troca
  if (REGIOES_RESTRITAS.includes(perfuracao)) {
    document.getElementById('grupo-tipo-perf').style.display = '';
    if (tipoPerf === 'nova') {
      document.getElementById('grupo-restrito').style.display = '';
      document.getElementById('texto-restrito').innerHTML =
        '⚠️ Para essa região, a perfuração nova é feita com a <strong>joia Tradicional</strong>. Após 30 dias de cicatrização você pode trocar para qualquer modelo. A equipe te explica tudo ao chegar (valor confirmado no estúdio).';
      document.getElementById('estilo-restrito').value =
        'Aço Tradicional (perfuração nova — troca permitida após 30 dias)';
    } else if (tipoPerf === 'troca') {
      var perfil = LOCAL_PERFIL[perfuracao] || 'ORELHA';
      populateEstiloSelect(perfil);
      document.getElementById('grupo-joia').style.display = '';
      document.getElementById('estilo').required = true;
    }
  } else {
    // Região livre — mostra joias do perfil correto diretamente
    var perfil = LOCAL_PERFIL[perfuracao] || 'ORELHA';
    populateEstiloSelect(perfil);
    document.getElementById('grupo-joia').style.display = '';
    document.getElementById('estilo').required = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Captura UTMs da URL
  const urlParams = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach(function (utm) {
    const el = document.getElementById(utm);
    if (el && urlParams.has(utm)) el.value = urlParams.get(utm);
  });

  // Lógica dinâmica do campo de joia
  const perfuracaoSel = document.getElementById('perfuracao');
  if (perfuracaoSel) {
    perfuracaoSel.addEventListener('change', function () {
      atualizarCampoJoia(this.value, null);
    });
  }

  // Radio nova/troca — só aparece para regiões restritas
  document.querySelectorAll('input[name="tipo_perf"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      const perf = document.getElementById('perfuracao').value;
      atualizarCampoJoia(perf, this.value);
    });
  });

  const formLead = document.getElementById("form-lead");
  if (!formLead) return;

  formLead.addEventListener("submit", async function (event) {
    event.preventDefault();

    const btn = document.getElementById("btn-enviar");
    btn.innerText = "Salvando...";
    btn.disabled = true;

    const nome         = document.getElementById("nome").value.trim();
    const whatsapp     = document.getElementById("whatsapp").value.trim();
    const perfuracao   = document.getElementById("perfuracao").value;
    const primeiraVez  = document.querySelector('input[name="primeira_vez"]:checked')?.value || "nao";
    const peleSensivel = document.querySelector('input[name="pele_sensivel"]:checked')?.value || "nao";

    const tipoPerf = document.querySelector('input[name="tipo_perf"]:checked')?.value || null;

    // Resolve o valor correto conforme o grupo e tipo do procedimento
    let estiloFinal;
    if (GRUPO_MICRO.includes(perfuracao)) {
      estiloFinal = document.getElementById("estilo-micro").value;
    } else if (GRUPO_LOBU.includes(perfuracao)) {
      estiloFinal = 'Lobuloplastia (valor confirmado no estúdio)';
    } else if (GRUPO_REMOCAO.includes(perfuracao)) {
      estiloFinal = 'Remoção de joia (valor confirmado no estúdio)';
    } else if (REGIOES_RESTRITAS.includes(perfuracao) && tipoPerf === 'nova') {
      estiloFinal = 'Aço Tradicional (perfuração nova — troca permitida após 30 dias)';
    } else if (GRUPO_JOIA.includes(perfuracao)) {
      estiloFinal = document.getElementById("estilo").value;
    } else {
      estiloFinal = 'A definir com a equipe no estúdio';
    }

    const titanioIndicado = primeiraVez === "sim" || peleSensivel === "sim";

    const formData = {
      nome,
      whatsapp,
      detalhes: `${perfuracao} | Joia/Valor: ${estiloFinal} | Primeira vez: ${primeiraVez} | Pele sensível: ${peleSensivel}`,
      segmento: "piercing",
      utm_source:   document.getElementById("utm_source").value   || "direto",
      utm_medium:   document.getElementById("utm_medium").value   || "organico",
      utm_campaign: document.getElementById("utm_campaign").value || "nenhuma",
      utm_content:  document.getElementById("utm_content").value  || "nenhum",
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads_hub`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao salvar");
    } catch (e) {
      console.error("Supabase:", e);
    }

    // Mostra tela de sucesso
    formLead.classList.add("hidden");
    const sucesso = document.getElementById("checkin-sucesso");
    sucesso.classList.remove("hidden");

    if (titanioIndicado) {
      document.getElementById("titanio-alerta").classList.remove("hidden");
      document.getElementById("sucesso-titulo").innerText = "Ficha recebida! Uma dica antes de vir:";
    }

    // Monta link WhatsApp
    const texto = montarTextoWhatsApp(nome, perfuracao, estiloFinal, primeiraVez, peleSensivel, titanioIndicado);
    document.getElementById("btn-whatsapp").href =
      `https://wa.me/${NUMERO_WHATSAPP_ESTUDIO}?text=${encodeURIComponent(texto)}`;
  });
});

document.addEventListener('click',function(e){
  var el=e.target.closest('a[href*="wa.me"]');
  if(el&&typeof gtag!=='undefined')gtag('event','whatsapp_open',{event_category:'conversao',event_label:'wa_link_piercing'});
});

/* ===== VITRINE DE JOIAS + GRADE DE LOCAIS ===================================
   Fase B do plano do Catálogo (2026-08-14): em vez do array fixo de 149 fotos
   (que exigia editar código toda vez que uma joia mudava de nome/preço/lugar),
   busca ao vivo na Edge Function `catalogo-publico`, que lê direto do CRM
   (modelos_joia/locais_perfuracao, só linhas ativo=true com foto). Nunca lê a
   tabela direto com a anon key — só essa function pública, com service_role
   por trás (mesmo padrão do sistema de Cuidados). Ver CLAUDE.md/plano.
================================================================================ */
(function () {
  var CATALOGO_API = 'https://phzqwafwxmnboegjujqf.supabase.co/functions/v1/catalogo-publico';

  var MATERIAL_META = {
    ACO:      { key: 'aco', label: 'Aço Cirúrgico', emoji: '💎', cls: 'vaco' },
    PVD_GOLD: { key: 'pvd', label: 'PVD Gold',       emoji: '✦', cls: 'vpvd' },
    TITANIO:  { key: 'ti',  label: 'Titânio',        emoji: '🔵', cls: 'vti' },
  };

  var catalogo = { aco: null, pvd: null, ti: null }; // preenchido depois do fetch
  var activeMat = null;
  var activePreco = null;

  function waUrl(name, preco, matLabel) {
    var txt = 'Oi! Vi a vitrine do site e tenho interesse na joia: ' + name + ' (R$' + preco + ' · ' + matLabel + '). Tem disponível?';
    return 'https://wa.me/5519988404390?text=' + encodeURIComponent(txt);
  }

  // Agrupa a lista plana da API em { faixas: { 45: [joia, joia...] } } por material,
  // igual à estrutura antiga do CATALOG — mantém o resto do render sem mudar muito.
  function agruparPorMaterial(joias) {
    var out = {};
    joias.forEach(function (j) {
      var meta = MATERIAL_META[j.material];
      if (!meta) return; // material desconhecido — ignora, não derruba a vitrine
      if (!out[meta.key]) out[meta.key] = { label: meta.label, emoji: meta.emoji, cls: meta.cls, faixas: {} };
      var faixas = out[meta.key].faixas;
      if (!faixas[j.preco_faixa]) faixas[j.preco_faixa] = [];
      faixas[j.preco_faixa].push(j);
    });
    return out;
  }

  function renderTabs() {
    var el = document.getElementById('vitrine-tabs');
    if (!el) return;
    el.innerHTML = '';
    Object.keys(catalogo).forEach(function (key) {
      var m = catalogo[key];
      if (!m) return;
      var precos = Object.keys(m.faixas).map(Number).sort(function (a, b) { return a - b; });
      var range = 'R$' + precos[0] + '–R$' + precos[precos.length - 1];
      var btn = document.createElement('button');
      btn.className = 'vtab' + (key === activeMat ? ' active ' + m.cls : '');
      btn.textContent = m.emoji + ' ' + m.label + ' · ' + range;
      btn.addEventListener('click', function () {
        activeMat = key;
        activePreco = null;
        renderTabs();
        renderPrices();
        renderGrid();
      });
      el.appendChild(btn);
    });
  }

  function renderPrices() {
    var el = document.getElementById('vitrine-prices');
    if (!el) return;
    el.innerHTML = '';
    var m = catalogo[activeMat];
    if (!m) return;
    var precos = Object.keys(m.faixas).map(Number).sort(function (a, b) { return a - b; });

    var allBtn = document.createElement('button');
    allBtn.className = 'vprice' + (!activePreco ? ' active' : '');
    allBtn.textContent = 'Todos';
    allBtn.addEventListener('click', function () { activePreco = null; renderPrices(); renderGrid(); });
    el.appendChild(allBtn);

    precos.forEach(function (p) {
      var btn = document.createElement('button');
      btn.className = 'vprice' + (activePreco === p ? ' active' : '');
      btn.textContent = 'R$ ' + p;
      btn.addEventListener('click', function () { activePreco = p; renderPrices(); renderGrid(); });
      el.appendChild(btn);
    });
  }

  function renderGrid() {
    var grid = document.getElementById('vitrine-grid');
    if (!grid) return;
    grid.innerHTML = '';
    var m = catalogo[activeMat];
    if (!m) return;
    var faixas = activePreco ? [activePreco] : Object.keys(m.faixas).map(Number);

    faixas.forEach(function (preco) {
      var itens = m.faixas[preco] || [];
      itens.forEach(function (j) {
        var card = document.createElement('article');
        card.className = 'joia-card';

        var wrap = document.createElement('div');
        wrap.className = 'joia-img-wrap';
        var img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = j.nome;
        img.src = j.foto_url;
        wrap.appendChild(img);

        var info = document.createElement('div');
        info.className = 'joia-info';

        var badge = document.createElement('span');
        badge.className = 'joia-badge badge-' + activeMat;
        badge.textContent = 'R$' + preco + ' · ' + m.label;
        info.appendChild(badge);

        var h = document.createElement('p');
        h.className = 'joia-name';
        h.textContent = j.nome;
        info.appendChild(h);

        var wa = document.createElement('a');
        wa.className = 'joia-wa';
        wa.href = waUrl(j.nome, preco, m.label);
        wa.target = '_blank';
        wa.rel = 'noopener';
        wa.textContent = 'Quero essa →';
        info.appendChild(wa);

        card.appendChild(wrap);
        card.appendChild(info);
        grid.appendChild(card);
      });
    });

    if (!grid.children.length) {
      var empty = document.createElement('p');
      empty.className = 'vitrine-vazia';
      empty.textContent = 'Nenhuma joia nesta seleção.';
      grid.appendChild(empty);
    }
  }

  function renderPerfGrid(locais) {
    var el = document.getElementById('perf-grid');
    if (!el || !locais) return;
    el.innerHTML = '';
    locais.forEach(function (l) {
      var item = document.createElement('div');
      item.className = 'perf-item';
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.src = l.foto_url;
      img.alt = l.nome;
      var span = document.createElement('span');
      span.textContent = l.nome;
      item.appendChild(img);
      item.appendChild(span);
      el.appendChild(item);
    });
  }

  function mostrarErroVitrine() {
    var grid = document.getElementById('vitrine-grid');
    if (grid) grid.innerHTML = '<p class="vitrine-vazia">Não deu pra carregar a vitrine agora. <a href="https://wa.me/5519988404390?text=Oi%21+Quero+ver+os+modelos+de+joia" target="_blank" rel="noopener">Chama no WhatsApp</a> que a equipe te mostra.</p>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var temVitrine = !!document.getElementById('vitrine-tabs');
    var temPerfGrid = !!document.getElementById('perf-grid');
    if (!temVitrine && !temPerfGrid) return;

    fetch(CATALOGO_API)
      .then(function (r) { if (!r.ok) throw new Error('status ' + r.status); return r.json(); })
      .then(function (data) {
        if (temVitrine) {
          catalogo = agruparPorMaterial(data.joias || []);
          activeMat = Object.keys(catalogo)[0] || null;
          if (activeMat) {
            renderTabs();
            renderPrices();
            renderGrid();
          } else {
            mostrarErroVitrine();
          }
        }
        if (temPerfGrid) renderPerfGrid(data.locais || []);
      })
      .catch(function (e) {
        console.error('catalogo-publico:', e);
        if (temVitrine) mostrarErroVitrine();
      });
  });
})();

function montarTextoWhatsApp(nome, perfuracao, estilo, primeiraVez, peleSensivel, titanioIndicado) {
  let texto = `Olá, vim pelo site da Debby Piercing.\n\nMeu nome é ${nome}.\n\nInteresse em: ${perfuracao}\nEstilo escolhido: ${estilo}`;

  if (primeiraVez === "sim") texto += "\n\nÉ minha primeira vez fazendo piercing.";
  if (peleSensivel === "sim") texto += "\nTenho pele sensível / alergia a metal.";
  if (titanioIndicado) texto += "\n\nGostaria de saber mais sobre as opções em titânio.";

  texto += "\n\nJá vi as informações no site e pretendo ir até o estúdio.";
  return texto;
}
