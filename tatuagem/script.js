// Página /tatuagem/ — rastreio de origem + captura de lead.
// Regra de negócio: lead que veio pelo estúdio/Instagram da Debby = comissão do estúdio;
// carteira antiga do Rafa = dele. Por isso a ORIGEM é gravada na 1ª visita e preservada.
const SUPABASE_URL = "https://phzqwafwxmnboegjujqf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wUX9E6f0iBA_1C9YWibvUA_l0to00jW"; // chave publicável (mesma do /piercing/)
const NUMERO_WHATSAPP_ESTUDIO = "5519988404390";
const NUMERO_WHATSAPP_RAFA = "5519994163214";   // o quiz termina abrindo o WhatsApp do Rafa (o lead fica gravado em leads_hub com a origem)
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

  // ---------- Portfólio: filtro por estilo, "ver mais" e ampliação ----------
  // Padrão: colorido, o estilo que mais quero fazer.
  const DESCRICOES = {
    colorido: "Realismo colorido, surrealismo e aquarela. Cor com profundidade e acabamento que continua bonito com o tempo. É o que mais gosto de fazer.",
    fine: "Traço fino, delicado e preciso, para quem quer discrição sem abrir mão do detalhe.",
    pb: "Retratos, animais e figuras com volume e textura de verdade, em preto e cinza.",
    anime: "Personagens e universos que você ama, e também HQ. Uma das duas especialidades premiadas em convenção.",
    todos: "Tudo em um só lugar, na ordem do que mais gosto de fazer."
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

  // ---------- Imagens à prova de falha no celular ----------
  // Carregamento preguiçoso nativo falha em vários celulares (colunas, blocos animados): as fotos nunca vinham.
  // Aqui cada foto tenta de novo (até 3x, com um parâmetro novo na URL) se der erro ou não terminar de carregar.
  const todasImgs = Array.prototype.slice.call(document.querySelectorAll("img[src]"));
  function recarregar(img, tentativa) {
    if (tentativa > 3) return;
    const base = img.getAttribute("src").replace(/[?&]r=\d+$/, "");
    img.setAttribute("src", base + (base.indexOf("?") === -1 ? "?" : "&") + "r=" + tentativa);
  }
  todasImgs.forEach(function (img) {
    let n = 0;
    img.addEventListener("error", function () { n++; setTimeout(function () { recarregar(img, n); }, 600 * n); });
  });
  window.addEventListener("load", function () {
    // confere de novo depois de tudo carregar: o que ficou vazio tenta outra vez
    setTimeout(function () {
      todasImgs.forEach(function (img) {
        if (!(img.complete && img.naturalWidth > 0)) recarregar(img, 1);
      });
    }, 2500);
  });

  // ---------- Páginas mais curtas no celular ----------
  // Cobertura: um caso por vez (no desktop os três aparecem lado a lado)
  const abasCaso = document.querySelectorAll("#case-tabs .tab");
  const casos = document.querySelectorAll(".case");
  abasCaso.forEach(function (a) {
    a.addEventListener("click", function () {
      abasCaso.forEach(function (x) { x.setAttribute("aria-selected", x === a ? "true" : "false"); });
      casos.forEach(function (c) { c.classList.toggle("on", c.dataset.i === a.dataset.case); });
      evento("cobertura_caso", { event_label: a.textContent });
    });
  });
  // Cuidados: cada bloco começa fechado (o título continua visível) e abre ao toque
  document.querySelectorAll(".acc").forEach(function (d) {
    d.addEventListener("toggle", function () { if (d.open) evento("cuidados_abriu", { event_label: (d.querySelector("h3") || {}).textContent }); });
  });

  // ---------- Navegação: barra de seções, "onde estou" e botão flutuante ----------
  const navTopo = document.querySelector(".nav");
  const subnav = document.getElementById("subnav");
  function ajustaAltura() { if (navTopo) document.documentElement.style.setProperty("--nav-h", navTopo.offsetHeight + "px"); }
  ajustaAltura();
  window.addEventListener("resize", ajustaAltura);
  window.addEventListener("load", ajustaAltura);

  // Um único ouvinte de rolagem (leve, no máximo 1x por quadro) decide qual seção é a atual
  // e quando mostrar o botão "Pedir orçamento". Funciona também em saltos grandes (clicar numa seção
  // distante, voltar ao topo), coisa que observadores de interseção perdem.
  const cta = document.getElementById("cta-flutuante");
  const linksNav = subnav ? Array.prototype.slice.call(subnav.querySelectorAll("a")) : [];
  const secoesNav = linksNav.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  const faixa = subnav ? subnav.firstElementChild : null;
  const secComo = document.getElementById("como"), secOrc = document.getElementById("orcamento"), lbEl = document.getElementById("lb");
  let secaoAtual = null, aguardando = false;

  function marcar(id) {
    if (id === secaoAtual) return;
    secaoAtual = id;
    linksNav.forEach(function (a) {
      const on = !!id && a.getAttribute("href") === "#" + id;
      a.setAttribute("aria-current", on ? "true" : "false");
      if (on && faixa) faixa.scrollTo({ left: a.offsetLeft - (faixa.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
    });
  }

  function atualizarNavegacao() {
    aguardando = false;
    const h = window.innerHeight;
    if (subnav) {
      let id = null;
      secoesNav.forEach(function (s) { if (s && s.getBoundingClientRect().top <= h * 0.35) id = s.id; });
      // no fim da página, a última seção conta como atual
      if (window.scrollY + h >= document.documentElement.scrollHeight - 4 && secoesNav.length) id = secoesNav[secoesNav.length - 1].id;
      marcar(id);
    }
    if (cta) {
      // só aparece depois de "Como funciona"; some no orçamento e com foto ampliada
      const passouComo = !!secComo && secComo.getBoundingClientRect().top <= h * 0.5;
      const r = secOrc ? secOrc.getBoundingClientRect() : null;
      const noOrc = !!r && r.top < h * 0.85 && r.bottom > h * 0.15;
      const lbAberto = !!lbEl && !lbEl.hidden;
      const on = passouComo && !noOrc && !lbAberto;
      cta.classList.toggle("on", on);
      cta.setAttribute("aria-hidden", on ? "false" : "true");
      cta.tabIndex = on ? 0 : -1;
    }
  }
  function pedirAtualizacao() { if (!aguardando) { aguardando = true; setTimeout(atualizarNavegacao, 60); } }
  window.addEventListener("scroll", pedirAtualizacao, { passive: true });
  window.addEventListener("resize", pedirAtualizacao);
  if (lbEl) new MutationObserver(pedirAtualizacao).observe(lbEl, { attributes: true, attributeFilter: ["hidden"] });
  atualizarNavegacao();
  // ---------- Quiz de orçamento (uma pergunta por tela) ----------
  // Fluxo: origem (se o link não disse) > idade > nome > parte do corpo > ideia > WhatsApp.
  // No fim grava o lead em leads_hub (com a origem, para a regra de comissão) e abre o WhatsApp do Rafa com tudo preenchido.
  const quiz = document.getElementById("quiz");
  if (!quiz) return;

  const ORIGENS = {
    debby: { rotulo: "Instagram da Debby", source: "debby" },
    rafa: { rotulo: "Instagram do Rafa", source: "rafa" },
    indicacao: { rotulo: "Indicação de alguém", source: "indicacao" },
    google: { rotulo: "Google", source: "google" },
    carteira: { rotulo: "Já tatuou com o Rafa", source: "rafa_carteira" },
    outro: { rotulo: "Outro", source: "outro" }
  };
  const ROTULO_SOURCE = {
    debby: "Instagram da Debby", rafa: "Instagram do Rafa", estudio: "Estúdio da Debby", metaads: "Anúncio",
    qrestudio: "QR no estúdio", hub_piercing: "Site (página de piercing)", rafa_carteira: "Já tatuou com o Rafa"
  };
  const IDADES = {
    "menos16": { rotulo: "Menos de 16 anos (só com os pais presentes)", etiqueta: "[MENOR DE 16 · só com os pais presentes] ", nota: "Com menos de 16 anos eu só atendo com os pais presentes na sessão. Eu avalio cada caso, então vamos conversar." },
    "16-17": { rotulo: "16 ou 17 anos (com autorização dos pais)", etiqueta: "[MENOR · autorização dos pais] ", nota: "Com 16 ou 17 anos, preciso da autorização dos pais ou do responsável." },
    "18+": { rotulo: "18 anos ou mais", etiqueta: "", nota: "" }
  };

  const resp = { origem: "", idade: "", nome: "", corpo: "", ideia: "", fone: "" };
  const origemConhecida = !!ORIGEM.explicito;   // chegou por um link com origem (hub, anúncio, QR): não pergunta
  const ordem = (origemConhecida ? [] : ["origem"]).concat(["idade", "nome", "corpo", "ideia", "contato"]);
  const passos = {};
  Array.prototype.forEach.call(quiz.querySelectorAll(".q-step"), function (s) { passos[s.dataset.step] = s; });
  const barra = document.getElementById("q-prog");
  const contagem = document.getElementById("q-count");
  const btnVoltar = document.getElementById("q-back");
  const erroEl = document.getElementById("q-err");
  let atual = 0, enviando = false;

  function erro(msg) { erroEl.textContent = msg || ""; erroEl.hidden = !msg; }

  // guarda o andamento na aba: se a pessoa sair para olhar as fotos ou recarregar, volta de onde parou
  const CHAVE_QUIZ = "tat_quiz_v1";
  function salvar() { try { sessionStorage.setItem(CHAVE_QUIZ, JSON.stringify({ resp: resp, passo: ordem[atual] })); } catch (e) {} }
  function limparSalvo() { try { sessionStorage.removeItem(CHAVE_QUIZ); } catch (e) {} }

  function mostrar(n, inicial) {
    atual = Math.max(0, Math.min(n, ordem.length - 1));
    Object.keys(passos).forEach(function (k) { passos[k].hidden = true; });
    const id = ordem[atual];
    passos[id].hidden = false;
    erro("");
    barra.style.width = ((atual + 1) / ordem.length * 100) + "%";
    contagem.textContent = (atual + 1) + " de " + ordem.length;
    btnVoltar.hidden = atual === 0;
    // chips já marcados continuam marcados ao voltar
    Array.prototype.forEach.call(passos[id].querySelectorAll(".q-opt"), function (b) {
      b.setAttribute("aria-pressed", resp[b.dataset.field] === b.dataset.v ? "true" : "false");
    });
    if (id === "nome") {
      const nota = document.getElementById("q-note-idade");
      const txt = resp.idade && IDADES[resp.idade] ? IDADES[resp.idade].nota : "";
      nota.textContent = txt; nota.hidden = !txt;
    }
    const campo = passos[id].querySelector("input,textarea");
    if (!inicial) {
      if (campo && !("ontouchstart" in window)) campo.focus();   // no celular não abre o teclado sozinho
      salvar();
      evento("quiz_passo", { event_label: id, passo: atual + 1 });
    }
  }
  function avancar() { mostrar(atual + 1); }

  quiz.addEventListener("click", function (e) {
    const opt = e.target.closest(".q-opt");
    if (opt) {
      resp[opt.dataset.field] = opt.dataset.v;
      Array.prototype.forEach.call(opt.parentNode.querySelectorAll(".q-opt"), function (b) { b.setAttribute("aria-pressed", b === opt ? "true" : "false"); });
      setTimeout(avancar, 180);   // dá tempo de ver a escolha marcada
      return;
    }
    if (e.target.closest("[data-skip]")) { resp.ideia = ""; avancar(); return; }
    if (e.target.closest("[data-next]")) { validarEAvancar(); return; }
  });
  btnVoltar.addEventListener("click", function () { mostrar(atual - 1); });
  // o que a pessoa já digitou fica guardado mesmo antes de apertar "Continuar"
  quiz.addEventListener("input", function (e) {
    const id = e.target.id;
    if (id === "q-nome") resp.nome = e.target.value.trim();
    else if (id === "q-ideia") resp.ideia = e.target.value.trim().slice(0, 500);
    else if (id === "q-fone") resp.fone = e.target.value.trim();
    else return;
    salvar();
  });

  function validarEAvancar() {
    const id = ordem[atual];
    if (id === "nome") {
      const n = document.getElementById("q-nome").value.trim();
      if (n.length < 2) { erro("Me diz o seu nome para eu te chamar."); return; }
      resp.nome = n;
    }
    if (id === "ideia") { resp.ideia = document.getElementById("q-ideia").value.trim().slice(0, 500); }
    avancar();
  }
  quiz.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      e.preventDefault();
      if (ordem[atual] === "contato") enviar(); else validarEAvancar();
    }
  });

  function montarMensagem(origemRotulo, refQ) {
    const idade = IDADES[resp.idade] ? IDADES[resp.idade].rotulo : "";
    return "Oi, Rafa! Vim pelo quiz do site e quero fazer uma tatuagem.\n\n" +
      "*Nome:* " + resp.nome + "\n" +
      "*Idade:* " + idade + "\n" +
      "*Parte do corpo:* " + resp.corpo + "\n" +
      "*Ideia:* " + (resp.ideia || "ainda não sei, queria conversar") + "\n" +
      "*Como cheguei:* " + origemRotulo + "\n\n" +
      "Vou te mandar as fotos de referência por aqui.\n\n(ref: " + refQ + ")";
  }

  async function enviar() {
    if (enviando) return;
    const fone = document.getElementById("q-fone").value.trim();
    const digitos = fone.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 13) { erro("Confere o número com o DDD, por exemplo (19) 99999-9999."); return; }
    resp.fone = fone;
    enviando = true;
    const btn = document.getElementById("q-enviar");
    btn.disabled = true; btn.textContent = "Abrindo…"; erro("");

    // origem: a do link, ou a que a pessoa disse
    let source, medium, campaign, content, origemRotulo, refQ;
    if (origemConhecida) {
      source = ORIGEM.utm_source || "direto"; medium = ORIGEM.utm_medium || "organico";
      campaign = ORIGEM.utm_campaign || "nenhuma"; content = ORIGEM.utm_content || "nenhum";
      origemRotulo = ROTULO_SOURCE[source] || source; refQ = REF;
    } else {
      const o = ORIGENS[resp.origem] || ORIGENS.outro;
      source = o.source; medium = "quiz"; campaign = "tatuagem-quiz"; content = "nenhum";
      origemRotulo = o.rotulo; refQ = source + "/quiz";
    }

    let etiqueta = "";
    if (source === "rafa_carteira") etiqueta += "[CONFERIR CARTEIRA] ";
    if (IDADES[resp.idade]) etiqueta += IDADES[resp.idade].etiqueta;

    const detalhes = etiqueta + "Quiz | Idade: " + (IDADES[resp.idade] ? IDADES[resp.idade].rotulo : "") +
      " | Região: " + resp.corpo + " | Ideia: " + (resp.ideia || "ainda não sabe") +
      " | Origem: " + origemRotulo + " | Destino: WhatsApp do Rafa | ref: " + refQ;

    const payload = { nome: resp.nome, whatsapp: resp.fone, detalhes: detalhes, segmento: "tatuagem",
      utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: content };

    // grava o lead (com limite de tempo: o WhatsApp abre mesmo se o banco demorar)
    let salvou = false;
    try {
      const ctl = new AbortController();
      const timer = setTimeout(function () { ctl.abort(); }, 4000);
      const r = await fetch(SUPABASE_URL + "/rest/v1/leads_hub", {
        method: "POST", signal: ctl.signal,
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: "Bearer " + SUPABASE_ANON_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify(payload)
      });
      clearTimeout(timer);
      salvou = r.ok;
      if (!r.ok) console.error("leads_hub:", r.status);
    } catch (e) { console.error("leads_hub:", e); }

    evento("generate_lead", { event_label: "quiz_tatuagem", salvou: salvou ? "sim" : "nao", idade: resp.idade, regiao: resp.corpo });
    limparSalvo();

    const url = "https://wa.me/" + NUMERO_WHATSAPP_RAFA + "?text=" + encodeURIComponent(montarMensagem(origemRotulo, refQ));
    Object.keys(passos).forEach(function (k) { passos[k].hidden = true; });
    passos["pronto"].hidden = false;
    barra.style.width = "100%"; contagem.textContent = "pronto"; btnVoltar.hidden = true;
    document.getElementById("q-wa").href = url;
    setTimeout(function () { window.location.href = url; }, 700);
  }
  document.getElementById("q-enviar").addEventListener("click", enviar);

  // "Refazer": limpa as respostas e volta para a primeira pergunta
  const btnReiniciar = document.getElementById("q-reiniciar");
  if (btnReiniciar) btnReiniciar.addEventListener("click", function () {
    Object.keys(resp).forEach(function (k) { resp[k] = ""; });
    ["q-nome", "q-ideia", "q-fone"].forEach(function (id) { const el = document.getElementById(id); if (el) el.value = ""; });
    const b = document.getElementById("q-enviar"); b.disabled = false; b.textContent = "Falar comigo no WhatsApp →";
    enviando = false; limparSalvo(); mostrar(0);
  });

  // volta de onde parou (mesma aba) e preenche os campos
  let inicio = 0;
  try {
    const salvo = JSON.parse(sessionStorage.getItem(CHAVE_QUIZ) || "null");
    if (salvo && salvo.resp) {
      Object.keys(resp).forEach(function (k) { if (typeof salvo.resp[k] === "string") resp[k] = salvo.resp[k]; });
      const idx = ordem.indexOf(salvo.passo);
      if (idx > 0) inicio = idx;
      document.getElementById("q-nome").value = resp.nome;
      document.getElementById("q-ideia").value = resp.ideia;
      document.getElementById("q-fone").value = resp.fone;
    }
  } catch (e) {}
  mostrar(inicio, true);

  // mede quantas pessoas chegam a ver o quiz (sem contar o carregamento da página)
  if ("IntersectionObserver" in window) {
    const ioQuiz = new IntersectionObserver(function (es) {
      if (es.some(function (en) { return en.isIntersecting; })) { evento("quiz_visto"); ioQuiz.disconnect(); }
    }, { threshold: 0.4 });
    ioQuiz.observe(quiz);
  }
});