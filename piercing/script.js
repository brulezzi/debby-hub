const SUPABASE_URL = "https://phzqwafwxmnboegjujqf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wUX9E6f0iBA_1C9YWibvUA_l0to00jW";
const NUMERO_WHATSAPP_ESTUDIO = "5519988404390";

document.addEventListener("DOMContentLoaded", function () {
  // Captura UTMs da URL
  const urlParams = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach(function (utm) {
    const el = document.getElementById(utm);
    if (el && urlParams.has(utm)) el.value = urlParams.get(utm);
  });

  const formLead = document.getElementById("form-lead");
  if (!formLead) return;

  formLead.addEventListener("submit", async function (event) {
    event.preventDefault();

    const btn = document.getElementById("btn-enviar");
    btn.innerText = "Salvando...";
    btn.disabled = true;

    const nome        = document.getElementById("nome").value.trim();
    const whatsapp    = document.getElementById("whatsapp").value.trim();
    const perfuracao  = document.getElementById("perfuracao").value;
    const estilo      = document.getElementById("estilo").value;
    const primeiraVez = document.querySelector('input[name="primeira_vez"]:checked')?.value || "nao";
    const peleSensivel = document.querySelector('input[name="pele_sensivel"]:checked')?.value || "nao";

    const titanioIndicado = primeiraVez === "sim" || peleSensivel === "sim";

    const formData = {
      nome,
      whatsapp,
      detalhes: `${perfuracao} | Estilo: ${estilo} | Primeira vez: ${primeiraVez} | Pele sensível: ${peleSensivel}`,
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
    const texto = montarTextoWhatsApp(nome, perfuracao, estilo, primeiraVez, peleSensivel, titanioIndicado);
    document.getElementById("btn-whatsapp").href =
      `https://wa.me/${NUMERO_WHATSAPP_ESTUDIO}?text=${encodeURIComponent(texto)}`;
  });
});

document.addEventListener('click',function(e){
  var el=e.target.closest('a[href*="wa.me"]');
  if(el&&typeof gtag!=='undefined')gtag('event','whatsapp_open',{event_category:'conversao',event_label:'wa_link_piercing'});
});

/* ===== VITRINE DE JOIAS ===== */
(function () {
  var CATALOG = {
    aco: {
      label: 'Aço Cirúrgico', emoji: '💎', folder: 'ACO', cls: 'vaco',
      faixas: {
        'R$ 25': ['Banana.bell.G.1.6.10mm.webp','Banana.bell.P.1.6.10mm.webp','BarbellReto16mm.webp','BarbellReto22mm.webp','BarbellReto38mm.webp','BarbellReto8mm.webp','Brinco2mm.webp','Brinco3mm.webp','Brinco4mm.webp','Brinco5mm.webp','FerraduraTradicionalAço.1.2.10mm.webp','FerraduraTradicionalAço.1.2.12mm.webp','FerraduraTradicionalAço.1.2.8mm.webp','LabretTradicionalAço.1.2.10mm.webp','LabretTradicionalAço.1.2.12mm.webp','LabretTradicionalAço.1.2.6mm.webp','LabretTradicionalAço.1.2.8mm.webp','MicrocurvoTradicional.10mm.webp','MicrocurvoTradicional.12mm.webp','MicrocurvoTradicional.8mm.webp','TradicionalPontoDeLuzAnzol.webp'],
        'R$ 45': ['ArgolaSegmentada.10mm.webp','ArgolaSegmentada.12mm.webp','ArgolaSegmentada.8mm.webp','BananaBell.frutacor.jpeg','BananaBell.rosa.jpeg','BananaBell.Vermelho.jpeg','CoraçãoLisoLabret.webp','CoraçãoSimples.daith.jpeg','CruzLisaLabret.webp','D.ring.aço.webp','EstrelaLisaLabret.webp','LuaLisaLabret.webp','PontoDeLuz.Labret2mm.webp'],
        'R$ 55': ['BananaBell.PequenoAzul.jpeg','BananaBell.pequenoVermelho.jpeg','CobrinhaMenorLabret.webp','CobrinhaPequenaLabret.jpeg','CoraçãoAbertoLabret.webp','CoraçãoComPontoDeLuz.daith.jpeg','LibelulaLabret.webp','MicrocurvoComPontoDeLuz.webp','PontoDeLuz.labret3mm.webp'],
        'R$ 65': ['BananaBell.CoraçãoComPontoDeLuz.jpeg','Borboleta4pedrasLabret.webp','CobraCravejadaLabret.webp','CoraçãoCravejadoEspetadoLabret.webp','CoraçãoCravejadoLabret.webp','MorcegoLabret.jpeg','PalmeiraLabret.webp','RaioCravejadoLabret.jpeg'],
        'R$ 75': ['3florzinhasLabret.jpeg','4coraçõesLabret.webp','5PedrasLabret.jpeg','9PedrinhasLabret.webp','ArgolaCravejada1.2.12mm.webp','ArgolaCravejada1.2.8mm.webp','ArgolaFrontalCravejada1.2.10mm.webp','ArgolaFrontalCravejada1.2.8mm.webp','CerejinhaCravejadaLabret.webp','CoraçãoLadoDireito.webp','Flor6Pontas.jpeg','FlorGrandeLabret.jpeg','Ramo5FolhasLabret.webp','Ramo7FolhasLabret.jpeg'],
        'R$110':  ['BarbellReto2CoraçãoPontoDeLuz.webp']
      }
    },
    pvd: {
      label: 'PVD Gold', emoji: '✦', folder: 'PVD GOLD', cls: 'vpvd',
      faixas: {
        'R$ 45': ['Brinco2mm.webp','Brinco3mm.webp','Dring.PVDgold.webp'],
        'R$ 55': ['ArgolaSegmentada.pvdgold.10mm.webp','ArgolaSegmentada.pvdgold.12mm.webp','ArgolaSegmentada.pvdgold.8mm.webp','Banana.bell.PVDgold.1.6.10mm.webp','Borboleta1Pedra.pvdgold.labret.jpeg','CoraçãoAbertoLabret.pvdgold.webp','PontoDeLuz.pvdgold.3mm.webp'],
        'R$ 65': ['BananaBell.pvdgold.PontoDeLuz.jpeg','BananaBellCoração.pvdgold..jpeg','Borboleta4Pedras.pvdgold.labret.jpeg','Borboleta4Pedras.pvdgold.webp','CoraçãoCravejado.pvdgold.webp','Flor6Pontas.pvdgold.labret.jpeg','FlorGrande.pvdgold.labret.jpeg','FlorGrandeLabret.pvdgold.webp','RaioCravejado.pvdgold.labret.jpeg'],
        'R$ 85': ['4Corações.pvdgold.labret.jpeg','4coraçõesLabret.pvdgold.webp','5Pedras.pvdgold.labret.jpeg','9Pedrinhas.pvdgold.webp','Argola.pvdgold.Cravejada1.2.12mm.webp','Argola.pvdgoldCravejada1.2.8mm.webp','ArgolaFrontalCravejada1.2.10mm.pvdgold.webp','ArgolaFrontalCravejada1.2.8mm.pvdgold.webp','CoraçãoCravejadoEspetado.pvdgold.webp','CoraçãoLadoDireito,pvdgold.webp','CoraçãoLadoEsquerdo.pvdgold.webp','PalmeiraLabret.pvdgold.webp','Ramo5Folhas.pvdgold.labret.jpeg','Ramo5folhasLabret.pvdgold.webp','Ramo7Folhas.pvdgold.labret.jpeg'],
        'R$ 110': ['BarbellReto.2Coraçõescompontodeluz.webp']
      }
    },
    ti: {
      label: 'Titânio', emoji: '🔵', folder: 'TITANIO', cls: 'vti',
      faixas: {
        'R$ 70':  ['BarbellReto16mm.webp','BarbellReto22mm.webp','Ferradura10mm.webp','Ferradura12mm.webp','Ferradura8mm.webp','Labret12mm.webp','Labret8mm.webp','Microcurva12mm.webp','Microcurva8mm.webp','PontoDeLuzAnzol.webp'],
        'R$ 110': ['2AsasLabret.webp','AbelhaPequenaLabret.webp','ArgolaTitanioDuplaAberta10mm.webp','ArgolaTitanioDuplaFechada10mm.webp','BarbelReto.2pontosdeluz.webp','BarbellReto.2pontosdeluz.pvdgold.webp','BorboletaLabret.webp','Esmeralda.webp','FlorzinhaComCaboLabret.webp','Intimo.webp','Intimo.pvdgold.webp','PontoDeLuz.3mm.webp']
      }
    }
  };

  var activeMat = 'aco';
  var activePreco = null;

  function fmtName(f) {
    return f
      .replace(/\.(webp|jpeg|jpg|png)(\.\w+)?$/i, '')
      .replace(/[,]/g, ' ')
      .replace(/\.pvdgold\b/gi, ' Gold')
      .replace(/([a-záàâãéèêíïóôõúç])([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÚÇ])/g, '$1 $2')
      .replace(/([A-Za-záàâãéèêíïóôõúç])([0-9])/g, '$1 $2')
      .replace(/([0-9])([A-Za-záàâãéèêíïóôõúçÁÀÂÃÉÈÊÍÏÓÔÕÚÇ])/g, '$1 $2')
      .replace(/\./g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function imgUrl(matKey, preco, file) {
    var m = CATALOG[matKey];
    return '../assets/fotos/' +
      encodeURIComponent('JOIAS FORNECEDOR') + '/' +
      encodeURIComponent(m.folder) + '/' +
      encodeURIComponent(preco) + '/' +
      encodeURIComponent(file);
  }

  function waUrl(name, preco, matLabel) {
    var txt = 'Oi! Vi a vitrine do site e tenho interesse na joia: ' + name + ' (' + preco + ' · ' + matLabel + '). Tem disponível?';
    return 'https://wa.me/5519988404390?text=' + encodeURIComponent(txt);
  }

  function renderTabs() {
    var el = document.getElementById('vitrine-tabs');
    if (!el) return;
    el.innerHTML = '';
    Object.keys(CATALOG).forEach(function (key) {
      var m = CATALOG[key];
      var precos = Object.keys(m.faixas);
      var range = precos[0].replace('R$ ', 'R$') + '–' + precos[precos.length - 1].replace('R$ ', 'R$');
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
    var m = CATALOG[activeMat];
    var precos = Object.keys(m.faixas);

    var allBtn = document.createElement('button');
    allBtn.className = 'vprice' + (!activePreco ? ' active' : '');
    allBtn.textContent = 'Todos';
    allBtn.addEventListener('click', function () { activePreco = null; renderPrices(); renderGrid(); });
    el.appendChild(allBtn);

    precos.forEach(function (p) {
      var btn = document.createElement('button');
      btn.className = 'vprice' + (activePreco === p ? ' active' : '');
      btn.textContent = p;
      btn.addEventListener('click', function () { activePreco = p; renderPrices(); renderGrid(); });
      el.appendChild(btn);
    });
  }

  function renderGrid() {
    var grid = document.getElementById('vitrine-grid');
    if (!grid) return;
    grid.innerHTML = '';
    var m = CATALOG[activeMat];
    var faixas = activePreco ? [activePreco] : Object.keys(m.faixas);

    faixas.forEach(function (preco) {
      var files = m.faixas[preco] || [];
      files.forEach(function (file) {
        var name = fmtName(file);
        var card = document.createElement('article');
        card.className = 'joia-card';

        var wrap = document.createElement('div');
        wrap.className = 'joia-img-wrap';
        var img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = name;
        img.src = imgUrl(activeMat, preco, file);
        wrap.appendChild(img);

        var info = document.createElement('div');
        info.className = 'joia-info';

        var badge = document.createElement('span');
        badge.className = 'joia-badge badge-' + activeMat.replace('pvd', 'pvd').replace('ti', 'ti');
        badge.textContent = preco + ' · ' + m.label;
        info.appendChild(badge);

        var h = document.createElement('p');
        h.className = 'joia-name';
        h.textContent = name;
        info.appendChild(h);

        var wa = document.createElement('a');
        wa.className = 'joia-wa';
        wa.href = waUrl(name, preco, m.label);
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

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('vitrine-tabs')) return;
    renderTabs();
    renderPrices();
    renderGrid();
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
