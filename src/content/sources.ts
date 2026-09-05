export interface Source {
  id: string
  title: string
  organization: string
  date: string
  url?: string
  sceneIds: number[]
}

export const SOURCES: Record<string, Source> = {
  moisOnbook: {
    id: 'moisOnbook',
    title: '온북/DaaS 관련 설명자료',
    organization: '행정안전부',
    date: '2023-07-31',
    url: 'https://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000009&nttId=102198',
    sceneIds: [4],
  },
  moisOnAI: {
    id: 'moisOnAI',
    title: '「더 빨라진 행정·더 꼼꼼한 정책 ‘온AI’ 모바일 서비스 개시」 보도자료',
    organization: '행정안전부',
    date: '2026-04-30',
    url: 'https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=125600',
    sceneIds: [6],
  },
  ajuPostBoot: {
    id: 'ajuPostBoot',
    title: '우정사업본부 가상PC 부팅 최적화 사례 (KT클라우드 인터뷰)',
    organization: '아주경제',
    date: '2023-05-07',
    url: 'https://www.ajunews.com/view/20230507131258814',
    sceneIds: [5],
  },
  zdnetPostDaas: {
    id: 'zdnetPostDaas',
    title: '우정사업본부 차세대 클라우드 기반 인터넷PC(DaaS) 우선협상대상자 선정',
    organization: 'ZDNet Korea / 전자신문',
    date: '2026-07',
    url: 'https://zdnet.co.kr/view/?no=20260709092518',
    sceneIds: [5],
  },
  tilonRef: {
    id: 'tilonRef',
    title: 'Tilon project reference (제주대학교 VD 배포, Tstation, iStation)',
    organization: '틸론',
    date: '2026',
    sceneIds: [8, 9, 10, 13, 16],
  },
  sogangRef: {
    id: 'sogangRef',
    title: '서강대학교-틸론 AI·SW 산학협력',
    organization: '서강대학교',
    date: '2022-04-01',
    url: 'https://scc.sogang.ac.kr/front/cmsboardview.do?bbsConfigFK=4851&currentPage=1&pkid=879172&siteId=gradsch',
    sceneIds: [9],
  },
}
