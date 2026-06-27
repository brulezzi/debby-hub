const SUPABASE_URL = "https://phzqwafwxmnboegjujqf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wUX9E6f0iBA_1C9YWibvUA_l0to00jW";
const NUMERO_WHATSAPP_ESTUDIO = "5519988404390";

// ── PERFIS DE JOIAS POR TIPO ANATÔMICO ────────────────────────────────────────

const PERFIS_JOIA = {
  ORELHA: { grupos: [
    { g: 'Aço Cirúrgico', opts: [
      { v: 'Aço Tradicional R$25', l: 'Labret / Brinco Tradicional — R$ 25' },
      { v: 'Aço Brilhante R$45',   l: 'Labret / Brinco Brilhante — R$ 45 ⭐' },
      { v: 'Aço Delicada R$55',    l: 'Labret / Brinco Delicada — R$ 55' },
      { v: 'Aço Decorada R$65',    l: 'Labret / Brinco Decorada — R$ 65' },
      { v: 'Aço Marcante R$75',    l: 'Labret / Brinco Marcante — R$ 75' },
      { v: 'Aço Premium R$110',    l: 'Labret / Brinco Premium Aço — R$ 110' },
    ]},
    { g: 'PVD Gold (dourado)', opts: [
      { v: 'PVD Gold R$45',          l: 'PVD Gold — R$ 45' },
      { v: 'PVD Gold R$55',          l: 'PVD Gold — R$ 55' },
      { v: 'PVD Gold R$65',          l: 'PVD Gold — R$ 65' },
      { v: 'PVD Gold R$85',          l: 'PVD Gold — R$ 85' },
      { v: 'PVD Gold Premium R$110', l: 'PVD Gold Premium — R$ 110' },
    ]},
    { g: 'Titânio', opts: [
      { v: 'Titânio R$70',  l: 'Titânio Tradicional — R$ 70' },
      { v: 'Titânio R$110', l: 'Titânio Decorado — R$ 110' },
    ]},
  ]},
  BANANA_BARBELL: { grupos: [
    { g: 'Banana Bell', opts: [
      { v: 'Banana Bell Aço R$25',      l: 'Banana Bell Aço — R$ 25' },
      { v: 'Banana Bell Aço R$45',      l: 'Banana Bell Aço Colorida — R$ 45' },
      { v: 'Banana Bell Aço R$55',      l: 'Banana Bell Aço com Pedra — R$ 55' },
      { v: 'Banana Bell Aço R$65',      l: 'Banana Bell Aço Decorada — R$ 65' },
      { v: 'Banana Bell PVD Gold R$55', l: 'Banana Bell PVD Gold — R$ 55' },
      { v: 'Banana Bell PVD Gold R$65', l: 'Banana Bell PVD Gold Decorada — R$ 65' },
    ]},
    { g: 'Barbell Curvo', opts: [
      { v: 'Barbell Curvo Aço R$25',     l: 'Barbell Curvo Aço — R$ 25' },
      { v: 'Barbell Curvo Titânio R$70', l: 'Barbell Curvo Titânio — R$ 70' },
    ]},
  ]},
  BARBELL_RETO: { grupos: [
    { g: 'Barbell Reto', opts: [
      { v: 'Barbell Reto Aço R$25',      l: 'Barbell Reto Aço — R$ 25' },
      { v: 'Barbell Reto Aço R$110',     l: 'Barbell Reto Aço Premium — R$ 110' },
      { v: 'Barbell Reto Titânio R$70',  l: 'Barbell Reto Titânio — R$ 70' },
      { v: 'Barbell Reto Titânio R$110', l: 'Barbell Reto Titânio Decorado — R$ 110' },
    ]},
  ]},
  MICROCURVA: { grupos: [
    { g: 'Microcurva', opts: [
      { v: 'Microcurva Aço R$25',     l: 'Microcurva Aço — R$ 25' },
      { v: 'Microcurva Aço R$55',     l: 'Microcurva Aço com Pedra — R$ 55' },
      { v: 'Microcurva Titânio R$70', l: 'Microcurva Titânio — R$ 70' },
    ]},
  ]},
  DAITH: { grupos: [
    { g: 'Argola', opts: [
      { v: 'Argola Aço R$25',           l: 'Argola Aço — R$ 25' },
      { v: 'Argola Aço R$45',           l: 'Argola Aço Decorada — R$ 45' },
      { v: 'Argola Aço Cravejada R$75', l: 'Argola Aço Cravejada — R$ 75' },
      { v: 'Argola PVD Gold R$55',      l: 'Argola PVD Gold — R$ 55' },
      { v: 'Argola PVD Cravejada R$85', l: 'Argola PVD Gold Cravejada — R$ 85' },
      { v: 'Argola Titânio R$70',       l: 'Argola Titânio — R$ 70' },
    ]},
    { g: 'Coração (especial Daith)', opts: [
      { v: 'Coração Aço R$45',       l: 'Coração Aço — R$ 45' },
      { v: 'Coração Aço Pedra R$55', l: 'Coração com Pedra Aço — R$ 55' },
      { v: 'Coração PVD R$55',       l: 'Coração PVD Gold — R$ 55' },
      { v: 'Coração PVD R$65',       l: 'Coração PVD Gold Decorado — R$ 65' },
    ]},
  ]},
  INTIMO: { grupos: [
    { g: 'Opções disponíveis', opts: [
      { v: 'Microcurvo Aço R$25',      l: 'Microcurvo Aço — R$ 25' },
      { v: 'Barbell Curvo P Aço R$25', l: 'Barbell Curvo P Aço — R$ 25' },
      { v: 'Banana Bell P Aço R$25',   l: 'Banana Bell P Aço — R$ 25' },
      { v: 'Titânio Tradicional R$70', l: 'Titânio Tradicional — R$ 70' },
      { v: 'Titânio Íntimo R$110',     l: 'Titânio Íntimo — R$ 110' },
    ]},
  ]},
}

const LOCAL_PERFIL = {
  'Nostril':'ORELHA','Duplo Nostril ×2':'ORELHA','Septo':'ORELHA',
  'Bridge':'BARBELL_RETO','Sobrancelha':'MICROCURVA','Dimple':'ORELHA',
  'Monroe':'ORELHA','Medusa':'ORELHA','Medusa Vertical':'ORELHA',
  'Labret Central':'ORELHA','Labret Lateral':'ORELHA','Labret Vertical':'MICROCURVA',
  'Snake Bites ×2':'ORELHA','Spider Bites ×2':'ORELHA','Smiley':'ORELHA',
  'Ponta da Língua':'MICROCURVA','Meio da Língua':'BARBELL_RETO',
  'Lóbulo':'ORELHA','Lóbulo ×2':'ORELHA','Lóbulo 2':'ORELHA','Lóbulo 3':'ORELHA',
  'Helix':'ORELHA','Duplo Helix':'ORELHA','Anti Helix':'ORELHA','Mid Helix':'ORELHA',
  'Tragus':'ORELHA','Anti Tragus':'ORELHA','Conch':'ORELHA','Flat':'ORELHA',
  'Rook':'MICROCURVA','Snug':'ORELHA','Transversal':'BARBELL_RETO',
  'Californiano':'ORELHA','Australianos':'ORELHA','Minions':'ORELHA','Daith':'DAITH',
  'Umbigo':'BANANA_BARBELL','Umbigo Vertical':'BANANA_BARBELL',
  'Mamilo':'BARBELL_RETO','Mamilo ×2':'BARBELL_RETO',
  'Íntimo Christina':'INTIMO','Íntimo Clitóris':'INTIMO',
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
  'Labret Central','Labret Lateral','Labret Vertical',
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

// Regiões restritas: só Tradicional R$25 em perfuração nova (boca/lábio/língua/sobrancelha)
const REGIOES_RESTRITAS = [
  'Sobrancelha','Dimple',
  'Monroe','Medusa','Medusa Vertical',
  'Labret Central','Labret Lateral','Labret Vertical',
  'Snake Bites ×2','Spider Bites ×2','Smiley',
  'Ponta da Língua','Meio da Língua',
];

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
      estiloFinal = 'Lobuloplastia — R$ 50 por furo por sessão';
    } else if (GRUPO_REMOCAO.includes(perfuracao)) {
      estiloFinal = 'Remoção de joia — R$ 20 por peça';
    } else if (REGIOES_RESTRITAS.includes(perfuracao) && tipoPerf === 'nova') {
      estiloFinal = 'Aço Tradicional R$25 (perfuração nova — troca permitida após 30 dias)';
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
