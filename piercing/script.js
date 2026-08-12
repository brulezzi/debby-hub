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

/* ===== VITRINE DE JOIAS ===== */
(function () {
  var CATALOG = {
    aco: {
      label: 'Aço Cirúrgico', emoji: '💎', folder: 'ACO', cls: 'vaco',
      faixas: {
        'R$ 25': ['FerraduraTradicionalAço.1.2.8mm.webp','LabretTradicionalAço.1.2.10mm.webp','LabretTradicionalAço.1.2.12mm.webp','LabretTradicionalAço.1.2.6mm.webp','LabretTradicionalAço.1.2.8mm.webp','TradicionalPontoDeLuzAnzol.webp'],
        'R$ 45': ['ArgolaSegmentada.8mm.webp','Banana.bell.G.1.6.10mm.webp','BananaBell.frutacor.jpeg','BananaBell.rosa.jpeg','BananaBell.Vermelho.jpeg','BarbellReto16mm.webp','BarbellReto22mm.webp','BarbellReto38mm.webp','BarbellReto8mm.webp','Brinco2mm.webp','Brinco3mm.webp','Brinco4mm.webp','Brinco5mm.webp','CoraçãoLisoLabret.webp','CoraçãoSimples.daith.jpeg','CruzLisaLabret.webp','D.ring.aço.webp','EstrelaLisaLabret.webp','FerraduraTradicionalAço.1.2.10mm.webp','FerraduraTradicionalAço.1.2.12mm.webp','LuaLisaLabret.webp','MicrocurvoTradicional.8mm.webp','MicrocurvoTradicional.10mm.webp','MicrocurvoTradicional.12mm.webp','PontoDeLuz.Labret2mm.webp'],
        'R$ 55': ['ArgolaSegmentada.10mm.webp','ArgolaSegmentada.12mm.webp','Banana.bell.P.1.6.10mm.webp','CobrinhaPequenaLabret.jpeg','CoraçãoAbertoLabret.webp','CoraçãoComPontoDeLuz.daith.jpeg','LibelulaLabret.webp','MicrocurvoComPontoDeLuz.webp','PontoDeLuz.labret3mm.webp','intimo christina.jpeg'],
        'R$ 65': ['BananaBell.PequenoAzul.jpeg','BananaBell.pequenoVermelho.jpeg','Borboleta4pedrasLabret.webp','CoraçãoCravejadoEspetadoLabret.webp','CoraçãoCravejadoLabret.webp','FlorGrandeLabret.jpeg','MorcegoLabret.jpeg','RaioCravejadoLabret.jpeg'],
        'R$ 75': ['3florzinhasLabret.jpeg','4coraçõesLabret.webp','5PedrasLabret.jpeg','9PedrinhasLabret.webp','ArgolaCravejada1.2.12mm.webp','ArgolaCravejada1.2.8mm.webp','ArgolaFrontalCravejada1.2.10mm.webp','ArgolaFrontalCravejada1.2.8mm.webp','BananaBell.CoraçãoComPontoDeLuz.jpeg','CerejinhaCravejadaLabret.webp','CobraCravejadaLabret.webp','CoraçãoLadoDireito.webp','Flor6Pontas.jpeg','PalmeiraLabret.webp','Ramo5FolhasLabret.webp','Ramo7FolhasLabret.jpeg','BarbellReto2CoraçãoPontoDeLuz.webp']
      }
    },
    pvd: {
      label: 'PVD Gold', emoji: '✦', folder: 'PVD GOLD', cls: 'vpvd',
      faixas: {
        'R$ 45': ['Dring.PVDgold.webp'],
        'R$ 55': ['ArgolaSegmentada.pvdgold.8mm.webp','Borboleta1Pedra.pvdgold.labret.jpeg','Brinco2mm.webp','Brinco3mm.webp','Brinco4mm.webp','CoraçãoAbertoLabret.pvdgold.webp'],
        'R$ 65': ['ArgolaSegmentada.pvdgold.10mm.webp','ArgolaSegmentada.pvdgold.12mm.webp','Banana.bell.PVDgold.1.6.10mm.webp','Borboleta4Pedras.pvdgold.labret.jpeg','Borboleta4Pedras.pvdgold.webp','CoraçãoCravejado.pvdgold.webp','Flor6Pontas.pvdgold.labret.jpeg','FlorGrande.pvdgold.labret.jpeg','FlorGrandeLabret.pvdgold.webp','PontoDeLuz.pvdgold.3mm.webp','RaioCravejado.pvdgold.labret.jpeg'],
        'R$ 75': ['BananaBell.pvdgold.PontoDeLuz.jpeg','BananaBellCoração.pvdgold..jpeg'],
        'R$ 85': ['4Corações.pvdgold.labret.jpeg','4coraçõesLabret.pvdgold.webp','5Pedras.pvdgold.labret.jpeg','9Pedrinhas.pvdgold.webp','Argola.pvdgold.Cravejada1.2.12mm.webp','Argola.pvdgoldCravejada1.2.8mm.webp','ArgolaFrontalCravejada1.2.10mm.pvdgold.webp','ArgolaFrontalCravejada1.2.8mm.pvdgold.webp','CoraçãoCravejadoEspetado.pvdgold.webp','CoraçãoLadoDireito,pvdgold.webp','CoraçãoLadoEsquerdo.pvdgold.webp','PalmeiraLabret.pvdgold.webp','Ramo5Folhas.pvdgold.labret.jpeg','Ramo5folhasLabret.pvdgold.webp','Ramo7Folhas.pvdgold.labret.jpeg','BarbellReto.2Coraçõescompontodeluz.webp']
      }
    },
    ti: {
      label: 'Titânio', emoji: '🔵', folder: 'TITANIO', cls: 'vti',
      faixas: {
        'R$ 90':  ['BarbellReto16mm.webp','BarbellReto22mm.webp','Ferradura10mm.webp','Ferradura12mm.webp','Ferradura8mm.webp','Labret12mm.webp','Labret8mm.webp','PontoDeLuzAnzol.webp'],
        'R$ 110': ['Microcurva12mm.webp','Microcurva8mm.webp'],
        'R$ 120': ['2AsasLabret.webp','AbelhaPequenaLabret.webp','ArgolaTitanioDuplaAberta10mm.webp','ArgolaTitanioDuplaFechada10mm.webp','BarbelReto.2pontosdeluz.webp','BarbellReto.2pontosdeluz.pvdgold.webp','BorboletaLabret.webp','Esmeralda.webp','FlorzinhaComCaboLabret.webp','Intimo.webp','Intimo.pvdgold.webp','PontoDeLuz.3mm.webp']
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
    // Preço tirado da mensagem em 2026-08-12: valores mudaram no estúdio e o CATALOG estático
    // não está atualizado. A equipe confirma o valor certo na hora. Ver CLAUDE.md / plano do
    // Catálogo (Fase B trará preço ao vivo de novo, direto do CRM).
    var txt = 'Oi! Vi a vitrine do site e tenho interesse na joia: ' + name + ' (' + matLabel + '). Tem disponível?';
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

        // Preço tirado do card em 2026-08-12 (valores mudaram no estúdio, CATALOG estático
        // desatualizado) — abas de material/faixa continuam mostrando preço porque são
        // navegação, não um valor cravado na foto. Ver plano do Catálogo.
        var badge = document.createElement('span');
        badge.className = 'joia-badge badge-' + activeMat.replace('pvd', 'pvd').replace('ti', 'ti');
        badge.textContent = m.label;
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
