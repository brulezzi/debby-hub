/* carousel.js — indicador de posição e "empurrãozinho" para qualquer carrossel de rolagem horizontal.
   Uso: marcar o contêiner com data-carousel. Mostra uma barrinha de progresso embaixo (só quando há
   o que rolar) e, na primeira vez que o carrossel aparece, desliza um pouco para mostrar que mexe.
   Respeita "reduzir movimento". Não altera o layout do carrossel. */
(function () {
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var st = document.createElement('style');
  st.textContent =
    '.cr-bar{display:none;width:min(150px,45%);height:4px;margin:10px auto 0;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}' +
    '.cr-bar i{display:block;height:100%;width:30%;border-radius:99px;background:var(--gold,#dfb76c);transition:transform .12s linear}';
  document.head.appendChild(st);

  function montar(el) {
    if (el.__cr) return;
    el.__cr = true;
    var barra = document.createElement('div');
    barra.className = 'cr-bar';
    barra.setAttribute('aria-hidden', 'true');
    var polegar = document.createElement('i');
    barra.appendChild(polegar);
    el.insertAdjacentElement('afterend', barra);

    function atualizar() {
      var sw = el.scrollWidth, cw = el.clientWidth;
      if (sw <= cw + 4) { barra.style.display = 'none'; return; }
      barra.style.display = 'block';
      var w = Math.max(cw / sw, 0.12);
      var p = el.scrollLeft / (sw - cw);
      polegar.style.width = (w * 100) + '%';
      polegar.style.transform = 'translateX(' + (p * (1 / w - 1) * 100) + '%)';
    }
    el.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    if (window.MutationObserver) new MutationObserver(atualizar).observe(el, { childList: true });
    if (window.ResizeObserver) new ResizeObserver(atualizar).observe(el);
    atualizar();

    if (!reduz && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        if (el.scrollWidth <= el.clientWidth + 4 || el.scrollLeft > 4) return;
        el.scrollTo({ left: 64, behavior: 'smooth' });
        setTimeout(function () { if (el.scrollLeft < 120) el.scrollTo({ left: 0, behavior: 'smooth' }); }, 750);
      }, { threshold: 0.6 });
      io.observe(el);
    }
  }

  function iniciar() { Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), montar); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
