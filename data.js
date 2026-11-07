/*
  사이트 데이터. 숫자 띠는 이 파일에서 자동으로 센다.
  이 파일은 공개 저장소·Pages에서 누구나 원문을 볼 수 있다.
  확인 안 된 항목·메모는 여기에 넣지 말고 저장소 밖 메모(content.md)에 둔다.

  status 규칙
    ''      확인된 항목 → 화면에 보이고 숫자 띠에 센다
    '예정'  화면에 보이고(점선·D-day) 숫자 띠에는 세지 않는다.
            날짜가 지나도 '예정' 배지가 남는다. 실제로 했으면 '' 로 바꾼다.

  date: 정렬용 'YYYY-MM-DD' (모르는 칸은 01). 화면 표시는 label.
  기간 label은 해가 같으면 뒤 연도를 뺀다 (2026.07 – 11).
*/
window.SITE = {
  asOf: '2026-11-07',

  apps: [
    {
      id: 'dino',
      featured: true,
      name: '디노 글쓰기 코치',
      nameEn: 'DINO',
      state: 'live',
      desc: "학생이 글을 쓰고 AI 코칭을 받아 고칠수록 '도달도'가 오르는 초등 교실 글쓰기 코치.",
      award: '제5회 인천 초등 수업사례 공모전 교육감상',
      awardDate: '2026.10',
      tags: ['Next.js', 'Prisma', 'Postgres', 'Gemini API'],
      url: 'https://dino-writing-coach.vercel.app',
      repo: 'https://github.com/skyang9838-hue/dino-writing-coach',
      img: 'assets/dino.webp', imgW: 1320, imgH: 825,
      alt: '디노 글쓰기 코치가 학생 글에 준 피드백 화면. 좋은 점 한 가지와 수정 미션 두 가지'
    },
    {
      id: 'tqqq',
      name: 'TQQQ 시뮬레이터',
      sub: '레버리지의 대가',
      state: 'live',
      desc: '1985년부터 TQQQ를 복원해, 모든 시작 시점의 적립식 결과를 QQQ와 비교한다.',
      tags: ['Python', 'HTML', 'GitHub Pages'],
      url: 'https://skyang9838-hue.github.io/tqqq-simulator/',
      meta: 'github.io/tqqq-simulator',
      img: 'assets/tqqq.webp', imgW: 1280, imgH: 800,
      alt: 'TQQQ 시뮬레이터 첫 화면. 투자 조건 입력칸과 승률·원금 손실 확률 요약 카드'
    },
    {
      id: 'ace-agent-lab',
      name: 'AI Agent 업무 비서 실습',
      state: 'live',
      desc: '실습 파일 내려받기와 프롬프트 복사를 한 페이지에 모은 연수 실습 페이지.',
      linked: 'ACE연구회 AI TED 실습용 · 2026.10.16',
      tags: ['HTML', 'GitHub Pages'],
      url: 'https://skyang9838-hue.github.io/ace-agent-lab/',
      meta: 'github.io/ace-agent-lab',
      img: 'assets/ace-agent-lab.webp', imgW: 1280, imgH: 800,
      alt: 'AI Agent 업무 비서 실습 페이지 표지 화면'
    },
    {
      id: 'castle-territory',
      name: '성 쌓기 땅따먹기',
      state: 'live',
      desc: '영토 따먹기 보드게임을 연습해 보는 비공식 연습판.',
      linked: '인천과학대제전 발명교육지원단 보드게임 부스 · 2026.10',
      tags: ['HTML', 'GitHub Pages'],
      url: 'https://skyang9838-hue.github.io/castle-territory/',
      meta: 'github.io/castle-territory',
      img: 'assets/castle-territory.webp', imgW: 1280, imgH: 800,
      alt: '성 쌓기 땅따먹기 첫 화면. 픽셀 그림 풀밭 판과 영토 점수판'
    },
    {
      id: 'geupji',
      name: '급지.gg',
      state: 'wip',
      desc: '수도권 대장아파트 티어. 국토교통부 실거래가로 지역 대장 단지 순위를 매기는 "아파트판 op.gg".',
      tags: ['Next.js', 'Prisma', 'Postgres'],
      url: 'https://github.com/skyang9838-hue/geupji',
      meta: '코드 보기 · github.com/skyang9838-hue/geupji',
      img: null
    }
  ],

  /* type: talk(강의·발표) · role(위촉·연구회·지원) · award(수상) · training(받은 연수) */
  career: [
    /* ── 강의·발표 ── */
    { type: 'talk', group: '북부 수업나눔교사(5기) 수업 성찰 나눔 연수', groupLabel: '2026.07 – 11', date: '2026-07-20', label: '2026.07.20', title: '북부 수업나눔교사(5기) 상반기 수업 성찰 나눔 연수', note: '상반기', org: '북부교육지원청', role: '강사', status: '' },
    { type: 'talk', date: '2026-09-15', label: '2026.09.15', title: '「디지털 기반 학생 맞춤형 코칭 서·논술형 평가 설계」 연수', org: '서부교육지원청', role: '보조강사', status: '' },
    { type: 'talk', date: '2026-10-14', label: '2026.10.14', title: '인천 초등교육 페스티벌 수상작 발표', org: '인천광역시교육청', role: '발표자', status: '' },
    { type: 'talk', date: '2026-10-16', label: '2026.10.16', title: 'ACE연구회 AI TED 「나만의 AI Agent 업무 비서 만들기」', org: 'ACE연구회', role: '강사', status: '' },
    { type: 'talk', date: '2026-10-19', label: '2026.10.19', title: '「AI·디지털 활용 교육과정-수업-평가 실천」 2차 (수업 도구 만들기)', org: '북부교육지원청', role: '보조강사', status: '' },
    { type: 'talk', date: '2026-10-29', label: '2026.10.29', title: '국어 연합학술제 「생성형 AI를 활용한 교육 자료 개발 — 활동지 제작부터 서·논술형 평가까지」', org: '국어 관련 전학공 연합학술제', role: '강사', status: '' },
    { type: 'talk', date: '2026-10-30', label: '2026.10.30', title: 'SE4A 연합학술제 웹앱 소개 발표', org: 'SE4A', role: '발표자', status: '' },
    { type: 'talk', group: '북부 수업나눔교사(5기) 수업 성찰 나눔 연수', date: '2026-11-03', label: '2026.11.03', title: '북부 수업나눔교사(5기) 하반기 수업 성찰 나눔 연수', note: '하반기', org: '북부교육지원청', role: '강사', status: '' },
    { type: 'talk', date: '2026-11-04', label: '2026.11.04', title: '읽걷쓰AI 리더십 실천 워크숍 (관리자 대상) 「코딩없이 말로 만드는 학교 업무 도구 1」', org: '인천광역시교육청 융합인재교육과', role: '보조강사', status: '' },
    { type: 'talk', date: '2026-11-18', label: '2026.11.18', title: '학교로 찾아가는 과학발명교실연수 「디지털과 연계한 발명 수업」 (인천효성초)', org: '인천광역시교육청 융합인재교육과 · 발명교육지원단', role: '강사', status: '예정' },

    /* ── 위촉·연구회·지원 ── */
    { type: 'role', date: '2025-07-01', label: '2025 하반기', title: '인천아이샘 튜터링', org: '인천광역시교육청', role: '지도교사', status: '' },
    { type: 'role', date: '2026-04-01', label: '2026.04 – 2027.02', title: '발명교육지원단', org: '인천광역시교육청 융합인재교육과', role: '지원단원', status: '' },
    { type: 'role', date: '2026-04-06', label: '2026.04 –', title: '미디어 리터러시 수업·평가 교사지원단', org: '인천광역시교육청 중등교육과', role: '지원단원', status: '' },
    { type: 'role', date: '2026-04-01', label: '2026.04 –', title: 'ACE 교간형 전문적학습공동체 「읽걷쓰 아이 AI 플러스」', org: 'ACE연구회 · 대표교 인천부곡초', role: '회원', status: '' },
    { type: 'role', date: '2026-07-15', label: '2026.07 –', title: '읽걷쓰AI 교사 실천 공동체 「읽걷쓰 AI 랩(Lab)」', org: '인천광역시교육청 융합인재교육과', role: '대표교사', status: '' },
    { type: 'role', date: '2026-07-16', label: '2026.07 – 11', title: '읽걷쓰 기반 AI 융합교육(STEAM) 시범 적용 교사단', org: '인천광역시교육청 AI융합교육원', role: '컨설팅 위원', status: '' },
    { type: 'role', date: '2026-10-03', label: '2026.10.03', title: '2026 북부 모두다 문화예술축제', org: '북부교육지원청', role: '운영 지원단', status: '' },
    { type: 'role', date: '2026-10-23', label: '2026.10.23 – 10.24', title: '인천과학대제전 보드게임 체험 부스', org: '발명교육지원단', role: '운영', status: '' },
    { type: 'role', date: '2026-11-09', label: '2026.11.09', title: '발명교육 봉사 (인천해서초)', org: '발명교육지원단', role: '봉사', status: '예정' },

    /* ── 수상 ── */
    { type: 'award', featured: true, date: '2026-10-14', label: '2026.10.14', title: '제5회 인천 초등 수업사례 공모전 (글쓰기 수업 AI 코칭·DINO)', org: '인천광역시교육청', role: '교육감상', status: '' },

    /* ── 받은 연수 ── */
    { type: 'training', date: '2026-03-01', label: '2026 전기 –', title: '경인교육대학교 교육전문대학원 석사과정 (인공지능융합교육전공)', org: '경인교육대학교', role: '재학 중', status: '' },
    { type: 'training', date: '2025-07-21', label: '2025.07 – 08', title: '교실혁명 선도교사 양성연수', org: '교육부 · 인천광역시교육청 융합인재교육과', role: '직무연수', status: '' },
    { type: 'training', date: '2026-01-05', label: '2026.01', title: '2025학년도 동계 초등 1급 정교사 자격연수', org: '인천광역시교육청', role: '자격연수 이수', status: '' },
    { type: 'training', date: '2026-02-03', label: '2026.02.03 – 04', title: '창의융합형 영재·발명·과학교육 활성화 역량강화 직무연수', org: '인천광역시교육청 융합인재교육과', role: '14시간', status: '' },
    { type: 'training', date: '2026-04-15', label: '2026.04.15 – 06.24', title: 'AI·디지털 자료 활용 교육 교원 연수 (3회)', org: '인천신석초등학교 주관', role: '', status: '' },
    { type: 'training', date: '2026-04-27', label: '2026.04.27', title: '디지털 교육 전문적학습공동체 연합 연수 「AIEP 기반 자료 개발 방안」', org: '인천청천초등학교 주관', role: '', status: '' },
    { type: 'training', date: '2026-05-10', label: '2026.05.10', title: '생성형AI 및 구글도구활용 탐구중심 수업설계 역량강화 직무연수', org: '인천광역시교육청AI융합교육원 · 구글코리아', role: '6차시', status: '' },
    { type: 'training', date: '2026-06-05', label: '2026.06.05', title: '디지털 교육 전문적학습공동체 연합 연수 「학생의 정보화 교육자료 개발 방법론」', org: '인천부내초등학교 주관', role: '', status: '' },
    { type: 'training', date: '2026-06-08', label: '2026.06.08 – 22', title: '북부 초등 「AI·디지털 기반 교육과정-수업-평가 실천」 연수 (3회)', org: '인천광역시북부교육지원청', role: '', status: '' },
    { type: 'training', date: '2026-07-01', label: '2026', title: '영재교육 담당교원 역량강화 원격직무연수', org: '인천광역시교육청 융합인재교육과', role: '원격직무연수', status: '' },
    { type: 'training', date: '2025-12-17', label: '2025.12.17', title: 'SE4A 연수', org: 'SE4A 전문적학습공동체', role: '', status: '' },
    { type: 'training', date: '2026-06-30', label: '2026.06.30', title: '디지털 교육 전문적학습공동체 연합 연수 「클로드코드 첫걸음: 설치부터 첫 코딩까지」', org: 'ITPC · 인천마전초등학교 주관', role: '', status: '' },
    { type: 'training', date: '2026-07-02', label: '2026.07.02', title: '진로 연수 「선호미래」', org: '인천광역시교육청AI융합교육원', role: '2시간', status: '' },
    { type: 'training', date: '2026-07-29', label: '2026.07.29 – 09.19', title: '초등 학생평가 전문가 양성 직무연수 (기본과정)', org: '인천광역시교육청 초등교육과', role: '30차시', status: '' },
    { type: 'training', date: '2026-11-19', label: '2026.11.19', title: '찾아가는 과학발명교실연수 「디지털 도구 활용 메이커 발명 연수」', org: '인천광역시교육청 융합인재교육과 · 발명교육지원단', role: '', status: '예정' }
  ]
};
