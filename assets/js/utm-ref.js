/* utm-ref.js — herda a origem (hub /links/) nas paginas internas.
   1) guarda utm_source/medium/campaign da URL (ou do sessionStorage);
   2) acrescenta "(ref: origem/formato/campanha/pagina)" na mensagem de todo link wa.me,
      inclusive os criados depois do carregamento (ex: botao final do formulario do piercing).
   Sem origem conhecida, nao altera nada. */
(function () {
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];
  var clean = function (v) { return String(v || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40); };
  var store = {};
  try { store = JSON.parse(sessionStorage.getItem('hub_utm') || '{}'); } catch (e) {}

  var qs = new URLSearchParams(location.search);
  KEYS.forEach(function (k) { if (qs.has(k)) store[k] = clean(qs.get(k)); });
  try { sessionStorage.setItem('hub_utm', JSON.stringify(store)); } catch (e) {}

  if (!store.utm_source) return;

  var pagina = clean(location.pathname.split('/').filter(Boolean)[0]) || 'home';
  var ref = '(ref: ' + [store.utm_source, store.utm_medium || 'na', store.utm_campaign || 'na', pagina].join('/') + ')';

  // Links internos (home -> /piercing/, /tatuagem/...) levam a origem na URL; sem isso o formulario
  // da pagina de destino gravava "direto" mesmo vindo do hub.
  function propagarUtm(a, h) {
    if (!h || h.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(h)) return;
    var u = new URL(a.href);
    if (u.origin !== location.origin || u.searchParams.has('utm_source')) return;
    if (!/(\/|\.html?)$/i.test(u.pathname)) return;
    u.searchParams.set('utm_source', store.utm_source);
    if (store.utm_medium) u.searchParams.set('utm_medium', store.utm_medium);
    if (store.utm_campaign) u.searchParams.set('utm_campaign', store.utm_campaign);
    a.href = u.toString();
  }

  function aplicar(a) {
    try {
      var h = a.getAttribute('href') || '';
      if (h.indexOf('wa.me') === -1) { propagarUtm(a, h); return; }
      var u = new URL(a.href);
      var texto = u.searchParams.get('text') || 'Oi! Vim pelo site.';
      if (texto.indexOf('(ref:') !== -1) return;
      u.searchParams.set('text', texto + '\n\n' + ref);
      a.href = u.toString().replace(/\+/g, '%20');
    } catch (e) {}
  }
  function varrer() { document.querySelectorAll("a[href]").forEach(aplicar); }

  varrer();
  // links montados por JS (href alterado depois) — idempotente por causa do teste de "(ref:"
  new MutationObserver(function (muts) {
    muts.forEach(function (m) { if (m.target.tagName === 'A') aplicar(m.target); });
  }).observe(document.body, { attributes: true, attributeFilter: ['href'], subtree: true });
})();
