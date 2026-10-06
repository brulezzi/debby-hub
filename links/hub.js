/* Hub de links (bio do Instagram etc.)
   URL: /links/?p=debby|rafa|estudio &fmt=bio|story|reel|ads|qr|whatsapp &c=<campanha>
   Convencao de UTM (ver SKILL-002 / MAPA-MESTRE):
     utm_source   = p     (quem trouxe a pessoa — chave da comissao)
     utm_medium   = fmt   (formato)
     utm_campaign = c     (slug livre, minusculo, sem acento) — padrao "hub"
     utm_content  = botao clicado (preenchido aqui)
   utm_* ja presentes na URL (ex: anuncio) tem prioridade. */
(function () {
  var NUMERO_WA = '5519988404390';
  var PERFIS = {
    debby:   { nome: 'Debby', sub: 'Piercer · Estúdio da Debby', foto: '/assets/fotos/estudio/debby.jpeg', inicial: 'D',
               ordem: ['wa', 'piercing', 'tatuagem', 'curso-piercing', 'curso-tatuagem', 'modas', 'sexshop', 'mapa', 'ig-rafa'] },
    rafa:    { nome: 'Rafa', sub: 'Tatuador · Estúdio da Debby', foto: '/assets/fotos/tatuagem/retrato-rafa/perfil.jpg', inicial: 'R',
               ordem: ['wa', 'tatuagem', 'curso-tatuagem', 'piercing', 'curso-piercing', 'modas', 'sexshop', 'mapa', 'ig-debby'] },
    estudio: { nome: 'Estúdio da Debby', sub: 'Piercing · Tatuagem · Moda · Sex Shop', foto: '/assets/fotos/estudio/logo.jpeg', inicial: 'E',
               ordem: ['wa', 'piercing', 'tatuagem', 'curso-piercing', 'curso-tatuagem', 'modas', 'sexshop', 'mapa', 'ig-debby', 'ig-rafa'] }
  };
  var FORMATOS = ['bio', 'story', 'reel', 'ads', 'qr', 'whatsapp'];

  var ITENS = {
    'wa':             { ico: '💬', t: 'Falar no WhatsApp', d: 'Atendimento do estúdio', tipo: 'wa', msg: 'Oi! Vim pelo link da bio e quero atendimento.', principal: true },
    'piercing':       { ico: '💎', t: 'Piercing', d: 'Joias, valores e cuidados', tipo: 'int', href: '/piercing/' },
    'tatuagem':       { ico: '🖋️', t: 'Tatuagem', d: 'Trabalhos e orçamento', tipo: 'int', href: '/tatuagem/' },
    'curso-piercing': { ico: '🎓', t: 'Curso de Piercing', d: 'Com a Debby — peça informações', tipo: 'wa', msg: 'Oi! Vim pelo link da bio e quero saber do curso de piercing com a Debby.' },
    'curso-tatuagem': { ico: '🎓', t: 'Curso de Tatuagem', d: 'Com o Rafa — peça informações', tipo: 'wa', msg: 'Oi! Vim pelo link da bio e quero saber do curso de tatuagem com o Rafa.' },
    'modas':          { ico: '👗', t: 'Moda', d: 'Moda feminina', tipo: 'int', href: '/modas/' },
    'sexshop':        { ico: '🔥', t: 'Sex Shop', d: 'Produtos e atendimento discreto', tipo: 'int', href: '/sexshop/' },
    'mapa':           { ico: '📍', t: 'Como chegar', d: 'Av. Andrade Neves, 365 · Centro', tipo: 'ext', href: 'https://share.google/MZhn2SoMy7AFTXnsM' },
    'ig-debby':       { ico: '📸', t: 'Instagram da Debby', d: '@debbypiercing', tipo: 'ext', href: 'https://instagram.com/debbypiercing' },
    'ig-rafa':        { ico: '📸', t: 'Instagram do Rafa', d: '@rafa_tattos', tipo: 'ext', href: 'https://instagram.com/rafa_tattos' }
  };

  var slug = function (v, max) { return String(v || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, max || 40); };
  var qs = new URLSearchParams(location.search);

  var perfilId = slug(document.documentElement.getAttribute('data-perfil') || qs.get('utm_source') || qs.get('p'));
  if (!PERFIS[perfilId]) perfilId = 'estudio';
  var fmt = slug(qs.get('utm_medium') || qs.get('fmt'));
  if (FORMATOS.indexOf(fmt) === -1) fmt = 'bio';
  var camp = slug(qs.get('utm_campaign') || qs.get('c')) || 'hub';
  var perfil = PERFIS[perfilId];

  /* Perfil */
  document.getElementById('nome').textContent = perfil.nome;
  document.getElementById('sub').textContent = perfil.sub;
  var av = document.getElementById('avatar');
  var img = new Image();
  img.alt = '';
  img.onload = function () { av.textContent = ''; av.appendChild(img); };
  img.onerror = function () { av.textContent = perfil.inicial; };
  av.textContent = perfil.inicial;
  img.src = perfil.foto;
  document.title = perfil.nome + ' — Estúdio da Debby';

  /* GA4: sessao atribuida a origem do hub (a URL usa p/fmt/c, nao utm_*) */
  gtag('config', 'G-WYRS5RBYGM', { campaign_source: perfilId, campaign_medium: fmt, campaign_name: camp });
  gtag('set', 'user_properties', { perfil_origem: perfilId });

  var refBase = perfilId + '/' + fmt + '/' + camp;

  function montarHref(id, it) {
    var utm = 'utm_source=' + perfilId + '&utm_medium=' + fmt + '&utm_campaign=' + camp + '&utm_content=' + id;
    if (it.tipo === 'int') return it.href + '?' + utm;
    if (it.tipo === 'wa') {
      return 'https://wa.me/' + NUMERO_WA + '?text=' + encodeURIComponent(it.msg + '\n\n(ref: ' + refBase + '/' + id + ')');
    }
    return it.href;
  }

  var lista = document.getElementById('lista');
  lista.textContent = '';
  var sepFeito = false;
  perfil.ordem.forEach(function (id, i) {
    var it = ITENS[id];
    if (!it) return;
    if (!sepFeito && i > 0 && !it.principal && (id === 'modas')) {
      var s = document.createElement('p'); s.className = 'sep'; s.textContent = 'Mais do estúdio'; lista.appendChild(s); sepFeito = true;
    }
    var a = document.createElement('a');
    a.className = 'btn' + (it.principal ? ' principal' : '');
    a.href = montarHref(id, it);
    if (it.tipo === 'ext') { a.target = '_blank'; a.rel = 'noopener'; }
    a.setAttribute('data-track', 'hub-' + id);
    a.innerHTML = '<span class="ico"></span><span class="txt"><span class="t"></span><span class="d"></span></span>';
    a.querySelector('.ico').textContent = it.ico;
    a.querySelector('.t').textContent = it.t;
    a.querySelector('.d').textContent = it.d;
    a.addEventListener('click', function () {
      gtag('event', 'hub_click', { perfil: perfilId, formato: fmt, campanha: camp, destino: id, transport_type: 'beacon' });
    });
    lista.appendChild(a);
  });
})();
