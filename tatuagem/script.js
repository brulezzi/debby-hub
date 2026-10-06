// Página /tatuagem/ — rastreio de origem + captura de lead.
// Regra de negócio: lead que veio pelo estúdio/Instagram da Debby = comissão do estúdio;
// carteira antiga do Rafa = dele. Por isso a ORIGEM é gravada na 1ª visita e preservada.
const SUPABASE_URL = "https://phzqwafwxmnboegjujqf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wUX9E6f0iBA_1C9YWibvUA_l0to00jW"; // chave publicável (mesma do /piercing/)
const NUMERO_WHATSAPP_ESTUDIO = "5519988404390";
const ORIGEM_KEY = "tat_origem_v1";
const ORIGEM_DIAS = 90;

// ---------- Origem (primeiro toque vence por 90 dias) ----------
function limpa(v, max) {
  return String(v || "").toLowerCase().replace(/[^a-z0-9_\-\.]/g, "").slice(0, max || 40);
}

function origemDaUrl() {
  const q = new URLSearchParams(location.search);
  const o = {
    utm_source: limpa(q.get("utm_source")),
    utm_medium: limpa(q.get("utm_medium")),
    utm_campaign: limpa(q.get("utm_campaign"), 60),
    utm_content: limpa(q.get("utm_content"), 60),
  };
  if (o.utm_source) return o;
  // Sem UTM: tenta inferir pelo referrer
  let host = "";
  try { host = new URL(document.referrer).hostname.replace(/^www\./, ""); } catch (e) {}
  if (!host || host === location.hostname) return null;
  if (/instagram\.com$/.test(host)) return { utm_source: "instagram", utm_medium: "referral", utm_campaign: "", utm_content: "" };
  if (/google\./.test(host)) return { utm_source: "google", utm_medium: "organico", utm_campaign: "", utm_content: "" };
  if (/facebook\.com$|fb\.com$/.test(host)) return { utm_source: "facebook", utm_medium: "referral", utm_campaign: "", utm_content: "" };
  return { utm_source: limpa(host, 40), utm_medium: "referral", utm_campaign: "", utm_content: "" };
}

function lerOrigemSalva() {
  try {
    const o = JSON.parse(localStorage.getItem(ORIGEM_KEY) || "null");
    if (o && o.ts && Date.now() - o.ts < ORIGEM_DIAS * 86400000) return o;
  } catch (e) {}
  return null;
}

function resolverOrigem() {
  const salva = lerOrigemSalva();
  const url = origemDaUrl();
  // Primeiro toque com UTM explícito vence por 90 dias. Uma visita "fraca" (direto/referrer)
  // salva antes NÃO bloqueia: se depois a pessoa chegar por um link com UTM, ele passa a valer.
  const urlExplicita = new URLSearchParams(location.search).has("utm_source");
  if (salva && (salva.explicito || !urlExplicita)) return salva;
  const nova = Object.assign(
    { utm_source: "direto", utm_medium: "organico", utm_campaign: "", utm_content: "" },
    url || {}
  );
  nova.explicito = urlExplicita;
  nova.ts = Date.now();
  nova.landing = location.pathname;
  try { localStorage.setItem(ORIGEM_KEY, JSON.stringify(nova)); } catch (e) {}
  return nova;
}

const ORIGEM = resolverOrigem();
const REF = (ORIGEM.utm_source || "direto") + "/" + (ORIGEM.utm_medium || "organico");
const CARTEIRA_RAFA = ORIGEM.utm_source === "rafa_carteira";

// ---------- GA4 ----------
function evento(nome, extra) {
  if (typeof gtag === "function") {
    gtag("event", nome, Object.assign({ origem_ref: REF, event_category: "tatuagem" }, extra || {}));
  }
}

// ---------- WhatsApp ----------
function linkWhats(texto) {
  return "https://wa.me/" + NUMERO_WHATSAPP_ESTUDIO + "?text=" + encodeURIComponent(texto);
}

function montarTextoGenerico() {
  return "Oi! Vim pelo site e quero fazer um orçamento de tatuagem com o Rafa.\n\n(ref: " + REF + ")";
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = linkWhats(montarTextoGenerico());
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-track]");
    if (el) evento("click_tatuagem", { event_label: el.dataset.track });
  });

  // Mostra "o campo de cobertura" só quando o estilo for cobertura
  const estilo = document.getElementById("estilo");
  const boxCob = document.getElementById("grupo-cobertura");
  if (estilo && boxCob) {
    estilo.addEventListener("change", function () {
      boxCob.hidden = estilo.value !== "Cobertura";
    });
  }

  // Menor de idade: aviso
  const menor = document.querySelectorAll('input[name="menor"]');
  const avisoMenor = document.getElementById("aviso-menor");
  menor.forEach(function (r) {
    r.addEventListener("change", function () {
      avisoMenor.hidden = r.value !== "sim" || !r.checked;
    });
  });

  // ---------- Portfólio: filtro por estilo, "ver mais" e ampliação ----------
  // Padrão: colorido, o estilo que o Rafa mais quer vender.
  const DESCRICOES = {
    colorido: "Realismo colorido, surrealismo e aquarela. Cor com profundidade e acabamento que continua bonito com o tempo. É o que o Rafa mais gosta de fazer.",
    fine: "Traço fino, delicado e preciso, para quem quer discrição sem abrir mão do detalhe.",
    pb: "Retratos, animais e figuras com volume e textura de verdade, em preto e cinza.",
    anime: "Personagens e universos que você ama, e também HQ. Uma das duas especialidades premiadas em convenção.",
    todos: "Tudo em um só lugar, na ordem do que o Rafa mais quer fazer."
  };
  const POR_PAGINA = Infinity; // mostra todas as fotos do estilo escolhido
  const itens = Array.prototype.slice.call(document.querySelectorAll(".g-item"));
  const abas = document.querySelectorAll(".tab");
  const contador = document.getElementById("gal-count");
  const descEl = document.getElementById("tab-desc");
  const btnMais = document.getElementById("ver-mais");
  let filtroAtual = "colorido";
  let limite = POR_PAGINA;

  function doFiltro() {
    return itens.filter(function (el) { return filtroAtual === "todos" || el.dataset.g === filtroAtual; });
  }
  function render() {
    const lista = doFiltro();
    itens.forEach(function (el) { el.hidden = true; });
    lista.forEach(function (el, i) { el.hidden = i >= limite; });
    const vis = Math.min(limite, lista.length);
    if (contador) contador.textContent = vis + (vis === 1 ? " trabalho" : " trabalhos");
    if (btnMais) {
      btnMais.hidden = vis >= lista.length;
      btnMais.textContent = "Ver mais trabalhos (" + (lista.length - vis) + ")";
    }
    if (descEl) descEl.textContent = DESCRICOES[filtroAtual] || "";
    abas.forEach(function (a) { a.setAttribute("aria-selected", a.dataset.filtro === filtroAtual ? "true" : "false"); });
  }
  if (itens.length && abas.length) {
    abas.forEach(function (a) {
      a.addEventListener("click", function () {
        filtroAtual = a.dataset.filtro; limite = POR_PAGINA; render();
        evento("filtro_portfolio", { event_label: filtroAtual });
      });
    });
    if (btnMais) btnMais.addEventListener("click", function () { limite += POR_PAGINA; render(); evento("ver_mais_portfolio", { event_label: filtroAtual }); });
    render();
  }

  // Ampliação (lightbox) com setas e ESC
  const lb = document.getElementById("lb");
  if (lb && itens.length) {
    const lbImg = document.getElementById("lb-img");
    const lbCap = document.getElementById("lb-cap");
    let atual = 0, lista = [];
    function abrir(i) {
      atual = (i + lista.length) % lista.length;
      const img = lista[atual].querySelector("img");
      lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = img.alt;
    }
    itens.forEach(function (el) {
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      const abre = function () {
        lista = doFiltro();
        abrir(lista.indexOf(el));
        lb.hidden = false;
        document.body.style.overflow = "hidden";
        lb.querySelector(".x").focus();
        evento("ampliar_foto", { event_label: el.dataset.g });
      };
      el.addEventListener("click", abre);
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abre(); } });
    });
    const fechar = function () { lb.hidden = true; document.body.style.overflow = ""; };
    lb.querySelector(".x").addEventListener("click", fechar);
    lb.querySelector(".prev").addEventListener("click", function () { abrir(atual - 1); });
    lb.querySelector(".next").addEventListener("click", function () { abrir(atual + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) fechar(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") abrir(atual - 1);
      if (e.key === "ArrowRight") abrir(atual + 1);
    });
  }

  // ---------- Comparador antes/depois ----------
  document.querySelectorAll("[data-cmp]").forEach(function (box) {
    const rng = box.querySelector("input");
    const antes = box.querySelector(".antes");
    const linha = box.querySelector(".cmp-line");
    function set(v) {
      antes.style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
      linha.style.left = v + "%";
    }
    rng.addEventListener("input", function () { set(Number(rng.value)); });
    rng.addEventListener("change", function () { evento("comparar_cobertura"); });
    set(Number(rng.value));
  });

  // ---------- Aparecer ao rolar + contadores ----------
  // Respeita "reduzir movimento" do aparelho. ?motion=1 força as animações (usado só para testar).
  const reduz = !/[?&]motion=1/.test(location.search) &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Títulos: separa em palavras para cada uma subir de dentro de uma máscara
  if (!reduz) {
    document.querySelectorAll("h2").forEach(function (h) {
      let i = 0;
      (function dividir(no) {
        Array.prototype.slice.call(no.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (parte) {
              if (!parte) return;
              if (/^\s+$/.test(parte)) { frag.appendChild(document.createTextNode(" ")); return; }
              const w = document.createElement("span"); w.className = "w";
              const s = document.createElement("span"); s.textContent = parte; s.style.setProperty("--i", i++);
              w.appendChild(s); frag.appendChild(w);
            });
            no.replaceChild(frag, n);
          } else if (n.nodeType === 1) { dividir(n); }
        });
      })(h);
      h.classList.add("split");
    });
  }

  // Topo: "Oi, tudo bão?" digitando e a palavra do título que troca
  if (!reduz) {
    const mao = document.querySelector(".hand");
    if (mao) {
      const txt = mao.textContent; mao.style.minHeight = mao.offsetHeight + "px"; mao.textContent = ""; mao.classList.add("typing");
      let k = 0;
      setTimeout(function digita() {
        mao.textContent = txt.slice(0, ++k);
        if (k < txt.length) setTimeout(digita, 75); else setTimeout(function () { mao.classList.remove("typing"); }, 1200);
      }, 700);
    }
    const pal = document.getElementById("palavra");
    if (pal) {
      const palavras = ["fica", "impressiona", "conta uma história", "vira arte"];
      let p = 0;
      setInterval(function () {
        if (document.hidden) return;
        pal.classList.add("out");
        setTimeout(function () {
          p = (p + 1) % palavras.length;
          pal.textContent = palavras[p];
          pal.classList.remove("out"); pal.classList.add("pre");
          void pal.offsetWidth;
          pal.classList.remove("pre");
        }, 360);
      }, 3200);
    }
  }

  const revelaveis = document.querySelectorAll(".rv, h2.split");
  if ("IntersectionObserver" in window && !reduz) {
    const io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    revelaveis.forEach(function (el) { io.observe(el); });
    // contadores do topo
    document.querySelectorAll("[data-count]").forEach(function (el) {
      const alvo = Number(el.dataset.count), suf = el.dataset.suffix || "";
      let ini = null;
      function passo(t) {
        if (ini === null) ini = t;
        const k = Math.min((t - ini) / 1400, 1);
        el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3))) + suf;
        if (k < 1) requestAnimationFrame(passo);
      }
      el.textContent = "0" + suf;
      requestAnimationFrame(passo);
    });
  } else {
    revelaveis.forEach(function (el) { el.classList.add("in"); });
  }

  const form = document.getElementById("form-lead");
  if (!form) return;

  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const btn = document.getElementById("btn-enviar");
    btn.disabled = true;
    btn.textContent = "Enviando…";

    const v = function (id) { return (document.getElementById(id).value || "").trim(); };
    const radio = function (n) { const r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ""; };

    const nome = v("nome");
    const whatsapp = v("whatsapp");
    const estiloV = v("estilo");
    const regiao = v("regiao");
    const tamanho = v("tamanho");
    const ideia = v("ideia").slice(0, 600);
    const jaCliente = radio("ja_cliente") || "nao";
    const menorV = radio("menor") || "nao";
    const cobertura = estiloV === "Cobertura" ? (radio("tem_tattoo_local") || "nao informado") : "-";

    let etiqueta = "";
    if (jaCliente === "sim" || CARTEIRA_RAFA) etiqueta = "[CONFERIR CARTEIRA] ";

    const detalhes =
      etiqueta +
      "Estilo: " + estiloV +
      " | Região: " + regiao +
      " | Tamanho: " + tamanho +
      " | Cobertura (já tem tattoo no local): " + cobertura +
      " | Menor de 18: " + menorV +
      " | Já foi atendido pelo Rafa: " + jaCliente +
      " | Ideia: " + ideia +
      " | ref: " + REF;

    const payload = {
      nome: nome,
      whatsapp: whatsapp,
      detalhes: detalhes,
      segmento: "tatuagem",
      utm_source: ORIGEM.utm_source || "direto",
      utm_medium: ORIGEM.utm_medium || "organico",
      utm_campaign: ORIGEM.utm_campaign || "nenhuma",
      utm_content: ORIGEM.utm_content || "nenhum",
    };

    let salvou = false;
    try {
      const r = await fetch(SUPABASE_URL + "/rest/v1/leads_hub", {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      salvou = r.ok;
      if (!r.ok) console.error("leads_hub:", r.status);
    } catch (e) {
      console.error("leads_hub:", e);
    }

    evento("generate_lead", { event_label: "form_tatuagem", salvou: salvou ? "sim" : "nao", estilo: estiloV });

    form.hidden = true;
    document.getElementById("sucesso").hidden = false;

    const msg =
      "Oi! Vim pelo site e quero um orçamento de tatuagem com o Rafa.\n\n" +
      "Nome: " + nome +
      "\nEstilo: " + estiloV +
      "\nRegião: " + regiao +
      "\nTamanho: " + tamanho +
      (ideia ? "\nIdeia: " + ideia : "") +
      "\n\n(ref: " + REF + ")";
    document.getElementById("btn-whatsapp").href = linkWhats(msg);
  });
});
