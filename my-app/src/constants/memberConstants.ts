import { SelectOption } from "../components/Form/types";
import { MemberProps } from "../components/Table/types";

export const JOB_OPTIONS: readonly SelectOption[] = [
  { value: "개발자", label: "개발자" },
  { value: "PO", label: "PO" },
  { value: "디자이너", label: "디자이너" },
] as const;

export const INITIAL_MEMBERS: readonly MemberProps[] = [
  {
    id: "1",
    name: "김철수",
    address: "서울 강남구",
    memo: "React 전문가",
    joinDate: "2024-01-15",
    job: "개발자",
    emailConsent: true,
  },
  {
    id: "2",
    name: "박지영",
    address: "서울 서초구",
    memo: "UX 디자인 리드",
    joinDate: "2024-02-01",
    job: "디자이너",
    emailConsent: true,
  },
  {
    id: "3",
    name: "이민호",
    address: "경기도 성남시",
    memo: "애자일 코치",
    joinDate: "2024-02-15",
    job: "PO",
    emailConsent: false,
  },
  {
    id: "4",
    name: "한소희",
    address: "서울 마포구",
    memo: "UI 디자인 전문가",
    joinDate: "2024-03-01",
    job: "디자이너",
    emailConsent: true,
  },
  {
    id: "5",
    name: "최준혁",
    address: "인천 송도동",
    memo: "백엔드 개발자",
    joinDate: "2024-03-15",
    job: "개발자",
    emailConsent: false,
  },
  {
    id: "6",
    name: "장미란",
    address: "부산 해운대구",
    memo: "데브옵스 엔지니어",
    joinDate: "2024-03-20",
    job: "개발자",
    emailConsent: true,
  },
  {
    id: "7",
    name: "정우성",
    address: "서울 용산구",
    memo: "프로덕트 매니저",
    joinDate: "2024-03-25",
    job: "PO",
    emailConsent: true,
  },
  {
    id: "8",
    name: "강다현",
    address: "대구 수성구",
    memo: "모션 디자이너",
    joinDate: "2024-04-01",
    job: "디자이너",
    emailConsent: false,
  },
] as const;
