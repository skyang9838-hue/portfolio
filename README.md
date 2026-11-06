# portfolio — 양상경 개인 사이트

인천효성남초등학교 교사 양상경의 한 장짜리 개인 사이트. 만든 웹앱, 2025~2026 경력(강의·발표 / 위촉·연구회·지원 / 수상 / 받은 연수), 연락 링크를 보여 준다. 빌드 도구 없는 정적 사이트다.

## 파일

| 파일 | 하는 일 |
|---|---|
| `index.html` | 뼈대 (히어로·웹앱·경력·연락) |
| `style.css` | 디자인 토큰, 라이트/다크 자동 (`prefers-color-scheme`) |
| `data.js` | **내용은 여기만 고친다.** 웹앱 목록과 경력 항목 |
| `script.js` | data.js를 읽어 카드·기록부·숫자 띠를 그린다 |
| `assets/` | 웹앱 첫 화면 스크린샷 (webp) |

외부 의존은 Pretendard 글꼴 CDN 하나뿐이다. npm을 쓰지 않는다.

## 내용 고치는 법

- **경력 추가**: `data.js`의 `career`에 한 줄을 넣는다. `status`가 `''`이면 확인된 항목(보이고 숫자 띠에 셈), `'예정'`이면 점선·D-day로 보이지만 세지 않는다.
- **확인 안 된 항목은 data.js에 넣지 않는다.** 저장소가 공개라 원문이 그대로 보인다. 확인 전 항목·메모는 저장소 밖 메모(content.md)에 두고, 확인되면 `status: ''`로 옮겨 온다.
- **예정이 끝나면**: 날짜가 지나도 회색 `예정` 배지가 남는다. 실제로 했으면 `status: '예정'`을 `''`로 바꾼다 (그래야 배지가 빠지고 숫자 띠에 셈).
- **디지털윤리 공모전**(상 이름 11/18 이후 공개): 공개 전까지 data.js에서 뺐다. 공개되면 award에 `role: '<상 이름>'`, title `2026 디지털윤리 창작콘텐츠 공모전 — 수업 「AI에게 어디까지 말해도 괜찮을까?」`로 넣는다. `·웹앱 AI TRACE`는 저장소 공개 뒤에 붙인다.
- **같은 강의 여러 번**: 항목들에 같은 `group` 이름을 주면 한 줄로 묶이고 `N회`가 붙는다.
- **기준일**: `data.js`의 `asOf` 한 곳만 고치면 히어로·바닥글의 "기준" 날짜가 따라 바뀐다.
- **숫자 띠**: 강의·발표 = talk 확인 항목, 위촉·연구회·지원 = role 확인 항목, 공개한 웹앱 = `state: 'live'` 앱 수.

## 한 줄 소개 넣을 위치

`index.html` 히어로 안의 `<!-- TODO: 한 줄 소개 -->` 주석. 주석을 풀고 `<p class="hero__intro">` 안에 문구를 쓴다. 비워 두면 줄 자체가 안 나온다.

## 배포 (GitHub Pages)

1. GitHub에 저장소를 만든다 (예: `skyang9838-hue/portfolio`, 공개).
2. `git remote add origin https://github.com/skyang9838-hue/portfolio.git` → `git push -u origin main`
3. 저장소 Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`.
4. 이후로는 **main에 push하면 그대로 배포**된다. 주소는 `https://skyang9838-hue.github.io/portfolio/`.
   - 저장소 이름을 `skyang9838-hue.github.io`로 하면 주소가 `https://skyang9838-hue.github.io/`가 된다.

## 스크린샷 다시 찍기

각 앱의 공개 주소 첫 화면을 1280×800(디노는 720×450 @2x, 로그인 전 화면)으로 찍어 webp로 줄인 것이다. 학생 이름·학생 글이 보이는 화면은 쓰지 않는다. 급지.gg처럼 ``img: null``인 앱은 스크린샷 없이 가로로 긴 짧은 카드로 나온다.
