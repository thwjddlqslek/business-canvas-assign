import { MemberProps } from "../components/Table/types";
import { MemberFormData } from "../components/Modal/types";
import { INITIAL_MEMBERS } from "../constants/memberConstants";

const STORAGE_KEY = "memberTableData";

const filterValidMembers = (members: any[]): MemberProps[] => {
  if (!Array.isArray(members)) return [...INITIAL_MEMBERS];
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
    setMembers([...INITIAL_MEMBERS]);
    return [...INITIAL_MEMBERS];
  } catch (e) {
    console.error("로컬 스토리지 데이터 불러오기 오류", e);
    localStorage.removeItem(STORAGE_KEY);
    setMembers([...INITIAL_MEMBERS]);
    return [...INITIAL_MEMBERS];
  }
};

export const addMember = (newMember: MemberFormData): MemberProps => {
  try {
    const currentMembers = getMembers();
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
