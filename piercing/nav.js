/* Navegacao da pagina /piercing/: barra de secoes ("onde estou") e botao flutuante do check-in.
   Um unico ouvinte de rolagem (no maximo 1 execucao a cada 60 ms): funciona tambem em saltos grandes
   (clicar numa secao distante), coisa que observadores de intersecao perdem. */
(function () {
  var sitenav = document.getElementById('sitenav');
  var subnav = document.getElementById('subnav');
  var cta = document.getElementById('cta-flutuante');
  if (!subnav) return;

  var links = Array.prototype.slice.call(subnav.querySelectorAll('a[href^="#"]'));
  var secoes = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var secComo = document.getElementById('como');
  var secCheckin = document.getElementById('checkin');
  var faixa = subnav.querySelector('.subnav-in');
  var atual = null, aguardando = false;

  function altura() {
    if (sitenav) document.documentElement.style.setProperty('--nav-h', sitenav.offsetHeight + 'px');
  }
  altura();
  window.addEventListener('resize', altura);
  window.addEventListener('load', altura);

  function marcar(id) {
    if (id === atual) return;
    atual = id;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      if (on && faixa) faixa.scrollTo({ left: a.offsetLeft - (faixa.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
    });
  }

  function atualizar() {
    aguardando = false;
    var h = window.innerHeight, id = null;
    secoes.forEach(function (s) { if (s && s.getBoundingClientRect().top <= h * 0.35) id = s.id; });
    if (window.scrollY + h >= document.documentElement.scrollHeight - 4) id = secoes[secoes.length - 1].id;
    marcar(id);
    if (cta) {
      var passouComo = !!secComo && secComo.getBoundingClientRect().top <= h * 0.5;
      var r = secCheckin ? secCheckin.getBoundingClientRect() : null;
      var noCheckin = !!r && r.top < h * 0.85 && r.bottom > h * 0.15;
      var on = passouComo && !noCheckin;
      cta.classList.toggle('on', on);
      cta.setAttribute('aria-hidden', on ? 'false' : 'true');
      cta.tabIndex = on ? 0 : -1;
    }
  }

  window.addEventListener('scroll', function () { if (!aguardando) { aguardando = true; setTimeout(atualizar, 60); } }, { passive: true });
  atualizar();

  // fecha o menu aberto ao tocar fora dele ou ao escolher uma secao
  document.addEventListener('click', function (e) {
    if (sitenav && sitenav.classList.contains('open') && !sitenav.contains(e.target)) sitenav.classList.remove('open');
  });
  links.forEach(function (a) { a.addEventListener('click', function () { if (sitenav) sitenav.classList.remove('open'); }); });
})();
