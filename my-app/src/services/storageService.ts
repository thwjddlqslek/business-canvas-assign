import { MemberProps } from "../components/Table/types";

const STORAGE_KEY = "memberTableData";

const initialMembers: MemberProps[] = [
  {
    id: "1",
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    joinDate: "2024-10-02",
    job: "개발자",
    emailConsent: true,
  },
  {
    id: "2",
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    joinDate: "2024-10-01",
    job: "PO",
    emailConsent: false,
  },
];

export const setMembers = (members: MemberProps[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (e) {
    console.error("로컬 스토리지 데이터 저장 오류", e);
  }
};

export const getMembers = (): MemberProps[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      return JSON.parse(storedData);
    }
    setMembers(initialMembers);
    return initialMembers;
  } catch (e) {
    console.error("로컬 스토리지 데이터 불러오기 오류", e);
    setMembers(initialMembers);
    return initialMembers;
  }
};
