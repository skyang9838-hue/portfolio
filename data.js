/*
  사이트 데이터. 화면 이력은 강의(talk)·수상(award)·받은 연수(training)만 보인다.
  이 파일은 공개 저장소·Pages에서 누구나 원문을 볼 수 있다.
  확인 안 된 항목·메모는 여기에 넣지 말고 저장소 밖 메모(content.md)에 둔다.

  status 규칙
    ''      확인된 항목 → 화면에 보이고 숫자 띠에 센다
    '예정'  화면에 보이고(점선·D-day) 숫자 띠에는 세지 않는다.
            날짜가 지나도 '예정' 배지가 남는다. 실제로 했으면 '' 로 바꾼다.

  date: 정렬용 'YYYY-MM-DD' (모르는 칸은 01). 화면 표시는 label.
  기간 label은 해가 같으면 뒤 연도를 뺀다 (2026.07 – 11).

  hidden: true  웹앱·이력 모두 — 공개 화면에서 숨긴다 (관리자 모드에선 흐리게 보임).
                저장소 원문에는 남으니 정말 비밀인 건 넣지 않는다.
  state:  'live' 공개 중 · 'wip' 개발 중

  관리자 모드: 사이트 주소 뒤에 ?admin → GitHub 토큰으로 고치고 저장하면 이 파일에 바로 커밋된다.
  그 저장 때 이 머리말은 남지만, 아래 내용 안의 주석은 사라지고 모양이 다시 정리된다.
  클로드가 이 파일을 고칠 땐 먼저 git pull (관리자 모드 커밋이 있을 수 있다).

  메모: 디노는 미완성이라 앱 링크(url)를 내림 (2026-11-12). 위촉·연구회(role)는 화면에서 뺐고 데이터만 남김.
*/
window.SITE = {
  asOf: "2026-11-24",

  sns: [
    {"id":"threads","name":"Threads","handle":"@yang.__.98","url":"https://www.threads.com/@yang.__.98","desc":"AI로 수업 도구를 만들고 나누는 이야기"}
  ],

  apps: [
    {
      id: "dino",
      name: "디노 글쓰기 코치",
      nameEn: "DINO",
      state: "wip",
      desc: "학생이 글을 쓰고 AI 코칭을 받아 고칠수록 '도달도'가 오르는 초등 교실 글쓰기 코치.",
      award: "제5회 인천 초등 수업사례 공모전 교육감상",
      awardDate: "2026.10",
      tags: ["Next.js","Prisma","Postgres","Gemini API"],
      url: null,
      repo: "https://github.com/skyang9838-hue/dino-writing-coach",
      img: "assets/dino.webp",
      imgW: 1320,
      imgH: 825,
      alt: "디노 글쓰기 코치가 학생 글에 준 피드백 화면. 좋은 점 한 가지와 수정 미션 두 가지"
    },
    {
      id: "climate",
      name: "기후 탐사대",
      sub: "서·논술형 평가 웹앱",
      state: "live",
      desc: "6학년 사회 「세계의 기후와 다양한 생활 모습」 서·논술형 평가를, 기후 정령의 지도를 되찾는 탐사 이야기 속에서 수행한다. 답안은 구글 시트로 모인다.",
      linked: "서·논술형 평가 설계 연수 산출물 · 2026.09",
      tags: ["Google Apps Script","Google Sheets"],
      url: "https://script.google.com/macros/s/AKfycby-ahsOSiTpGR5fnvS9rUhULYY-_Q_gzD_6qBsE_oNrCvPp4sslgJspycZDIjNjITNraQ/exec",
      meta: "Google Apps Script",
      img: "assets/climate.webp",
      imgW: 1280,
      imgH: 800,
      alt: "기후 탐사대 첫 화면. 열대·온대·한대 풍경 앞의 기후 정령들과 학교·반·번호 입력칸"
    },
    {
      id: "tqqq",
      name: "TQQQ 시뮬레이터",
      sub: "레버리지의 대가",
      state: "live",
      desc: "1985년부터 TQQQ를 복원해, 모든 시작 시점의 적립식 결과를 QQQ와 비교한다.",
      tags: ["Python","HTML","GitHub Pages"],
      url: "https://skyang9838-hue.github.io/tqqq-simulator/",
      meta: "github.io/tqqq-simulator",
      img: "assets/tqqq.webp",
      imgW: 1280,
      imgH: 800,
      alt: "TQQQ 시뮬레이터 첫 화면. 투자 조건 입력칸과 승률·원금 손실 확률 요약 카드"
    },
    {
      id: "castle-territory",
      name: "성 쌓기 땅따먹기",
      state: "live",
      desc: "영토 따먹기 보드게임을 연습해 보는 비공식 연습판.",
      linked: "인천과학대제전 발명교육지원단 보드게임 부스 · 2026.10",
      tags: ["HTML","GitHub Pages"],
      url: "https://skyang9838-hue.github.io/castle-territory/",
      meta: "github.io/castle-territory",
      img: "assets/castle-territory.webp",
      imgW: 1280,
      imgH: 800,
      alt: "성 쌓기 땅따먹기 첫 화면. 픽셀 그림 풀밭 판과 영토 점수판"
    },
    {
      id: "class-soccer",
      name: "교실 축구",
      state: "wip",
      desc: "반 아이들이 각자 노트북으로 접속해 다 같이 뛰는 도트 축구.",
      linked: "교실 수업에서 사용 · 2026.11",
      tags: ["Cloudflare Workers","Canvas"],
      url: "https://class-soccer.class-soccer.workers.dev",
      meta: "class-soccer.workers.dev",
      img: "assets/class-soccer.webp",
      imgW: 1280,
      imgH: 800,
      alt: "교실 축구 경기 화면. 도트 그림 빨강·파랑 선수들과 점수판"
    },
    {
      id: "class-vote",
      name: "우리 반 투표",
      state: "wip",
      desc: "아이들이 번호로 들어와 라운드마다 후보를 줄여 가며 고르는 반 투표. 교사 화면에서 라운드를 열고 닫고, 표 수와 번호별 선택을 보거나 숨긴다. 1등은 교사가 열어 줄 때 발표된다.",
      linked: "반티 고르기에 처음 사용 · 2026.11",
      tags: ["Cloudflare Workers","Durable Objects"],
      url: "https://class-vote.class-soccer.workers.dev/teacher",
      meta: "class-vote.workers.dev/teacher",
      img: "assets/class-vote.webp",
      imgW: 1280,
      imgH: 800,
      alt: "우리 반 투표 교사 화면. 1라운드 표 수 막대와 항목별로 고른 번호 목록"
    },
    {
      id: "kkokko",
      name: "꼬꼬의 첫 출근",
      sub: "서·논술형 평가 3D 게임",
      state: "wip",
      desc: "6학년 사회 「우리나라 시장경제의 특징」 서·논술형 평가를, 라면 공장에 첫 출근한 꼬꼬의 하루 속에서 수행한다. 교사 화면에서 답을 판정한다.",
      tags: ["Three.js","Google Apps Script"],
      url: "https://github.com/skyang9838-hue/sahoe-seonsul",
      meta: "코드 보기 · github.com/skyang9838-hue/sahoe-seonsul",
      img: "assets/kkokko.webp",
      imgW: 1280,
      imgH: 800,
      alt: "꼬꼬의 첫 출근 시작 포스터. 라면 공장 앞에 선 꼬꼬와 동물 친구들"
    },
    {
      id: "ai-trace",
      name: "AI TRACE",
      sub: "디지털 수사 기록 · CASE #01",
      state: "live",
      desc: "「낯선 DM」 사건을 수사 기록처럼 따라가며 디지털 윤리를 생각해 보는 수업용 웹앱.",
      award: "2026 디지털윤리 창작콘텐츠 공모전 한국교육방송공사 사장상",
      awardDate: "2026.11",
      tags: ["HTML","JavaScript","GitHub Pages"],
      url: "https://skyang9838-hue.github.io/ai-trace/",
      meta: "github.io/ai-trace",
      img: "assets/ai-trace.webp",
      imgW: 1280,
      imgH: 800,
      alt: "AI TRACE 첫 화면. 찢긴 사진 조각들로 만든 마스크 쓴 인물과 눌러서 시작 버튼"
    },
    {
      id: "invention-dice",
      name: "발명 주사위",
      state: "live",
      desc: "물건과 발명 기법을 무작위로 뽑아 발명 아이디어를 떠올리게 하는 주사위.",
      linked: "6학년 수업·교사 발명연수에서 사용 · 2026.11",
      tags: ["HTML","GitHub Pages"],
      url: "https://skyang9838-hue.github.io/invention-dice/",
      meta: "github.io/invention-dice",
      img: "assets/invention-dice.webp",
      imgW: 1280,
      imgH: 800,
      alt: "발명 주사위 화면. 글자판 두 줄과 주사위 굴리기 버튼"
    },
    {
      id: "pyeongeo-helper",
      name: "성적 평어 도우미",
      sub: "6학년 2학기",
      state: "wip",
      desc: "성취기준마다 ◎○△를 누르면 교과 평어 문장을 만들어 준다. 학생 이름은 받지 않는다.",
      tags: ["HTML","GitHub Pages"],
      url: "https://skyang9838-hue.github.io/pyeongeo-helper/",
      meta: "github.io/pyeongeo-helper",
      img: "assets/pyeongeo-helper.webp",
      imgW: 1280,
      imgH: 800,
      alt: "성적 평어 도우미 국어 화면. 번호별로 성취기준 ◎○△ 단추가 놓인 표"
    },
    {
      id: "bubble-draw",
      name: "물방울 뽑기",
      state: "live",
      desc: "버튼을 누르면 물방울 하나가 터지며 이름이 나오는 자리 바꾸기·발표자 뽑기. 화면에 인원수가 보이지 않고, 교사 화면에서 학생마다 빼거나 먼저 뽑히게 정할 수 있다. 명단은 그 컴퓨터에만 저장된다.",
      tags: ["HTML","GitHub Pages"],
      url: "https://skyang9838-hue.github.io/bubble-draw/",
      meta: "github.io/bubble-draw",
      img: "assets/bubble-draw.webp",
      imgW: 1280,
      imgH: 800,
      alt: "물방울 뽑기 화면. 흐린 물방울 배경 위 카드에 3번째로 뽑힌 이름이 크게 나온 모습"
    },
    {
      id: "geupji",
      name: "급지.gg",
      state: "wip",
      desc: "수도권 대장아파트 티어. 국토교통부 실거래가로 지역 대장 단지 순위를 매기는 \"아파트판 op.gg\".",
      tags: ["Next.js","Prisma","Postgres"],
      url: "https://github.com/skyang9838-hue/geupji",
      meta: "코드 보기 · github.com/skyang9838-hue/geupji",
      img: null
    }
  ],

  materials: [
    {"id":"talk-1118","date":"2026-11-18","label":"2026.11.18","title":"디지털과 연계한 발명 수업","org":"학교로 찾아가는 과학발명교실연수 · 인천효성초","img":"assets/talk-1118.webp","imgW":1280,"imgH":720,"alt":"디지털과 연계한 발명 수업 표지. 전구 그림"},
    {"id":"talk-1103","date":"2026-11-03","label":"2026.07 – 11 · 2회","title":"고민을 담은 솔직한 공개수업 이야기","org":"북부 수업나눔교사(5기) 수업 성찰 나눔 연수 (상·하반기)","img":"assets/talk-1103.webp","imgW":1280,"imgH":720,"alt":"하반기 수업 성찰 나눔 표지. 11.03이 적힌 민트색 원"},
    {"id":"talk-1029","date":"2026-10-29","label":"2026.10.29","title":"생성형 AI를 활용한 교육 자료 개발","org":"2026 국어 연합학술제","img":"assets/talk-1029.webp","imgW":1280,"imgH":720,"alt":"생성형 AI를 활용한 교육 자료 개발 표지. 초록 공룡 캐릭터"},
    {"id":"talk-1016","date":"2026-10-16","label":"2026.10.16","title":"나만의 AI Agent 업무 비서 만들기","org":"ACE연구회 AI TED","img":"assets/talk-1016.webp","imgW":1280,"imgH":720,"alt":"나만의 AI Agent 업무 비서 만들기 표지"}
  ],

  career: [
    {"type":"talk","group":"북부 수업나눔교사(5기) 수업 성찰 나눔 연수","groupLabel":"2026.07 – 11","date":"2026-07-20","label":"2026.07.20","title":"북부 수업나눔교사(5기) 상반기 수업 성찰 나눔 연수","note":"상반기","org":"북부교육지원청","role":"강사","status":""},
    {"type":"talk","date":"2026-09-15","label":"2026.09.15","title":"「디지털 기반 학생 맞춤형 코칭 서·논술형 평가 설계」 연수","org":"서부교육지원청","role":"보조강사","status":""},
    {"type":"talk","date":"2026-10-14","label":"2026.10.14","title":"인천 초등교육 페스티벌 수상작 발표","org":"인천광역시교육청","role":"발표자","status":""},
    {"type":"talk","date":"2026-10-16","label":"2026.10.16","title":"ACE연구회 AI TED 「나만의 AI Agent 업무 비서 만들기」","org":"ACE연구회","role":"강사","status":""},
    {"type":"talk","date":"2026-10-19","label":"2026.10.19","title":"「AI·디지털 활용 교육과정-수업-평가 실천」 2차 (수업 도구 만들기)","org":"북부교육지원청","role":"보조강사","status":""},
    {"type":"talk","date":"2026-10-29","label":"2026.10.29","title":"국어 연합학술제 「생성형 AI를 활용한 교육 자료 개발 — 활동지 제작부터 서·논술형 평가까지」","org":"국어 관련 전학공 연합학술제","role":"강사","status":""},
    {"type":"talk","date":"2026-10-30","label":"2026.10.30","title":"SE4A 연합학술제 웹앱 소개 발표","org":"SE4A","role":"발표자","status":""},
    {"type":"talk","group":"북부 수업나눔교사(5기) 수업 성찰 나눔 연수","date":"2026-11-03","label":"2026.11.03","title":"북부 수업나눔교사(5기) 하반기 수업 성찰 나눔 연수","note":"하반기","org":"북부교육지원청","role":"강사","status":""},
    {"type":"talk","date":"2026-11-04","label":"2026.11.04","title":"읽걷쓰AI 리더십 실천 워크숍 (관리자 대상) 「코딩없이 말로 만드는 학교 업무 도구 1」","org":"인천광역시교육청 융합인재교육과","role":"보조강사","status":""},
    {"type":"talk","date":"2026-11-18","label":"2026.11.18","title":"학교로 찾아가는 과학발명교실연수 「디지털과 연계한 발명 수업」 (인천효성초)","org":"인천광역시교육청 융합인재교육과 · 발명교육지원단","role":"강사","status":""},
    {"type":"role","date":"2026-09-01","label":"2026.09 –","title":"KERIS 인공지능 융합 연구회 「얼죽아」 — 6차시 수업 자료 개발","org":"한국교육학술정보원(KERIS)","role":"연구원","status":""},
    {"type":"role","date":"2025-07-01","label":"2025 하반기","title":"인천아이샘 튜터링","org":"인천광역시교육청","role":"지도교사","status":""},
    {"type":"role","date":"2026-04-01","label":"2026.04 – 2027.02","title":"발명교육지원단","org":"인천광역시교육청 융합인재교육과","role":"지원단원","status":""},
    {"type":"role","date":"2026-04-06","label":"2026.04 –","title":"미디어 리터러시 수업·평가 교사지원단","org":"인천광역시교육청 중등교육과","role":"지원단원","status":""},
    {"type":"role","date":"2026-04-01","label":"2026.04 –","title":"ACE 교간형 전문적학습공동체 「읽걷쓰 아이 AI 플러스」","org":"ACE연구회 · 대표교 인천부곡초","role":"회원","status":""},
    {"type":"role","date":"2026-07-15","label":"2026.07 –","title":"읽걷쓰AI 교사 실천 공동체 「읽걷쓰 AI 랩(Lab)」","org":"인천광역시교육청 융합인재교육과","role":"대표교사","status":""},
    {"type":"role","date":"2026-07-16","label":"2026.07 – 11","title":"읽걷쓰 기반 AI 융합교육(STEAM) 시범 적용 교사단","org":"인천광역시교육청 AI융합교육원","role":"컨설팅 위원","status":""},
    {"type":"role","date":"2026-10-03","label":"2026.10.03","title":"2026 북부 모두다 문화예술축제","org":"북부교육지원청","role":"운영 지원단","status":""},
    {"type":"role","date":"2026-10-23","label":"2026.10.23 – 10.24","title":"인천과학대제전 보드게임 체험 부스","org":"발명교육지원단","role":"운영","status":""},
    {"type":"role","date":"2026-11-09","label":"2026.11.09","title":"발명교육 봉사 (인천해서초)","org":"발명교육지원단","role":"봉사","status":""},
    {"type":"award","featured":true,"url":"https://youtu.be/8vDlwSu2_y4","img":"assets/shorts-minwoo.webp","imgW":1280,"imgH":720,"alt":"영상 첫 장면. 휠체어를 탄 13살 민우 캐릭터","date":"2026-11-19","label":"2026.11.19","title":"2026 디지털기반 교원역량강화연수 우수사례 동영상 공모전 (민우와 떠난 세계 여행)","org":"인천광역시교육청 AI융합교육원","role":"최우수","status":""},
    {"type":"award","featured":true,"app":"ai-trace","date":"2026-11-18","label":"2026.11.18","title":"2026 디지털윤리 창작콘텐츠 공모전 교사 부문 (AI TRACE)","org":"한국지능정보사회진흥원(NIA)","role":"한국교육방송공사 사장상","status":""},
    {"type":"award","featured":true,"app":"dino","date":"2026-10-14","label":"2026.10.14","title":"제5회 인천 초등 수업사례 공모전 (글쓰기 수업 AI 코칭·DINO)","org":"인천광역시교육청","role":"교육감상","status":""},
    {"type":"training","date":"2026-03-01","label":"2026 전기 –","title":"경인교육대학교 교육전문대학원 석사과정 (인공지능융합교육전공)","org":"경인교육대학교","role":"재학 중","status":""},
    {"type":"training","date":"2025-07-21","label":"2025.07 – 08","title":"교실혁명 선도교사 양성연수","org":"교육부 · 인천광역시교육청 융합인재교육과","role":"직무연수","status":""},
    {"type":"training","date":"2026-01-05","label":"2026.01","title":"2025학년도 동계 초등 1급 정교사 자격연수","org":"인천광역시교육청","role":"자격연수 이수","status":""},
    {"type":"training","date":"2026-02-03","label":"2026.02.03 – 04","title":"창의융합형 영재·발명·과학교육 활성화 역량강화 직무연수","org":"인천광역시교육청 융합인재교육과","role":"14시간","status":""},
    {"type":"training","date":"2026-04-15","label":"2026.04.15 – 06.24","title":"AI·디지털 자료 활용 교육 교원 연수 (3회)","org":"인천신석초등학교 주관","role":"","status":""},
    {"type":"training","date":"2026-04-27","label":"2026.04.27","title":"디지털 교육 전문적학습공동체 연합 연수 「AIEP 기반 자료 개발 방안」","org":"인천청천초등학교 주관","role":"","status":""},
    {"type":"training","date":"2026-05-10","label":"2026.05.10","title":"생성형AI 및 구글도구활용 탐구중심 수업설계 역량강화 직무연수","org":"인천광역시교육청AI융합교육원 · 구글코리아","role":"6차시","status":""},
    {"type":"training","date":"2026-06-05","label":"2026.06.05","title":"디지털 교육 전문적학습공동체 연합 연수 「학생의 정보화 교육자료 개발 방법론」","org":"인천부내초등학교 주관","role":"","status":""},
    {"type":"training","date":"2026-06-08","label":"2026.06.08 – 22","title":"북부 초등 「AI·디지털 기반 교육과정-수업-평가 실천」 연수 (3회)","org":"인천광역시북부교육지원청","role":"","status":""},
    {"type":"training","date":"2026-07-01","label":"2026","title":"영재교육 담당교원 역량강화 원격직무연수","org":"인천광역시교육청 융합인재교육과","role":"원격직무연수","status":""},
    {"type":"training","date":"2025-12-17","label":"2025.12.17","title":"SE4A 연수","org":"SE4A 전문적학습공동체","role":"","status":""},
    {"type":"training","date":"2026-06-30","label":"2026.06.30","title":"디지털 교육 전문적학습공동체 연합 연수 「클로드코드 첫걸음: 설치부터 첫 코딩까지」","org":"ITPC · 인천마전초등학교 주관","role":"","status":""},
    {"type":"training","date":"2026-07-02","label":"2026.07.02","title":"진로 연수 「선호미래」","org":"인천광역시교육청AI융합교육원","role":"2시간","status":""},
    {"type":"training","date":"2026-07-29","label":"2026.07.29 – 09.19","title":"초등 학생평가 전문가 양성 직무연수 (기본과정)","org":"인천광역시교육청 초등교육과","role":"30차시","status":""},
    {"type":"training","date":"2026-11-07","label":"2026.11.07","title":"제2회 ACE 러닝페스티벌 「AI와 교육, 실전 수업 사례 나눔」","org":"ACE연구회","role":"","status":""},
    {"type":"training","date":"2026-11-19","label":"2026.11.19","title":"찾아가는 과학발명교실연수 「디지털 도구 활용 메이커 발명 연수」","org":"인천광역시교육청 융합인재교육과 · 발명교육지원단","role":"","status":"예정"}
  ]
};
