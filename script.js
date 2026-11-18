(function () {
  'use strict';
  var S = window.SITE;
  if (!S) return;
  // 관리자 모드(?admin): admin.js가 켠다. 숨긴 항목도 흐리게 보이고, 카드를 누르면 편집 창이 열린다
  var ADMIN = /[?&]admin\b/.test(location.search) || location.hash === '#admin';

  var HIDDEN = { '확인 필요': 1, '넣을지 확인': 1 };
  var TYPE_OF_FILTER = { talks: 'talk', awards: 'award', training: 'training' };  // 위촉·연구회는 화면에서 뺌 (데이터는 data.js에 남김)
  var ACCENT_ROLES = { '강사': 1 };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function parseDate(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today0() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function fmt(d) {
    return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
  }

  var TODAY = today0();
  var visible;
  function computeVisible() {
    visible = S.career.filter(function (c) { return !HIDDEN[c.status] && (ADMIN || !c.hidden); });
  }
  computeVisible();
  function isConfirmed(c) { return c.status === ''; }
  // 예정 항목이 날짜가 지나면 모양만 '지난 일'로. 숫자 띠에는 status가 바뀌기 전까지 세지 않는다.
  function isUpcoming(c) {
    if (c.status !== '예정') return false;
    if (c.undated) return true;
    return parseDate(c.date) >= TODAY;
  }

  /* ───── 기준일: data.js asOf 한 곳만 고치면 된다 ───── */
  if (S.asOf) {
    var asOfText = S.asOf.split('-').join('.') + ' 기준';
    Array.prototype.forEach.call(document.querySelectorAll('[data-asof]'), function (t) {
      t.setAttribute('datetime', S.asOf); t.textContent = asOfText;
    });
  }


  /* ───── SNS ───── */
  var SNS_ICONS = {"threads": "<svg aria-hidden=\"true\" width=\"26\" height=\"26\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M17.7 11.1c-.1 0-.2-.1-.3-.1-.2-3.2-1.9-5-4.8-5h-.1c-1.7 0-3.2.7-4.1 2.1l1.6 1.1c.7-1 1.7-1.2 2.5-1.2 1 0 1.8.3 2.3.9.4.4.6 1 .7 1.8-.8-.1-1.7-.2-2.6-.1-2.6.2-4.3 1.7-4.2 3.8.1 1.1.6 2 1.5 2.6.8.5 1.8.8 2.8.7 1.4-.1 2.5-.6 3.3-1.6.6-.7 1-1.7 1.1-2.9.7.4 1.2 1 1.5 1.6.5 1.1.5 2.9-1 4.4-1.3 1.3-2.8 1.8-5.2 1.8-2.6 0-4.5-.8-5.8-2.5C6 16.9 5.4 14.7 5.3 12c.1-2.7.7-4.9 1.9-6.5C8.4 3.8 10.4 3 13 3c2.6 0 4.6.8 5.9 2.5.7.8 1.1 1.8 1.4 3l1.9-.5c-.4-1.4-1-2.7-1.8-3.7C18.7 2.1 16.2 1 13 1h-.1C9.7 1 7.2 2.1 5.6 4.3 4.1 6.2 3.4 8.8 3.3 12c.1 3.2.8 5.8 2.3 7.7C7.2 21.9 9.7 23 12.9 23h.1c2.8 0 4.8-.7 6.5-2.4 2.2-2.2 2.1-4.9 1.4-6.6-.5-1.2-1.6-2.2-3.2-2.9zm-4.9 4.6c-1.1.1-2.3-.4-2.3-1.5 0-.8.6-1.7 2.4-1.8h.6c.7 0 1.3.1 1.9.2-.2 2.7-1.5 3-2.6 3.1z\"/></svg>"};
  var snsList = S.sns || [];
  var snsEl = document.getElementById('sns-list');
  if (snsEl) {
    snsEl.classList.toggle('sns--many', snsList.length > 1);
    snsEl.innerHTML = snsList.map(function (n) {
      return '<li><a class="sns-card" href="' + n.url + '" target="_blank" rel="noopener me">' +
        '<span class="sns-card__icon">' + (SNS_ICONS[n.id] || '') + '</span>' +
        '<span class="sns-card__body"><span class="sns-card__name">' + esc(n.name) + '<small>' + esc(n.handle) + '</small></span>' +
        (n.desc ? '<span class="sns-card__desc">' + esc(n.desc) + '</span>' : '') + '</span>' +
        '<span class="arrow" aria-hidden="true">↗</span></a></li>';
    }).join('');
  }

  /* ───── 테마 (기본 다크, 고른 값 기억) ───── */
  var themeBtn = document.getElementById('theme-btn');
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', t === 'light' ? '#FFFFFF' : '#17171C');
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'light' ? '어두운 화면으로 바꾸기' : '밝은 화면으로 바꾸기');
  }
  applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

  /* ───── 웹앱 ───── */
  var AWARD_ICON = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>';

  function stateBadge(a) {
    var hid = a.hidden ? '<span class="badge badge--hidden">숨김</span>' : '';
    return hid + (a.state === 'live'
      ? '<span class="badge"><span class="dot dot--ok"></span>공개 중</span>'
      : '<span class="badge"><span class="dot dot--wip"></span>개발 중</span>');
  }
  function appAttrs(a) { return ' data-app="' + esc(a.id) + '"' + (a.hidden ? ' data-hidden' : ''); }
  function shot(a, eager) {
    var inner = a.img
      ? '<img class="shot__img" src="' + a.img + '" width="' + a.imgW + '" height="' + a.imgH + '" alt="' + esc(a.alt) + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">'
      : '<div class="shot__empty">배포 전</div>';
    return '<div class="shot"><div class="shot__bar" aria-hidden="true"></div>' + inner + '</div>';
  }

  function renderApps() {
  var shown = S.apps.filter(function (a) { return ADMIN || !a.hidden; });
  // 같은 위계: 수상작 → 공개 중 → 개발 중 (2026-11-19 사용자)
  var rank = function (a) { return a.award ? 0 : (a.state === 'wip' ? 2 : 1); };
  var others = shown.slice().sort(function (a, b) { return rank(a) - rank(b); });
  document.getElementById('apps-list').innerHTML = others.map(function (a) {
    // 스크린샷이 없는 앱(개발 중)은 그림 칸 없이 가로로 긴 짧은 카드
    if (!a.img) {
      return '<li class="apps__wide"' + appAttrs(a) + '><a class="app app--wide" href="' + esc(a.url || '#') + '" target="_blank" rel="noopener">' +
        '<div class="app__body">' +
          '<div class="app__head"><h4 class="app__name">' + esc(a.name) + '</h4>' + stateBadge(a) + '</div>' +
          '<p class="app__desc">' + esc(a.desc) + '</p>' +
          '<div class="app__foot"><ul class="tags" role="list" aria-label="기술">' + a.tags.slice(0, 3).map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<p class="app__meta"><span>' + esc(a.meta) + '</span><span class="arrow" aria-hidden="true">↗</span></p></div>' +
        '</div></a></li>';
    }
    return '<li' + appAttrs(a) + '><a class="app" href="' + esc(a.url || a.repo || '#') + '" target="_blank" rel="noopener">' +
      shot(a, false) +
      '<div class="app__body">' +
        '<div class="badges">' + stateBadge(a) + '</div>' +
        '<h4 class="app__name">' + esc(a.name) + (a.sub ? '<small>' + esc(a.sub) + '</small>' : '') + '</h4>' +
        '<p class="app__desc">' + esc(a.desc) + '</p>' +
        (a.award ? '<p class="app__award">' + AWARD_ICON + '<span>' + esc(a.award) + (a.awardDate ? ' · ' + esc(a.awardDate) : '') + '</span></p>' : '') +
        '<ul class="tags" role="list" aria-label="기술">' + a.tags.slice(0, 3).map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('') + '</ul>' +
        (a.linked ? '<p class="app__linked">' + esc(a.linked) + '</p>' : '') +
        '<p class="app__meta"><span>' + esc(a.meta || (a.repo ? '코드 보기' : '')) + '</span><span class="arrow" aria-hidden="true">↗</span></p>' +
      '</div></a></li>';
  }).join('');

  // 강의자료: 표지만 (링크 없음)
  var ml = document.getElementById('materials-list');
  if (ml) ml.innerHTML = (S.materials || []).filter(function (m) { return ADMIN || !m.hidden; }).map(function (m) {
    return '<li><div class="app app--static">' +
      '<div class="shot"><div class="shot__bar" aria-hidden="true"></div><img class="shot__img" src="' + m.img + '" width="' + m.imgW + '" height="' + m.imgH + '" alt="' + esc(m.alt) + '" loading="lazy" decoding="async"></div>' +
      '<div class="app__body">' +
        '<h4 class="app__name">' + esc(m.title) + '</h4>' +
        '<p class="app__linked">' + esc(m.org) + '</p>' +
        '<p class="app__meta"><time datetime="' + m.date + '">' + esc(m.label) + '</time></p>' +
      '</div></div></li>';
  }).join('');
  }
  renderApps();

  /* ───── 웹앱 / 강의자료 고르기 ───── */
  var workTabs = Array.prototype.slice.call(document.querySelectorAll('[data-work]'));
  function setWork(k) {
    if (k !== 'materials') k = 'apps';
    workTabs.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-work') === k)); });
    document.getElementById('apps-list').hidden = k !== 'apps';
    document.getElementById('materials-list').hidden = k !== 'materials';
    var gh = document.getElementById('gh-link'); if (gh) gh.hidden = k !== 'apps';
  }
  workTabs.forEach(function (b) { b.addEventListener('click', function () { setWork(b.getAttribute('data-work')); }); });
  Array.prototype.forEach.call(document.querySelectorAll('a[href="#apps"], a[href="#materials"]'), function (a) {
    a.addEventListener('click', function () { setWork(a.getAttribute('href') === '#materials' ? 'materials' : 'apps'); });
  });
  if (location.hash === '#materials') setWork('materials');

  /* ───── 대표 수상 ───── */
  function renderHighlight() {
  var tops = visible.filter(function (c) { return c.type === 'award' && c.featured && isConfirmed(c) && !c.hidden; })
    .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var hl = document.getElementById('highlight');
  hl.hidden = !tops.length;
  hl.innerHTML = tops.map(function (top) {
    var app = top.app ? S.apps.filter(function (a) { return a.id === top.app; })[0] : null;
    var thumb = app && app.img ? '<img class="highlight__thumb" src="' + app.img + '" width="' + app.imgW + '" height="' + app.imgH + '" alt="' + esc(app.name) + ' 화면" loading="lazy" decoding="async">' : '';
    var link = app ? (app.url || app.repo) : null;
    var inner = AWARD_ICON +
      '<span class="highlight__text"><span class="highlight__k">수상' + (app ? ' · ' + esc(app.name) : '') + '</span>' + esc(top.title.replace(/\s*\(.*\)$/, '')) + ' ' + esc(top.role) +
      '<span class="highlight__meta">' + esc(top.org) + ' · <time datetime="' + top.date + '">' + esc(top.label) + '</time></span></span>' + thumb;
    return link ? '<a class="highlight" href="' + esc(link) + '" target="_blank" rel="noopener">' + inner + '</a>' : '<p class="highlight">' + inner + '</p>';
  }).join('');
  }
  renderHighlight();

  /* ───── 경력 기록부 ───── */
  // 같은 이름의 강의 묶기
  function buildEntries(list) {
    var groups = {}, out = [];
    list.forEach(function (c) {
      if (c.group && !ADMIN) {  // 관리자 모드에선 하나씩 고치게 묶지 않는다
        if (!groups[c.group]) { groups[c.group] = { isGroup: true, title: c.group, type: c.type, items: [] }; out.push(groups[c.group]); }
        groups[c.group].items.push(c);
      } else out.push(c);
    });
    out.forEach(function (e) {
      if (e.isGroup) {
        e.items.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
        var lead = e.items[0];
        e.date = lead.date; e.role = lead.role; e.status = lead.status; e.org = lead.org; e.undated = false;
        // 묶은 행의 날짜 칸은 기간(groupLabel). 하위 줄에만 날짜를 둔다
        e.label = e.items.map(function (i) { return i.groupLabel; }).filter(Boolean)[0] || lead.label;
      }
    });
    return out.sort(function (a, b) {
      var ua = isUpcoming(a), ub = isUpcoming(b);
      if (ua !== ub) return ua ? -1 : 1;
      if (!!a.undated !== !!b.undated) return a.undated ? -1 : 1;
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
  }

  function badgeFor(c) {
    var html = c.hidden ? '<span class="badge badge--hidden">숨김</span>' : '';
    if (c.role) {
      var cls = 'badge';
      if (c.type === 'award') cls += ' badge--accent badge--strong';
      else if (ACCENT_ROLES[c.role]) cls += ' badge--accent';
      html += '<span class="' + cls + '">' + esc(c.role) + '</span>';
    }
    if (c.status === '예정' && !isUpcoming(c)) {
      // 날짜가 지났지만 했다고 확인하지 않은 항목 → 회색 '예정' 배지를 남긴다
      html += '<span class="badge">예정</span>';
    } else if (isUpcoming(c)) {
      if (c.undated) html += '<span class="badge">예정</span>';
      else {
        var d = Math.round((parseDate(c.date) - TODAY) / 86400000);
        html += '<span class="dday">' + (d === 0 ? 'D-DAY' : 'D-' + d) + '</span>';
      }
    }
    return html;
  }

  function dateHTML(label) {
    // '2026.04 – 2027.02' → 데스크톱에선 두 줄
    var p = label.split(' – ');
    // '2026.07 – 11'처럼 뒤가 짧으면 한 줄로 둔다 (한 단어만 다음 줄로 떨어지지 않게)
    if (p.length === 2 && p[1].indexOf('.') > -1) return '<span>' + esc(p[0]) + ' –</span> <span>' + esc(p[1]) + '</span>';
    return esc(label);
  }

  function rowHTML(e) {
    var cls = 'row row--' + e.type + (isUpcoming(e) ? ' row--upcoming' : '');
    var body;
    if (e.isGroup) {
      body = '<h4 class="row__title">' + esc(e.title) + '<span class="badge count">' + e.items.length + '회</span></h4>' +
        '<div class="row__subs">' + e.items.map(function (i) {
          var il = ADMIN && window.PF_LECTURES ? window.PF_LECTURES.filter(function (l) { return l.date === i.date; }) : [];
          return '<span class="row__sub"><time datetime="' + i.date + '">' + esc(i.label) + '</time> <b>' + esc(i.note || '') + '</b> · ' + esc(i.org) +
            il.map(function (l) { return '<span class="row__lecture">🔒 강의안 · ' + esc(l.title) + (l.where ? ' <small>(' + esc(l.where) + ')</small>' : '') + '</span>'; }).join('') + '</span>';
        }).join('') + '</div>';
    } else {
      var lec = ADMIN && window.PF_LECTURES ? window.PF_LECTURES.filter(function (l) { return l.date === e.date; }) : [];
      body = '<h4 class="row__title">' + esc(e.title) + '</h4>' +
        '<p class="row__org">' + esc(e.org) +
          (e.material ? ' · <a class="row__link" href="' + esc(e.material.url) + '" target="_blank" rel="noopener">' + esc(e.material.label) + ' <span aria-hidden="true">↗</span></a>' : '') +
          lec.map(function (l) { return '<span class="row__lecture">🔒 강의안 · ' + esc(l.title) + (l.where ? ' <small>(' + esc(l.where) + ')</small>' : '') + '</span>'; }).join('') +
        '</p>';
    }
    var dateCell = e.isGroup
      ? '<time class="row__date" datetime="' + e.date + '">' + dateHTML(e.label) + '</time>'
      : '<time class="row__date"' + (e.undated ? '' : ' datetime="' + e.date + '"') + '>' + dateHTML(e.label) + '</time>';
    var attrs = e.isGroup ? '' : ' data-ci="' + S.career.indexOf(e) + '"' + (e.hidden ? ' data-hidden' : '');
    return '<li class="' + cls + '"' + attrs + '><span class="row__dot" aria-hidden="true"></span>' +
      dateCell + body +
      '<div class="row__badge">' + badgeFor(e) + '</div></li>';
  }

  var logEl = document.getElementById('log');
  var curFilter = 'talks';
  function render(filter) {
    curFilter = filter;
    var list = visible.filter(function (c) { return c.type === TYPE_OF_FILTER[filter]; });
    var entries = buildEntries(list);
    if (!entries.length) { logEl.innerHTML = '<p class="empty">항목이 없습니다.</p>'; return; }
    var years = {}, order = [];
    entries.forEach(function (e) {
      var y = e.date.slice(0, 4);
      if (!years[y]) { years[y] = []; order.push(y); }
      years[y].push(e);
    });
    order.sort(function (a, b) { return b - a; });
    var todayDrawn = false;
    var hasUpcoming = entries.some(isUpcoming);
    logEl.innerHTML = order.map(function (y) {
      var rows = '';
      years[y].forEach(function (e) {
        if (hasUpcoming && !todayDrawn && !isUpcoming(e)) {
          rows += '</ul><p class="today" role="separator"><span>오늘 · <time datetime="' + fmt(TODAY).split('.').join('-') + '">' + fmt(TODAY) + '</time></span></p><ul class="rows" role="list">';
          todayDrawn = true;
        }
        rows += rowHTML(e);
      });
      return '<section class="year" aria-label="' + y + '년"><h3 class="year__head">' + y + '</h3><ul class="rows" role="list">' + rows + '</ul></section>';
    }).join('').replace(/<ul class="rows" role="list"><\/ul>/g, '');
  }

  var chips = Array.prototype.slice.call(document.querySelectorAll('#career .chip'));

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setFilter(k, fromUser) {
    if (!TYPE_OF_FILTER[k]) k = 'talks';
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === k)); });
    if (fromUser && !reduce) {
      logEl.classList.add('is-fading');
      setTimeout(function () { render(k); logEl.classList.remove('is-fading'); }, 120);
    } else render(k);
    if (fromUser && history.replaceState) history.replaceState(null, '', '#career-' + k);
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () { setFilter(c.getAttribute('data-filter'), true); });
  });

  function fromHash() {
    var m = /^#career-(\w+)$/.exec(location.hash);
    if (m) {
      setFilter(m[1], false);
      var sec = document.getElementById('career');
      requestAnimationFrame(function () { sec.scrollIntoView(); });
      return true;
    }
    return false;
  }
  if (!fromHash()) render('talks');
  window.addEventListener('hashchange', fromHash);

  // admin.js가 쓰는 손잡이: 내용을 바꾸고 다시 그리기
  window.PF = {
    admin: ADMIN,
    site: function () { return S; },
    setSite: function (n) { S = n; window.SITE = n; this.refresh(); },
    refresh: function () { computeVisible(); renderApps(); renderHighlight(); render(curFilter); },
    filter: function () { return curFilter; }
  };
  if (ADMIN) {
    var sc = document.createElement('script');
    sc.src = 'admin.js?v=' + Date.now();
    document.body.appendChild(sc);
  }

  /* ───── 상단 바 선 ───── */
  var bar = document.getElementById('topbar');
  function onScroll() { bar.classList.toggle('is-scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ───── 섹션 첫 등장 ───── */
  var secs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('is-hidden'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    Array.prototype.forEach.call(secs, function (s) {
      var r = s.getBoundingClientRect();
      if (r.top > window.innerHeight) { s.classList.add('is-hidden'); io.observe(s); }
    });
  }

  /* ───── 이메일 복사 ───── */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    var label = btn.querySelector('.copy__label');
    var timer;
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      function done() {
        label.textContent = '복사됨';
        btn.classList.add('is-done');
        clearTimeout(timer);
        timer = setTimeout(function () { label.textContent = '복사'; btn.classList.remove('is-done'); }, 1500);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else fallback();
      function fallback() {
        var t = document.createElement('textarea');
        t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* 복사 실패 시 버튼 그대로 */ }
        document.body.removeChild(t);
      }
    });
  });
})();
