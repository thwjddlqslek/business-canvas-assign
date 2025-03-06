import { MemberProps } from "../components/Table/types";
import { MemberFormData } from "../components/Modal/types";

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

// 유효한 멤버만 필터링
const filterValidMembers = (members: any[]): MemberProps[] => {
  if (!Array.isArray(members)) return initialMembers;
  return members.filter(
    (member) =>
      member !== null &&
      member !== undefined &&
      typeof member === "object" &&
      typeof member.id === "string"
  );
};

export const setMembers = (members: MemberProps[]): void => {
  try {
    const validMembers = filterValidMembers(members);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validMembers));
  } catch (e) {
    console.error("로컬 스토리지 데이터 저장 오류", e);
  }
};

export const getMembers = (): MemberProps[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return filterValidMembers(parsedData);
    }
    setMembers(initialMembers);
    return initialMembers;
  } catch (e) {
    console.error("로컬 스토리지 데이터 불러오기 오류", e);
    localStorage.removeItem(STORAGE_KEY);
    setMembers(initialMembers);
    return initialMembers;
  }
};

export const addMember = (newMember: any): MemberProps => {
  try {
    const currentMembers = getMembers();
    // 기존 id 중 가장 큰 값+1으로 해야 중복 이슈가 안생김.
    const maxId = currentMembers.reduce((max, member) => {
      const id = parseInt(member.id);
      return isNaN(id) ? max : Math.max(max, id);
    }, 0);

    const newId = String(maxId + 1);
    const memberWithId = {
      ...newMember,
      id: newId,
    };

    const updateMembers = [...currentMembers, memberWithId];
    setMembers(updateMembers);
    return memberWithId;
  } catch (e) {
    console.error("멤버 추가 오류", e);
    return newMember;
  }
};

export const deleteMember = (id: string): void => {
  try {
    const currentMembers = getMembers();
    const updateMembers = currentMembers.filter((member) => member.id !== id);
    setMembers(updateMembers);
  } catch (e) {
    console.error("로컬 스토리지 삭제 오류", e);
  }
};

export const updateMember = (updatedMember: MemberFormData) => {
  try {
    if (!updatedMember || !updatedMember.id) {
      console.error("유효하지 않은 멤버 데이터", updatedMember);
      return null;
    }

    const currentMembers = getMembers();
    const memberIndex = currentMembers.findIndex(
      (member) => member.id === updatedMember.id
    );

    if (memberIndex === -1) {
      console.error("수정할 멤버를 찾을 수 없음", updatedMember.id);
      return null;
    }

    const updatedMembers = [...currentMembers];
    updatedMembers[memberIndex] = updatedMember;
    setMembers(updatedMembers);
    return updatedMember;
  } catch (e) {
    console.error("로컬 스토리지 수정 오류", e);
    return null;
  }
};
