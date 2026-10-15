export interface ChangelogSource {
  label: string;
  href: string;
}

export interface ChangelogEntry {
  date: string;
  title: string;
  summary: string;
  changes: readonly string[];
  commit: string;
  commitUrl: string;
  sources: readonly ChangelogSource[];
}

const REPOSITORY_URL = 'https://github.com/SublimerNJ/law-calc';

export const CHANGELOG_LAST_MODIFIED = '2026-10-15';

const commitSource = (commit: string): ChangelogSource => ({
  label: `Git 커밋 ${commit}`,
  href: `${REPOSITORY_URL}/commit/${commit}`,
});

export const CHANGELOG_ENTRIES: readonly ChangelogEntry[] = [
  {
    date: '2026-10-15',
    title: '변호사보수 산입 계산기를 규칙 별표와 사건 유형별 검산 흐름으로 재작성했습니다',
    summary: '민사소송법 제109조와 변호사보수 규칙의 별표 기준액을 한 심급 단위로 계산하고, 실제 지급보수액·가압류·가처분·절차상 감액·판결문상 부담비율을 분리해 검산하도록 계산기와 설명을 바꿨습니다.',
    changes: [
      '2026. 10. 2. 시행 민사소송법 제109조와 2020. 12. 28. 시행 규칙 제3조~제6조·별표의 8개 구간을 순수 함수와 6개 테스트로 고정했습니다.',
      '가압류·가처분에서 변론 또는 심문을 거친 경우의 2분의 1, 전부자백·무변론·이행권고결정의 감액 사유를 별도 입력으로 분리했습니다.',
      '실제 지급보수액과 판결문상 상대방 부담비율만 참고액에 반영하고, 승소 여부·법원 재량 조정·최종 소송비용액은 자동 추정하지 않도록 범위를 정리했습니다.',
    ],
    commit: '4953df7',
    commitUrl: `${REPOSITORY_URL}/commit/4953df7`,
    sources: [
      commitSource('4953df7'),
      { label: '민사소송법 제109조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민사소송법/제109조' },
      { label: '변호사보수의 소송비용 산입에 관한 규칙 본문·부칙', href: 'https://www.law.go.kr/LSW/lsInfoP.do?lsId=005866' },
      { label: '변호사보수 규칙 별표 PDF', href: 'https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=91732731&bylClsCd=110201' },
    ],
  },
  {
    date: '2026-10-14',
    title: '유류분 계산기를 현행 민법·자료 대조 흐름으로 재작성했습니다',
    summary: '상속 개시 당시 재산·산입 근거를 확인한 증여·채무·법정상속분·실제 취득액을 분리 입력해 유류분 부족액 참고값을 검산하도록 계산기와 설명을 바꿨습니다.',
    changes: [
      '민법 제1113조의 기초재산 구조와 현행 제1112조의 직계비속·배우자 2분의 1, 직계존속 3분의 1을 순수 함수와 테스트로 고정했습니다.',
      '형제자매 유류분 삭제, 제1114조의 증여 산입 범위, 제1115조 개정의 적용례와 제1117조 기간을 자료 점검 순서에 반영했습니다.',
      '검산 예시는 같은 함수로 90,000,000원 기초재산·22,500,000원 유류분·12,500,000원 부족액 참고값을 렌더링하고, 반환청구 통보 템플릿을 제거했습니다.',
    ],
    commit: 'ce07e9e',
    commitUrl: `${REPOSITORY_URL}/commit/ce07e9e`,
    sources: [
      commitSource('ce07e9e'),
      { label: '민법 제1112조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제1112조' },
      { label: '민법 제1113조·제1115조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제1113조' },
      { label: '민법 2026년 개정문·부칙', href: 'https://www.law.go.kr/LSW/lsRvsDocListP.do?lsId=001706&chrClsCd=010202&lsRvsGubun=all' },
    ],
  },
  {
    date: '2026-10-13',
    title: '일반 손해배상 계산기를 자료별 검산 흐름으로 재작성했습니다',
    summary: '한 번에 손해액을 추정하지 않고 치료비·수리비·일실이익·기타 확인액을 나눠 입력해 중복을 확인한 뒤, 입력 과실비율만 적용하도록 화면과 계산 함수를 정리했습니다.',
    changes: [
      '네 가지 재산상 손해 항목을 같은 순수 계산 함수로 합산하고 과실상계 후 참고액을 계산합니다.',
      '페이지 검산 예시도 입력 함수의 결과를 다시 렌더링해 7,000,000원 합계·20% 차감·5,600,000원 참고액을 확인합니다.',
      '위자료·개호비·장해·제조물 결함·인과관계·이미 지급된 금액을 자동 추정·공제하지 않는 범위를 자료 확인 순서와 함께 표시했습니다.',
    ],
    commit: '2972124',
    commitUrl: `${REPOSITORY_URL}/commit/2972124`,
    sources: [
      commitSource('2972124'),
      { label: '민법 제750조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제750조' },
      { label: '민법 제763조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제763조' },
    ],
  },
  {
    date: '2026-10-12',
    title: '교통사고 책임보험 한도 계산기를 검산 흐름으로 재작성했습니다',
    summary: '사건별 합의금을 추정하는 대신, 법정 급별 한도와 확인된 인적 손해를 어떤 순서로 대조하는지 입력·검산·결과 화면에 분리해 표시했습니다.',
    changes: [
      '상해·후유장애 1~14급 선택지에 국가법령정보센터 별표의 한도금액을 함께 표시했습니다.',
      '상해 한도와 후유장애 한도를 합산하는 예시를 같은 순수 계산 함수로 다시 계산해 화면에 렌더링했습니다.',
      '손해액·급수 자료를 확인하는 순서와 위자료·일실수입·과실비율·전체 합의금 추정 제외 범위를 구분했습니다.',
    ],
    commit: '5f3b281',
    commitUrl: `${REPOSITORY_URL}/commit/5f3b281`,
    sources: [
      commitSource('5f3b281'),
      { label: '자동차손해배상 보장법 시행령 국가법령정보센터', href: 'https://www.law.go.kr/LSW/lsInfoP.do?lsId=004594&ancYnChk=0' },
      { label: '자동차손해배상 보장법 시행령 별표 1 PDF', href: 'https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=169111681&bylClsCd=110201' },
      { label: '자동차손해배상 보장법 시행령 별표 2 PDF', href: 'https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=169111793&bylClsCd=110201' },
    ],
  },
  {
    date: '2026-10-09',
    title: '분야별 계산기 허브를 추가했습니다',
    summary: '계산기 이름만 나열하지 않고, 법률 문제의 분야와 입력자료를 먼저 좁힐 수 있도록 도구 디렉터리와 분야별 허브를 만들었습니다.',
    changes: [
      '새 /tools 디렉터리와 9개 분야별 /tools/<category> 허브를 추가했습니다.',
      '각 허브에 도구를 고르는 기준, 입력 전에 확인할 자료, 도구별 선택 이유를 직접 작성했습니다.',
      '헤더·푸터 링크와 sitemap에 허브 경로를 연결했습니다.',
    ],
    commit: '32f87c1',
    commitUrl: `${REPOSITORY_URL}/commit/32f87c1`,
    sources: [commitSource('32f87c1')],
  },
  {
    date: '2026-10-08',
    title: '계산기 공통 문구와 FAQ 중복을 줄였습니다',
    summary: '모든 계산기에 같은 품질 블록을 반복하는 대신, 각 도구의 설명에 맞는 한 줄 면책과 고유한 안내만 남겼습니다.',
    changes: [
      '결과 해석 주의점·실무 다음 단계·조문 원문 안내를 도구별 면책 한 줄로 정리했습니다.',
      'FAQ에서 이미 답한 quality 예시와 조건이 다시 나오지 않도록 중복 노출을 제거했습니다.',
    ],
    commit: '674ea16',
    commitUrl: `${REPOSITORY_URL}/commit/674ea16`,
    sources: [commitSource('674ea16')],
  },
  {
    date: '2026-10-07',
    title: '운영 주체 표시를 개인 운영으로 정리했습니다',
    summary: '실제 운영 방식과 맞지 않던 편집팀 표현을 없애고, 개인 운영 서비스라는 사실과 법률 자격의 한계를 일관되게 표시했습니다.',
    changes: [
      '소개·가이드·계산기·메타데이터·구조화 데이터의 운영 주체 표현을 개인 운영으로 통일했습니다.',
      '법률 자격이 없다는 안내와 오류 정정 절차, 기존 연락처를 유지했습니다.',
    ],
    commit: 'fc49c07',
    commitUrl: `${REPOSITORY_URL}/commit/fc49c07`,
    sources: [commitSource('fc49c07')],
  },
  {
    date: '2026-10-06',
    title: '일반 손해배상 계산 범위를 확인 가능한 손해로 좁혔습니다',
    summary: '사건별 판단이 필요한 금액을 자동 추정하지 않고, 자료로 확인할 수 있는 재산상 손해에 입력 과실비율을 적용하는 구조로 바꿨습니다.',
    changes: [
      '치료비·수리비·일실이익 등 자료로 확인된 재산상 손해만 합산하도록 했습니다.',
      '위자료·개호비·장해·제조물 결함·인과관계·실제 배상액 추정을 계산에서 제외했습니다.',
      '민법 제750조·제393조·제396조·제751조·제763조와 제조물책임법 제3조를 공식 출처로 연결했습니다.',
    ],
    commit: '3fdddc1',
    commitUrl: `${REPOSITORY_URL}/commit/3fdddc1`,
    sources: [
      commitSource('3fdddc1'),
      { label: '민법 제750조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제750조' },
    ],
  },
  {
    date: '2026-10-05',
    title: '교통사고 도구를 책임보험 한도와 확인된 손해 중심으로 바꿨습니다',
    summary: '사고별 합의금·위자료를 추정하지 않고, 자동차손해배상 보장법 시행령의 급별 책임보험금 한도와 입력한 인적 손해를 비교하도록 했습니다.',
    changes: [
      '상해·후유장애 급별 책임보험금 한도를 법령 별표에 맞춰 비교합니다.',
      '부상과 후유장애가 함께 확인될 때 법정 한도를 합산하는 구조를 반영했습니다.',
      '일당 위자료·일실수입·향후치료비·과실비율·사건별 합의금 추정을 제거했습니다.',
    ],
    commit: '8d279c7',
    commitUrl: `${REPOSITORY_URL}/commit/8d279c7`,
    sources: [
      commitSource('8d279c7'),
      { label: '자동차손해배상 보장법 시행령 국가법령정보센터', href: 'https://www.law.go.kr/LSW/lsInfoP.do?lsId=004594&ancYnChk=0' },
    ],
  },
  {
    date: '2026-10-04',
    title: '부당해고 도구를 임금상당액 산식으로 한정했습니다',
    summary: '부당해고 기간의 임금상당액처럼 입력자료와 산식이 확인되는 부분만 계산하고, 추가 보상액을 추정하지 않도록 했습니다.',
    changes: [
      '입력한 1일 기준 임금에 해고기간 일수를 곱해 임금상당액만 계산합니다.',
      '중간수입 공제와 금전보상명령의 추가 금품, 해고예고수당·퇴직금은 별도 항목으로 분리했습니다.',
      '근로기준법과 중앙노동위원회·공식 생활법령정보·대법원 판례 출처를 연결했습니다.',
    ],
    commit: '1c9ee88',
    commitUrl: `${REPOSITORY_URL}/commit/1c9ee88`,
    sources: [
      commitSource('1c9ee88'),
      { label: '근로기준법 국가법령정보센터', href: 'https://www.law.go.kr/법령/근로기준법' },
    ],
  },
  {
    date: '2026-10-03',
    title: '의료사고 도구에서 근거 없는 정액 추정을 제거했습니다',
    summary: '의료사고의 위자료·개호비·장해액을 임의로 정하지 않고, 확인된 재산상 손해와 입력한 책임비율만 계산하도록 바꿨습니다.',
    changes: [
      '치료비·향후 치료비·일실수입 등 입력한 재산상 손해를 합산한 뒤 책임비율을 적용합니다.',
      '위자료·개호비·장해 정액 추정과 배상 통보 템플릿을 제거했습니다.',
      '민법, 의료사고 피해구제법, 한국의료분쟁조정중재원 공식 안내를 출처로 연결했습니다.',
    ],
    commit: '237ba24',
    commitUrl: `${REPOSITORY_URL}/commit/237ba24`,
    sources: [
      commitSource('237ba24'),
      { label: '민법 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법' },
    ],
  },
  {
    date: '2026-10-02',
    title: '보석금 예상 대신 보석 요건 확인 도구로 전환했습니다',
    summary: '사건별 법원 판단인 보석금 액수를 산출하지 않고, 형사소송법상 청구권자·예외·조건을 점검하도록 범위를 바꿨습니다.',
    changes: [
      '보석금 입력·출력·예상 범위와 금액 발송 템플릿을 제거했습니다.',
      '형사소송법 제94조부터 제104조까지 청구권자, 필요적 보석 예외, 조건과 사후 절차를 점검표로 정리했습니다.',
    ],
    commit: 'faf809e',
    commitUrl: `${REPOSITORY_URL}/commit/faf809e`,
    sources: [
      commitSource('faf809e'),
      { label: '형사소송법 제94조~제104조 국가법령정보센터', href: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=288579&chrClsCd=010202&urlMode=lsInfoP&efYd=20261002&ancYnChk=0' },
    ],
  },
  {
    date: '2026-10-01',
    title: '이혼 위자료 금액표를 판단요소 점검표로 바꿨습니다',
    summary: '사건의 모든 사정을 종합하는 법원 판단을 일반 금액표로 대신하지 않도록 하드코딩 범위와 예상 금액 출력을 제거했습니다.',
    changes: [
      '유책행위·혼인기간·가족관계·재산 상태·증거를 정리하는 점검 항목을 남겼습니다.',
      '민법 제806조·제843조와 이혼 위자료 관련 대법원 판례를 근거로 연결했습니다.',
    ],
    commit: 'be59429',
    commitUrl: `${REPOSITORY_URL}/commit/be59429`,
    sources: [
      commitSource('be59429'),
      { label: '민법 제806조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제806조' },
    ],
  },
  {
    date: '2026-09-30',
    title: '명예훼손 금액 추정을 사건자료 점검으로 바꿨습니다',
    summary: '민사 손해배상액에 적용할 보편적인 정액표나 단일 산식이 확인되지 않아 하드코딩 금액표와 예상 범위를 제거했습니다.',
    changes: [
      '행위·전파·손해·공공의 이익·삭제와 사과 등 사건별 판단자료를 점검하도록 했습니다.',
      '본문의 금액 설명과 화면의 금액 출력이 충돌하던 구조를 없앴습니다.',
      '민법·형법·정보통신망법과 대법원 위자료 산정방안을 출처로 연결했습니다.',
    ],
    commit: '0cb45be',
    commitUrl: `${REPOSITORY_URL}/commit/0cb45be`,
    sources: [
      commitSource('0cb45be'),
      { label: '민법 제751조 국가법령정보센터', href: 'https://www.law.go.kr/법령/민법/제751조' },
    ],
  },
  {
    date: '2026-09-29',
    title: '양육비 계산을 서울가정법원 공식 기준표에 맞췄습니다',
    summary: '근거가 확인되지 않던 2025 개정 표기를 제거하고, 서울가정법원이 2021년 공표해 2022년 3월 1일부터 시행한 기준표를 반영했습니다.',
    changes: [
      '부모 합산소득 11개 구간과 자녀 연령 6개 구간의 1인 평균양육비를 코드에 반영했습니다.',
      '0~2세·0~199만 원 구간의 621,000원 등 대표 셀 6개를 테스트로 고정했습니다.',
      '자녀 수·지역·재산·치료비·교육비처럼 법원이 따로 판단하는 요소는 계산 결과와 구분했습니다.',
    ],
    commit: 'faac73b',
    commitUrl: `${REPOSITORY_URL}/commit/faac73b`,
    sources: [
      commitSource('faac73b'),
      { label: '서울가정법원 2021년 양육비산정기준표', href: 'https://slfamily.scourt.go.kr/dcboard/new/DcNewsViewAction.work?seqnum=9654&gubun=41' },
    ],
  },
  {
    date: '2026-09-28',
    title: '임대차 전환율에 법정 산식과 기준금리 적용일을 반영했습니다',
    summary: '주택·상가 전환율을 서로 다른 법정 산식으로 분리하고, 한국은행이 공시한 기준금리 연 3.00%와 적용일을 한 곳에서 관리하도록 했습니다.',
    changes: [
      '주택 전환율은 기준금리 + 2%포인트와 연 10% 중 낮은 비율을 사용합니다.',
      '상가 전환율은 기준금리 × 4.5배와 연 12% 중 낮은 비율을 사용합니다.',
      '2026년 8월 27일 적용 기준금리 연 3.00%를 상수와 화면에 함께 표시하고, 두 산식을 테스트로 고정했습니다.',
    ],
    commit: 'bddd90c',
    commitUrl: `${REPOSITORY_URL}/commit/bddd90c`,
    sources: [
      commitSource('bddd90c'),
      { label: '한국은행 기준금리 추이', href: 'https://www.bok.or.kr/portal/singl/baseRate/list.do?dataSeCd=01&menuNo=200643' },
      { label: '상가건물 임대차보호법 시행령 제5조', href: 'https://www.law.go.kr/법령/상가건물임대차보호법시행령/제5조' },
    ],
  },
  {
    date: '2026-09-27',
    title: '보석 청구권자 목록을 형사소송법 제94조 원문에 맞췄습니다',
    summary: '폐지된 호주 표현을 삭제하고, 현행 조문에 적힌 보석 청구권자 목록을 반영했습니다.',
    changes: [
      '피고인, 변호인·법정대리인·배우자·직계친족에 더해 형제자매·가족·동거인·고용주를 표시했습니다.',
      'FAQ와 JSON-LD가 같은 청구권자 내용을 사용하도록 확인했습니다.',
    ],
    commit: 'dcc843d',
    commitUrl: `${REPOSITORY_URL}/commit/dcc843d`,
    sources: [
      commitSource('dcc843d'),
      { label: '형사소송법 제94조 국가법령정보센터', href: 'https://www.law.go.kr/법령/형사소송법' },
    ],
  },
  {
    date: '2026-08-19',
    title: '육아휴직급여를 고용보험법 시행령 제95조의 기간별 산식에 맞췄습니다',
    summary: '기존의 전 기간 80% 계산을 고쳐 1~6개월은 통상임금 100%, 7개월부터 80%를 적용하도록 했습니다.',
    changes: [
      '일반 근로자는 1~3개월 100%(상한 250만 원), 4~6개월 100%(상한 200만 원), 7개월부터 80%(상한 160만 원)으로 계산합니다.',
      '하한 70만 원을 유지하고, 한부모의 첫 3개월 상한 300만 원을 제95조의3 제3항에 맞춰 반영했습니다.',
      '장애아동 가산으로 잘못 표시하던 내용을 제거하고 시행일 2026년 7월 1일과 공식 조문을 표시했습니다.',
    ],
    commit: '7d67a06',
    commitUrl: `${REPOSITORY_URL}/commit/7d67a06`,
    sources: [
      commitSource('7d67a06'),
      { label: '고용보험법 시행령 제95조 국가법령정보센터', href: 'https://www.law.go.kr/법령/고용보험법시행령/제95조' },
    ],
  },
];

export function getChangelogEntry(commit: string): ChangelogEntry | undefined {
  return CHANGELOG_ENTRIES.find((entry) => entry.commit === commit);
}
