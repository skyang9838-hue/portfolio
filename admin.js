/*
  관리자 모드 — 주소 뒤에 ?admin 을 붙이면 켜진다 (script.js가 이 파일을 불러온다).
  GitHub 토큰(이 저장소 Contents 읽기·쓰기)으로 최신 data.js를 불러와 고치고, 저장하면 data.js에 바로 커밋한다.
  Pages가 다시 빌드되는 1~2분 뒤 공개 사이트에 반영된다. 토큰은 이 브라우저 localStorage에만 둔다.
*/
(function () {
  'use strict';
  var PF = window.PF;
  if (!PF || !PF.admin) return;

  var REPO = 'skyang9838-hue/portfolio';
  var FILE = 'data.js';
  var API = 'https://api.github.com/repos/' + REPO + '/contents/' + FILE;
  var TOKEN_KEY = 'pf-gh-token';

  var sha = null;         // 불러온 data.js의 버전 (저장 때 겹침 확인)
  var header = '';        // data.js 맨 위 설명 주석 (그대로 둔다)
  var saved = '';         // 마지막으로 저장(불러온) 내용 — 바뀐 게 있는지 비교
  var loaded = false;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function getToken() { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } }
  function setToken(t) { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch (e) {} }
  function b64decode(s) { return decodeURIComponent(escape(atob(s.replace(/\n/g, '')))); }
  function b64encode(s) { return btoa(unescape(encodeURIComponent(s))); }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function snapshot() { return JSON.stringify(PF.site()); }
  function dirty() { return loaded && snapshot() !== saved; }

  /* ───── 모양 ───── */
  var css = document.createElement('style');
  css.textContent = [
    '.adm-bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:100;display:flex;flex-wrap:wrap;align-items:center;gap:8px;',
    'max-width:calc(100vw - 32px);padding:10px 12px;border-radius:16px;background:var(--surface);border:1px solid var(--line);box-shadow:0 8px 32px rgba(0,0,0,.25);font-size:14px;color:var(--text)}',
    '.adm-bar b{color:var(--accent-text);margin-right:4px}',
    '.adm-msg{color:var(--text-2);margin-right:4px}',
    '.adm-msg.is-dirty{color:var(--wip);font-weight:600}',
    '.adm-btn{min-height:36px;padding:0 12px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:inherit;cursor:pointer}',
    '.adm-btn:hover{background:var(--surface-2)}',
    '.adm-btn--primary{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}',
    '.adm-btn--primary:hover{background:var(--accent);filter:brightness(1.08)}',
    '.adm-btn--danger{color:#e5484d}',
    '.adm-btn:disabled{opacity:.45;cursor:default}',
    'body.adm [data-app],body.adm [data-ci]{cursor:pointer;outline:2px dashed transparent;outline-offset:4px;border-radius:12px}',
    'body.adm [data-app]:hover,body.adm [data-ci]:hover{outline-color:var(--accent)}',
    'body.adm [data-hidden]{opacity:.42}',
    '.badge--hidden{background:#e5484d22;color:#e5484d;font-weight:700}',
    '.adm-dlg{width:min(560px,calc(100vw - 32px));max-height:calc(100vh - 48px);padding:0;border:1px solid var(--line);border-radius:18px;background:var(--surface);color:var(--text)}',
    '.adm-dlg::backdrop{background:rgba(0,0,0,.5)}',
    '.adm-form{display:grid;gap:12px;padding:20px}',
    '.adm-form h3{margin:0 0 4px;font-size:19px}',
    '.adm-form label{display:grid;gap:4px;font-size:13px;color:var(--text-2)}',
    '.adm-form input[type=text],.adm-form input[type=date],.adm-form input[type=password],.adm-form textarea,.adm-form select{width:100%;box-sizing:border-box;min-height:40px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:inherit;font-size:15px}',
    '.adm-form textarea{min-height:84px;resize:vertical}',
    '.adm-form .adm-check{display:flex;align-items:center;gap:8px;font-size:15px;color:var(--text)}',
    '.adm-form .adm-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.adm-seg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}',
    '.adm-seg button{min-height:40px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text-2);font:inherit;cursor:pointer}',
    '.adm-seg button[aria-pressed=true]{border-color:var(--accent);background:var(--accent-weak);color:var(--accent-text);font-weight:700}',
    '.adm-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:4px}',
    '.adm-actions .adm-left{margin-right:auto}',
    '.adm-help{margin:0;font-size:13px;line-height:1.6;color:var(--text-2)}',
    '.adm-help a{color:var(--link)}',
    '.adm-err{margin:0;color:#e5484d;font-size:13px;min-height:1em}',
    '@media (max-width:560px){.adm-form .adm-row{grid-template-columns:1fr}',
    '.adm-bar{left:12px;right:12px;bottom:12px;transform:none;max-width:none;justify-content:center;gap:6px;padding:8px}',
    '.adm-bar .adm-msg{flex-basis:100%;text-align:center;font-size:13px}.adm-btn{padding:0 10px}}'
  ].join('\n');
  document.head.appendChild(css);
  document.body.classList.add('adm');

  /* ───── 아래 막대 ───── */
  var bar = document.createElement('div');
  bar.className = 'adm-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', '관리자 모드');
  bar.innerHTML =
    '<b>관리자</b><span class="adm-msg" id="adm-msg">불러오는 중…</span>' +
    '<button class="adm-btn" type="button" id="adm-add">+ 이력 추가</button>' +
    '<button class="adm-btn" type="button" id="adm-undo" disabled>되돌리기</button>' +
    '<button class="adm-btn adm-btn--primary" type="button" id="adm-save" disabled>저장</button>' +
    '<button class="adm-btn" type="button" id="adm-token">토큰</button>' +
    '<button class="adm-btn" type="button" id="adm-exit">나가기</button>';
  document.body.appendChild(bar);
  var $ = function (id) { return document.getElementById(id); };

  function setMsg(t, isDirty) {
    var m = $('adm-msg');
    m.textContent = t;
    m.classList.toggle('is-dirty', !!isDirty);
  }
  function updateBar() {
    var d = dirty();
    $('adm-save').disabled = !d;
    $('adm-undo').disabled = !d;
    $('adm-add').disabled = !loaded;
    if (loaded) setMsg(d ? '저장 안 한 변경 있음' : '카드를 눌러 고치기', d);
  }
  function changed() { PF.refresh(); updateBar(); }

  window.addEventListener('beforeunload', function (e) {
    if (dirty()) { e.preventDefault(); e.returnValue = ''; }
  });

  /* ───── 대화 상자 ───── */
  var dlg = document.createElement('dialog');
  dlg.className = 'adm-dlg';
  document.body.appendChild(dlg);
  function openDlg(html, onReady) {
    dlg.innerHTML = '<form class="adm-form" method="dialog">' + html + '</form>';
    if (onReady) onReady(dlg.querySelector('form'));
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var first = dlg.querySelector('input,textarea,select');
    if (first) first.focus();
  }
  function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }

  function field(label, name, val, type) {
    if (type === 'textarea') return '<label>' + label + '<textarea name="' + name + '">' + esc(val) + '</textarea></label>';
    return '<label>' + label + '<input type="' + (type || 'text') + '" name="' + name + '" value="' + esc(val) + '"></label>';
  }

  /* ───── 토큰 ───── */
  function tokenDlg(reason) {
    openDlg(
      '<h3>GitHub 토큰</h3>' +
      '<p class="adm-help">' + (reason ? esc(reason) + '<br>' : '') +
      '저장하면 GitHub의 data.js에 바로 올라가요. 그러려면 이 저장소에만 쓸 수 있는 토큰이 한 번 필요해요.<br>' +
      '① <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub 토큰 만들기</a> (Fine-grained)<br>' +
      '② Repository access → Only select repositories → <b>portfolio</b><br>' +
      '③ Permissions → Repository → <b>Contents: Read and write</b> → 만들기<br>' +
      '④ 나온 토큰(github_pat_…)을 아래에 붙여 넣기. 이 브라우저에만 저장돼요.</p>' +
      '<label>토큰<input type="password" name="token" autocomplete="off" placeholder="github_pat_…" value="' + esc(getToken()) + '"></label>' +
      '<p class="adm-err" id="adm-terr"></p>' +
      '<div class="adm-actions">' +
        (getToken() ? '<button class="adm-btn adm-btn--danger adm-left" type="button" id="adm-tdel">이 브라우저에서 지우기</button>' : '') +
        '<button class="adm-btn" type="button" id="adm-tcancel">닫기</button>' +
        '<button class="adm-btn adm-btn--primary" type="submit">확인</button>' +
      '</div>',
      function (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var t = form.token.value.trim();
          if (!t) { $('adm-terr').textContent = '토큰을 붙여 넣어 주세요'; return; }
          setToken(t);
          closeDlg();
          load();
        });
        $('adm-tcancel').onclick = closeDlg;
        if ($('adm-tdel')) $('adm-tdel').onclick = function () { setToken(''); closeDlg(); loaded = false; setMsg('토큰 없음 — 고치려면 토큰을 넣어 주세요'); updateBar(); };
      }
    );
  }

  /* ───── 불러오기 (GitHub의 최신 data.js) ───── */
  function gh(method, body) {
    return fetch(API + (method === 'GET' ? '?ref=main&t=' + Date.now() : ''), {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    });
  }

  function parseDataJs(code) {
    var i = code.indexOf('window.SITE');
    header = i > 0 ? code.slice(0, i) : '';
    var win = {};
    /* eslint-disable no-new-func */
    new Function('window', code)(win);
    if (!win.SITE || !Array.isArray(win.SITE.apps) || !Array.isArray(win.SITE.career)) throw new Error('data.js 모양이 예상과 달라요');
    return win.SITE;
  }

  function load() {
    if (!getToken()) { setMsg('토큰 없음 — 고치려면 토큰을 넣어 주세요'); updateBar(); tokenDlg(); return; }
    setMsg('GitHub에서 최신 내용 불러오는 중…');
    gh('GET').then(function (r) {
      if (r.status === 401 || r.status === 403) throw { token: true, msg: '토큰이 맞지 않거나 권한이 없어요 (' + r.status + ')' };
      if (r.status === 404) throw { token: true, msg: '저장소를 못 찾았어요. 토큰에 portfolio 저장소를 골랐는지 봐 주세요' };
      if (!r.ok) throw new Error('불러오기 실패 (' + r.status + ')');
      return r.json();
    }).then(function (j) {
      var site = parseDataJs(b64decode(j.content));
      sha = j.sha;
      PF.setSite(site);
      saved = snapshot();
      loaded = true;
      updateBar();
      loadLectures();
    }).catch(function (e) {
      loaded = false;
      updateBar();
      if (e && e.token) { setMsg(e.msg); tokenDlg(e.msg); }
      else setMsg('불러오기 실패: ' + (e && e.message || e));
    });
  }

  /* ───── 강의안 (비공개 저장소, 관리자 모드에서만) ─────
     skyang9838-hue/portfolio-private 의 lectures.json 을 같은 토큰으로 읽는다.
     토큰에 그 저장소가 없으면 조용히 건너뛰고 안내만 남긴다. */
  function loadLectures() {
    fetch('https://api.github.com/repos/skyang9838-hue/portfolio-private/contents/lectures.json?ref=main&t=' + Date.now(), {
      headers: { 'Authorization': 'Bearer ' + getToken(), 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
      cache: 'no-store'
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (j) {
      window.PF_LECTURES = JSON.parse(b64decode(j.content));
      PF.refresh();
    }).catch(function (e) {
      console.warn('강의안 못 불러옴 (' + e.message + ') — 토큰에 portfolio-private 저장소(Contents 읽기)를 추가해 주세요');
    });
  }

  /* ───── data.js 다시 쓰기 (앱은 여러 줄, 이력은 한 줄씩) ───── */
  function ser(v) { return JSON.stringify(v); }
  function objLines(o, pad) {
    return '{\n' + Object.keys(o).filter(function (k) { return o[k] !== undefined; }).map(function (k) {
      return pad + '  ' + k + ': ' + ser(o[k]);
    }).join(',\n') + '\n' + pad + '}';
  }
  function buildDataJs(S) {
    var keys = Object.keys(S);
    var parts = keys.map(function (k) {
      var v = S[k];
      if (k === 'apps') return '  apps: [\n' + v.map(function (a) { return '    ' + objLines(a, '    '); }).join(',\n') + '\n  ]';
      if (k === 'career' || k === 'sns' || k === 'materials') return '  ' + k + ': [\n' + v.map(function (c) { return '    ' + ser(c); }).join(',\n') + '\n  ]';
      return '  ' + k + ': ' + ser(v);
    });
    return header + 'window.SITE = {\n' + parts.join(',\n\n') + '\n};\n';
  }

  function save() {
    if (!dirty()) return;
    var S = PF.site();
    S.asOf = todayStr();
    var code = buildDataJs(S);
    // 저장 전에 한 번 더: 만든 파일을 다시 읽어 같은 내용인지
    try {
      var back = parseDataJs(code);
      if (JSON.stringify(back) !== JSON.stringify(S)) throw new Error('다시 읽은 내용이 달라요');
    } catch (e) { setMsg('저장 중단: ' + e.message, true); return; }
    $('adm-save').disabled = true;
    setMsg('GitHub에 저장하는 중…');
    gh('PUT', { message: '관리자 모드: 내용 수정 (' + todayStr() + ')', content: b64encode(code), sha: sha, branch: 'main' })
      .then(function (r) {
        if (r.status === 409 || r.status === 422) throw new Error('그사이 GitHub의 data.js가 바뀌었어요. 새로고침해서 다시 고쳐 주세요');
        if (r.status === 401 || r.status === 403) throw new Error('토큰 권한이 없어요 (Contents 쓰기 필요)');
        if (!r.ok) throw new Error('저장 실패 (' + r.status + ')');
        return r.json();
      })
      .then(function (j) {
        sha = j.content.sha;
        saved = snapshot();
        PF.refresh();
        updateBar();
        setMsg('저장됨 ✓ 1~2분 뒤 공개 사이트에 반영');
      })
      .catch(function (e) { updateBar(); setMsg(e.message, true); });
  }

  /* ───── 웹앱 고치기 ───── */
  var STATES = [['live', '공개 중'], ['wip', '개발 중'], ['hidden', '숨김 (비공개)']];
  function appDlg(a) {
    var cur = a.hidden ? 'hidden' : a.state === 'live' ? 'live' : 'wip';
    openDlg(
      '<h3>웹앱 · ' + esc(a.name) + '</h3>' +
      '<div><div class="adm-help" style="margin-bottom:6px">보이기</div><div class="adm-seg" role="group" aria-label="보이기">' +
        STATES.map(function (s) { return '<button type="button" data-st="' + s[0] + '" aria-pressed="' + (s[0] === cur) + '">' + s[1] + '</button>'; }).join('') +
      '</div></div>' +
      '<label class="adm-check"><input type="checkbox" name="featured"' + (a.featured ? ' checked' : '') + '> 대표작 (맨 위 큰 카드, 하나만)</label>' +
      '<div class="adm-row">' + field('이름', 'name', a.name) + field('부제', 'sub', a.sub || '') + '</div>' +
      field('설명', 'desc', a.desc, 'textarea') +
      field('쓰인 곳 (작은 글씨)', 'linked', a.linked || '') +
      '<div class="adm-row">' + field('주소', 'url', a.url || '') + field('주소 표시 글', 'meta', a.meta || '') + '</div>' +
      field('기술 (쉼표로)', 'tags', (a.tags || []).join(', ')) +
      '<div class="adm-actions"><button class="adm-btn" type="button" id="adm-cancel">취소</button><button class="adm-btn adm-btn--primary" type="submit">적용</button></div>',
      function (form) {
        var st = cur;
        form.querySelectorAll('[data-st]').forEach(function (b) {
          b.onclick = function () {
            st = b.getAttribute('data-st');
            form.querySelectorAll('[data-st]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          };
        });
        $('adm-cancel').onclick = closeDlg;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var v = function (n) { return form[n].value.trim(); };
          if (!v('name')) { form.name.focus(); return; }
          if (st === 'hidden') a.hidden = true;
          else { delete a.hidden; a.state = st; }
          a.name = v('name');
          setOpt(a, 'sub', v('sub'));
          a.desc = v('desc');
          setOpt(a, 'linked', v('linked'));
          a.url = v('url') || null;
          setOpt(a, 'meta', v('meta'));
          a.tags = v('tags').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
          if (form.featured.checked) PF.site().apps.forEach(function (x) { if (x !== a) delete x.featured; });
          if (form.featured.checked) a.featured = true; else delete a.featured;
          closeDlg();
          changed();
        });
      }
    );
  }
  function setOpt(o, k, val) { if (val) o[k] = val; else delete o[k]; }

  /* ───── 이력 고치기 ───── */
  var TYPES = [['talk', '강의·발표'], ['award', '수상'], ['training', '받은 연수'], ['role', '위촉·연구회 (화면엔 안 나옴)']];
  var FILTER_TYPE = { talks: 'talk', awards: 'award', training: 'training' };
  function careerDlg(c, isNew) {
    openDlg(
      '<h3>' + (isNew ? '이력 추가' : '이력 고치기') + '</h3>' +
      '<label class="adm-check"><input type="checkbox" name="hidden"' + (c.hidden ? ' checked' : '') + '> 숨김 (비공개)</label>' +
      '<div class="adm-row"><label>종류<select name="type">' +
        TYPES.map(function (t) { return '<option value="' + t[0] + '"' + (t[0] === c.type ? ' selected' : '') + '>' + t[1] + '</option>'; }).join('') +
      '</select></label><label>상태<select name="status">' +
        '<option value=""' + (c.status === '' ? ' selected' : '') + '>했음 (확인됨)</option>' +
        '<option value="예정"' + (c.status === '예정' ? ' selected' : '') + '>예정</option>' +
      '</select></label></div>' +
      field('제목', 'title', c.title) +
      '<div class="adm-row">' + field('기관', 'org', c.org || '') + field('역할 (강사·교육감상 등)', 'role', c.role || '') + '</div>' +
      '<div class="adm-row">' + field('날짜 (정렬용)', 'date', c.date, 'date') + field('보이는 날짜 글', 'label', c.label || '') + '</div>' +
      '<p class="adm-err" id="adm-cerr"></p>' +
      '<div class="adm-actions">' +
        (isNew ? '' : '<button class="adm-btn adm-btn--danger adm-left" type="button" id="adm-del">지우기</button>') +
        '<button class="adm-btn" type="button" id="adm-cancel">취소</button><button class="adm-btn adm-btn--primary" type="submit">' + (isNew ? '추가' : '적용') + '</button>' +
      '</div>',
      function (form) {
        $('adm-cancel').onclick = closeDlg;
        if ($('adm-del')) {
          $('adm-del').onclick = function () {
            var b = $('adm-del');
            if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = '정말 지울까요? (숨김도 있어요)'; return; }
            var list = PF.site().career;
            list.splice(list.indexOf(c), 1);
            closeDlg();
            changed();
          };
        }
        // 날짜를 고르면 보이는 날짜 글이 비었을 때 채운다
        form.date.addEventListener('change', function () {
          if (!form.label.value.trim() && form.date.value) form.label.value = form.date.value.split('-').join('.');
        });
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var v = function (n) { return form[n].value.trim(); };
          if (!v('title')) { $('adm-cerr').textContent = '제목을 적어 주세요'; return; }
          if (!/^\d{4}-\d{2}-\d{2}$/.test(v('date'))) { $('adm-cerr').textContent = '날짜를 골라 주세요'; return; }
          c.type = v('type');
          c.date = v('date');
          c.label = v('label') || v('date').split('-').join('.');
          c.title = v('title');
          c.org = v('org');
          c.role = v('role');
          c.status = v('status');
          if (form.hidden.checked) c.hidden = true; else delete c.hidden;
          if (isNew) PF.site().career.push(c);
          closeDlg();
          changed();
        });
      }
    );
  }

  /* ───── 누르기 ───── */
  document.addEventListener('click', function (e) {
    if (!loaded || e.target.closest('.adm-bar') || e.target.closest('dialog')) return;
    var app = e.target.closest('[data-app]');
    var row = e.target.closest('[data-ci]');
    if (!app && !row) return;
    e.preventDefault();
    e.stopPropagation();
    if (app) {
      var a = PF.site().apps.filter(function (x) { return x.id === app.getAttribute('data-app'); })[0];
      if (a) appDlg(a);
    } else {
      var c = PF.site().career[Number(row.getAttribute('data-ci'))];
      if (c) careerDlg(c, false);
    }
  }, true);

  $('adm-add').onclick = function () {
    var t = FILTER_TYPE[PF.filter()] || 'talk';
    careerDlg({ type: t, date: todayStr(), label: todayStr().split('-').join('.'), title: '', org: '', role: '', status: '' }, true);
  };
  $('adm-undo').onclick = function () {
    if (!dirty()) return;
    PF.setSite(JSON.parse(saved));
    updateBar();
  };
  $('adm-save').onclick = save;
  $('adm-token').onclick = function () { tokenDlg(); };
  $('adm-exit').onclick = function () {
    if (dirty() && !$('adm-exit').dataset.armed) {
      $('adm-exit').dataset.armed = '1';
      $('adm-exit').textContent = '저장 안 하고 나가기?';
      return;
    }
    location.href = location.pathname;
  };

  updateBar();
  load();
})();
