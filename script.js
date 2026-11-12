(function () {
  'use strict';
  var S = window.SITE;
  if (!S) return;

  var HIDDEN = { '확인 필요': 1, '넣을지 확인': 1 };
  var TYPE_OF_FILTER = { talks: 'talk', roles: 'role', awards: 'award', training: 'training' };
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
  var visible = S.career.filter(function (c) { return !HIDDEN[c.status]; });
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

  /* ───── 숫자 띠 ───── */
  function count(type) { return visible.filter(function (c) { return c.type === type && isConfirmed(c); }).length; }
  var liveApps = S.apps.filter(function (a) { return a.state === 'live'; }).length;
  var stats = [
    { n: count('talk'), unit: '회', label: '강의·발표' },
    { n: liveApps, unit: '개', label: '공개한 웹앱' },
    { n: count('role'), unit: '건', label: '위촉·연구회·지원' },
    { n: count('award'), unit: '건', label: '수상' }
  ];
  var statsEl = document.getElementById('stats');
  statsEl.innerHTML = stats.map(function (s) {
    return '<div class="stat"><span class="stat__num">' + s.n + '<small>' + s.unit + '</small></span>' +
      '<span class="stat__label">' + esc(s.label) + '</span></div>';
  }).join('');

  /* ───── 웹앱 ───── */
  var AWARD_ICON = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>';

  function stateBadge(a) {
    return a.state === 'live'
      ? '<span class="badge"><span class="dot dot--ok"></span>공개 중</span>'
      : '<span class="badge"><span class="dot dot--wip"></span>개발 중</span>';
  }
  function shot(a, eager) {
    var inner = a.img
      ? '<img class="shot__img" src="' + a.img + '" width="' + a.imgW + '" height="' + a.imgH + '" alt="' + esc(a.alt) + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">'
      : '<div class="shot__empty">배포 전</div>';
    return '<div class="shot"><div class="shot__bar" aria-hidden="true"></div>' + inner + '</div>';
  }

  var f = S.apps.filter(function (a) { return a.featured; })[0];
  if (f) {
    document.getElementById('featured').innerHTML =
      '<article class="feature" aria-labelledby="app-' + f.id + '">' +
        '<div class="feature__media">' + (f.url ? '<a href="' + f.url + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">' + shot(f, false) + '</a>' : shot(f, false)) + '</div>' +
        '<div class="feature__body">' +
          '<div class="badges"><span class="badge badge--accent badge--strong">대표작</span>' + stateBadge(f) + '</div>' +
          '<h3 class="feature__name" id="app-' + f.id + '">' + esc(f.name) + ' <small>' + esc(f.nameEn) + '</small></h3>' +
          '<p class="feature__desc">' + esc(f.desc) + '</p>' +
          '<p class="feature__award">' + AWARD_ICON + '<span>' + esc(f.award) + (f.awardDate ? ' <span class="award__date"><span class="award__sep">· </span>' + esc(f.awardDate) + '</span>' : '') + '</span></p>' +
          '<ul class="tags" role="list" aria-label="기술">' + f.tags.map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="feature__links">' +
            (f.url ? '<a class="btn btn--primary" href="' + f.url + '" target="_blank" rel="noopener">앱 열기 <span class="arrow" aria-hidden="true">↗</span></a>' : '') +
            (f.repo ? '<a class="btn btn--ghost" href="' + f.repo + '" target="_blank" rel="noopener">코드 보기 <span class="arrow" aria-hidden="true">↗</span></a>' : '') +
          '</div>' +
        '</div>' +
      '</article>';
  }

  var others = S.apps.filter(function (a) { return !a.featured; })
    .sort(function (a, b) { return (a.state === 'wip') - (b.state === 'wip'); });
  document.getElementById('apps-list').innerHTML = others.map(function (a) {
    // 스크린샷이 없는 앱(개발 중)은 그림 칸 없이 가로로 긴 짧은 카드
    if (!a.img) {
      return '<li class="apps__wide"><a class="app app--wide" href="' + a.url + '" target="_blank" rel="noopener">' +
        '<div class="app__body">' +
          '<div class="app__head"><h4 class="app__name">' + esc(a.name) + '</h4>' + stateBadge(a) + '</div>' +
          '<p class="app__desc">' + esc(a.desc) + '</p>' +
          '<div class="app__foot"><ul class="tags" role="list" aria-label="기술">' + a.tags.slice(0, 3).map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<p class="app__meta"><span>' + esc(a.meta) + '</span><span class="arrow" aria-hidden="true">↗</span></p></div>' +
        '</div></a></li>';
    }
    return '<li><a class="app" href="' + a.url + '" target="_blank" rel="noopener">' +
      shot(a, false) +
      '<div class="app__body">' +
        '<div class="badges">' + stateBadge(a) + '</div>' +
        '<h4 class="app__name">' + esc(a.name) + (a.sub ? '<small>' + esc(a.sub) + '</small>' : '') + '</h4>' +
        '<p class="app__desc">' + esc(a.desc) + '</p>' +
        '<ul class="tags" role="list" aria-label="기술">' + a.tags.slice(0, 3).map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('') + '</ul>' +
        (a.linked ? '<p class="app__linked">' + esc(a.linked) + '</p>' : '') +
        '<p class="app__meta"><span>' + esc(a.meta) + '</span><span class="arrow" aria-hidden="true">↗</span></p>' +
      '</div></a></li>';
  }).join('');

  /* ───── 대표 수상 ───── */
  var top = visible.filter(function (c) { return c.type === 'award' && c.featured && isConfirmed(c); })[0];
  if (top) {
    var hl = document.getElementById('highlight');
    hl.innerHTML = AWARD_ICON +
      '<span><span class="highlight__k">대표 수상</span>' + esc(top.title.replace(/\s*\(.*\)$/, '')) + ' ' + esc(top.role) +
      '<span class="highlight__meta">' + esc(top.org) + ' · <time datetime="' + top.date + '">' + esc(top.label) + '</time></span></span>';
    hl.hidden = false;
  }

  /* ───── 경력 기록부 ───── */
  // 같은 이름의 강의 묶기
  function buildEntries(list) {
    var groups = {}, out = [];
    list.forEach(function (c) {
      if (c.group) {
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
    var html = '';
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
          return '<span class="row__sub"><time datetime="' + i.date + '">' + esc(i.label) + '</time> <b>' + esc(i.note || '') + '</b> · ' + esc(i.org) + '</span>';
        }).join('') + '</div>';
    } else {
      body = '<h4 class="row__title">' + esc(e.title) + '</h4>' +
        '<p class="row__org">' + esc(e.org) + '</p>';
    }
    var dateCell = e.isGroup
      ? '<time class="row__date" datetime="' + e.date + '">' + dateHTML(e.label) + '</time>'
      : '<time class="row__date"' + (e.undated ? '' : ' datetime="' + e.date + '"') + '>' + dateHTML(e.label) + '</time>';
    return '<li class="' + cls + '"><span class="row__dot" aria-hidden="true"></span>' +
      dateCell + body +
      '<div class="row__badge">' + badgeFor(e) + '</div></li>';
  }

  var logEl = document.getElementById('log');
  function render(filter) {
    var list = filter === 'all' ? visible : visible.filter(function (c) { return c.type === TYPE_OF_FILTER[filter]; });
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

  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setFilter(k, fromUser) {
    if (!TYPE_OF_FILTER[k] && k !== 'all') k = 'all';
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
  if (!fromHash()) render('all');
  window.addEventListener('hashchange', fromHash);

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
