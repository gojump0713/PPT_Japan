export interface SceneMeta {
  id: number
  chapter: string
  title: string
  shortTitle: string
  durationSec: number
  /** presenter HUD 발표 메모 (발표멘트 요약) */
  note: string
  /** 히어로 이미지 (poster 겸 정적 fallback) */
  hero?: string
  /** 배경/브리지 영상 */
  video?: string
  sourceIds: string[]
}

const img = (n: number, name: string) => `assets/images/s${String(n).padStart(2, '0')}_${name}.webp`
const vid = (n: number, name: string) => `assets/video/s${String(n).padStart(2, '0')}_${name}_v01.mp4`

export const SCENES: SceneMeta[] = [
  {
    id: 1,
    chapter: 'Opening',
    title: '일하는 방식이 다시 한번 바뀌고 있습니다',
    shortTitle: '오프닝 — 3시대',
    durationSec: 90,
    note: '인사 → 20년 전 사무실 회상(PC가 있는 곳이 사무실) → 인터넷·모바일·클라우드로 공식 붕괴(스마트워크/DX) → 지금 AI가 또 한 번의 변화 → 질문: "AI 시대 우리는 어떤 환경에서 일하게 될까요?"',
    hero: img(1, 'hero'),
    video: vid(1, 'evolution_matchcut'),
    sourceIds: [],
  },
  {
    id: 2,
    chapter: 'DX',
    title: 'VDI와 DaaS, PC와 사람을 분리하다',
    shortTitle: 'VDI/DaaS 개념',
    durationSec: 85,
    note: 'VDI = 업무환경을 PC에서 떼어 데이터센터/클라우드로. DaaS = 이를 서비스로. 핵심은 "사람과 PC 위치의 분리" — 업무환경이 사람을 따라온다. 데이터는 중앙, 화면만 전달 → 자유 + 통제 동시 달성.',
    hero: img(2, 'hero'),
    video: vid(2, 'pc_to_cloud'),
    sourceIds: [],
  },
  {
    id: 3,
    chapter: '공공',
    title: '대한민국 정부의 일하는 방식도 변했습니다',
    shortTitle: '전자→디지털→AI정부',
    durationSec: 75,
    note: '전자정부(전산화) → 디지털정부(인터넷 행정서비스) → 서비스가 디지털화돼도 공무원이 특정 PC에서만 일하면 미완성 → 다음 과제는 업무환경 자체의 전환 → 온북 정책 등장 배경.',
    hero: img(3, 'hero'),
    video: vid(3, 'gov_broll'),
    sourceIds: [],
  },
  {
    id: 4,
    chapter: '공공',
    title: '행정안전부 온북 — 두 대의 PC를 하나의 업무환경으로',
    shortTitle: '온북 20→90%',
    durationSec: 95,
    note: '과거: 망분리로 1인 2PC(보안↑ 효율↓). 온북 = 데스크톱→노트북 교체가 아니라 사무실 안팎 동일 보안 업무환경. 도입기관 비율 2023 20% → 2027 90% 계획. DaaS 구축형·구독형 모두 열어둠. "내 자리 PC"에서 "어디서나 접속"으로.',
    hero: img(4, 'hero'),
    sourceIds: ['moisOnbook'],
  },
  {
    id: 5,
    chapter: '공공',
    title: '우정사업본부 — VDI가 DaaS 서비스로 진화하다',
    shortTitle: '우본 DaaS',
    durationSec: 95,
    note: '전국 분산 조직의 PC 관리 과제 → DaaS 장점. KT클라우드-틸론 공공 DaaS 협력. 공개 사례: 부팅 2~3분 → 약 30초. 2026 차세대 사업: 약 126.7억원, 최대 11,000명 동시접속, ~2031(약 5년). KT클라우드 우선협상대상자, 틸론 최신 DaaS 적용. VDI(구축 기술)→DaaS(서비스로 사용).',
    hero: img(5, 'hero'),
    video: vid(5, 'daas_network'),
    sourceIds: ['ajuPostBoot', 'zdnetPostDaas'],
  },
  {
    id: 6,
    chapter: '공공',
    title: '온북에서 온AI로 — 디지털정부가 AI정부로',
    shortTitle: '온AI',
    durationSec: 80,
    note: '2026-04-30 온AI 모바일 서비스 개시. 출장 중 스마트폰 업무, 내부망 파일 공유, AI 회의록 요약. 보안 동시 설계: 모바일 공무원증 로그인·캡처 방지·파일 저장 제한. 하반기 40개 부처 확대. AI를 쓸수록 보안이 더 중요해진다.',
    hero: img(6, 'hero'),
    sourceIds: ['moisOnAI'],
  },
  {
    id: 7,
    chapter: '대학',
    title: '대학 컴퓨터실의 변화',
    shortTitle: '컴퓨터실 30대',
    durationSec: 70,
    note: '예전: PC 30대 + 프로그램 설치면 끝. AI 시대: Python/CUDA/Framework + GPU 필요. 학생 30명에게 GPU PC 30대? 수업 없는 시간에 GPU는 논다 → VDI × GPU 가상화: 성능 자체를 필요한 사람에게 필요한 시간만큼.',
    hero: img(7, 'hero'),
    video: vid(7, 'lab_grid'),
    sourceIds: [],
  },
  {
    id: 8,
    chapter: '대학',
    title: '제주대학교 — 하나의 VDI에서 다양한 전공을',
    shortTitle: '제주대 VDI',
    durationSec: 85,
    note: '학과마다 SW가 다르다: 경영 SPSS, 공대 AutoCAD/Inventor. 실습실 관리 불편 → VDI 요구 + GPU 요구 확인. 모든 학과에 고성능 PC 불필요 — 일반 노트북으로 접속해 전공별 SW·자원 사용. "PC 성능이 학습 기회를 결정하지 않는 캠퍼스".',
    hero: img(8, 'hero'),
    sourceIds: ['tilonRef'],
  },
  {
    id: 9,
    chapter: '대학',
    title: '서강대학교 — GPU를 소유하는 것에서 공유하는 것으로',
    shortTitle: '서강대 GPU',
    durationSec: 85,
    note: 'AI·SW 대학원생/유학생에 GPU 개발환경 필요. 1인 1GPU 고정 배정은 편차·비효율 → 수업/연구/프로젝트 일정 따라 유연 배분. Tstation: 드라이버·CUDA·라이브러리 설치 없이 표준화 환경 접속 즉시 개발. GPU도 소유→필요할 때 사용하는 자원으로.',
    hero: img(9, 'hero'),
    video: vid(9, 'gpu_pool'),
    sourceIds: ['tilonRef', 'sogangRef'],
  },
  {
    id: 10,
    chapter: '대학',
    title: 'Campus에서 AI Native Campus로',
    shortTitle: 'AI Native Campus',
    durationSec: 60,
    note: '노트북 접속 + VDI 전공 SW + AI 수업 GPU 할당 + 내부 데이터×생성형 AI. 핵심은 ChatGPT 계정 배포가 아니라 사람·데이터·SW·GPU·AI가 하나의 환경으로 연결되는 것. 제주대와 서강대는 이 미래 캠퍼스의 서로 다른 조각.',
    hero: img(10, 'hero'),
    sourceIds: ['tilonRef'],
  },
  {
    id: 11,
    chapter: '산업',
    title: '산업의 공통 원리 — 데이터는 움직이지 않고 사람은 움직인다',
    shortTitle: '의료·제조·금융',
    durationSec: 85,
    note: '병원: 의료진은 이동, 환자정보는 데이터센터에. 제조: 한일 공동개발 — 도면을 이메일로 복사하는 대신 안전한 환경에 두고 양국 엔지니어가 동일 Workspace 접속. 금융도 동일. 요구는 하나: 사람에게 자유를, 데이터에 통제를.',
    hero: img(11, 'hero'),
    video: vid(11, 'industry_triptych'),
    sourceIds: [],
  },
  {
    id: 12,
    chapter: 'AX',
    title: '그런데 생성형 AI가 등장했습니다',
    shortTitle: '생성형 AI 리스크',
    durationSec: 75,
    note: '직원들은 생성형 AI를 쓰고 싶어 한다(보고서·번역·분석·코드). 하지만 내부자료·환자정보·미공개 기술을 외부 AI에 넣을 수 없다. 전부 막는 것도 답이 아니다. 질문은 "쓸 것인가"가 아니라 "어떻게 안전하게 쓸 것인가" — 기업 AX의 핵심.',
    hero: img(12, 'hero'),
    sourceIds: [],
  },
  {
    id: 13,
    chapter: 'AX',
    title: 'VDI + GPU + LLM = Secure AI Workspace',
    shortTitle: 'Secure AI Workspace',
    durationSec: 90,
    note: '보안 가상 Workspace 접속 → 업무 시스템·데이터 사용 → 필요 시 GPU 할당 → 정책 따라 내부 LLM/허용된 외부 AI. 조직은 접근권한·파일이동·캡처·세션·데이터 흐름 통제. iStation: Internal AI, AI Router, Tokenizer, 외부 AI 연동, GPU 관리 통합. Virtual Desktop → Secure AI Workspace.',
    hero: img(13, 'hero'),
    video: vid(13, 'secure_stack'),
    sourceIds: ['tilonRef'],
  },
  {
    id: 14,
    chapter: 'AX',
    title: 'AI가 답하는 시대에서 AI가 일하는 시대로',
    shortTitle: 'AI Agent',
    durationSec: 80,
    note: '지금까지 AI는 질문에 답했다. Agent는 목표를 주면 여러 단계 업무를 직접 수행 — 브라우저·자료·파일·프로그램·시스템 연결. AI가 도구에서 업무 수행 주체로. 새 질문: "Agent에게 우리 PC와 시스템을 어디까지 열어줄 것인가?" 사람보다 빠르기에 더 정교한 통제 필요.',
    hero: img(14, 'hero'),
    sourceIds: [],
  },
  {
    id: 15,
    chapter: 'AX',
    title: 'AI에게도 안전한 사무실이 필요합니다',
    shortTitle: 'Agent 출입증',
    durationSec: 70,
    note: '지금까지 VDI는 사람에게 안전한 가상 사무실. 앞으로는 AI Agent에게도 — 필요한 앱만, 필요한 데이터만, 작업 기록. 사람에게 출입증을 주듯 Agent에게 디지털 출입증. MFA/SSO/Session/File/Audit이 AI에도. Human → AI → Human+AI Agent Workspace.',
    hero: img(15, 'hero'),
    video: vid(15, 'badge_matchcut'),
    sourceIds: [],
  },
  {
    id: 16,
    chapter: '틸론',
    title: '그리고 틸론',
    shortTitle: '틸론 진화',
    durationSec: 70,
    note: '2001년부터 20년+ 가상화·클라우드 연구한 한국 SW 기업. Dstation(PC 가상화) → DaaS(어디서나 안전하게) → Tstation(GPU·AI 개발환경) → iStation(생성형 AI × 기업 데이터). 이름은 바뀌어도 질문은 하나: "사람이 가장 안전하고 자유롭게 일할 수 있는 환경". 이제 그 질문에 AI가 추가.',
    hero: img(16, 'hero'),
    video: vid(16, 'tilon_montage'),
    sourceIds: ['tilonRef'],
  },
  {
    id: 17,
    chapter: 'Closing',
    title: 'Closing — DX를 넘어 AX로',
    shortTitle: '클로징',
    durationSec: 60,
    note: 'PC→VDI→DaaS→GPU Workspace→AI Workspace→Human+AI Agent Workspace. DX = 사람이 어디서나 일하는 환경, AX = 사람과 AI가 어디서나 안전하게 함께 일하는 환경. 한일 엔지니어가 데이터 복사 없이 동일 Secure Workspace에서 GPU·AI를 함께 쓰고 AI가 언어 장벽을 낮추는 협업. "PC를 바꾸는 것이 아니라 일하는 환경을 바꾸는 것." 감사 인사.',
    hero: img(17, 'hero'),
    video: vid(17, 'closing_collab'),
    sourceIds: [],
  },
]

export const TOTAL_SCENES = SCENES.length
export const TOTAL_DURATION_SEC = SCENES.reduce((a, s) => a + s.durationSec, 0)
