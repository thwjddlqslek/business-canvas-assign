import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Date from "../Form/Date";
import SelectBox from "../Form/SelectBox";
import { MemberFormData, MemberFormProps } from "./types";
import Checkbox from "../Table/Checkbox";
import { addMember } from "../../services/storageService";

const defaultFormData: MemberFormData = {
  name: "",
  address: "",
  memo: "",
  joinDate: "",
  job: "개발자",
  emailConsent: false,
};

const jobOptions = [
  { value: "개발자", label: "개발자" },
  { value: "PO", label: "PO" },
  { value: "디자이너", label: "디자이너" },
];

const MemberForm = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: MemberFormProps) => {
  const [formData, setFormData] = useState<MemberFormData>(
    initialData || defaultFormData
  );
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData, isOpen]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, memo: e.target.value }));
  };

  const handleJoinDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, joinDate: e.target.value }));
  };

  const handlejobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, job: e.target.value }));
  };

  const handleEmailConsentChange = (checked: boolean) => {
    setFormData((prev) => {
      return { ...prev, emailConsent: checked };
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.joinDate) {
      alert("이름과 가입일은 필수 입력 항목입니다.");
      return;
    }
    const newMember = addMember(formData);
    onSave(newMember);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"회원 추가"}
      onSave={handleSubmit}
      cancelButtonText={"취소"}
      saveButtonText={"저장"}
      disabled={!(formData.name && formData.joinDate)}
    >
      <form>
        <Input
          label="이름"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          required
          placeholder="Input"
        />
        <Input
          label="주소"
          name="address"
          value={formData.address}
          onChange={handleAddressChange}
          placeholder="Input"
        />
        <Textarea
          label="메모"
          name="memo"
          value={formData.memo}
          onChange={handleMemoChange}
          placeholder="Textarea"
        />
        <Date
          label="가입일"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleJoinDateChange}
          required
        />
        <SelectBox
          label="직업"
          name="job"
          value={formData.job}
          options={jobOptions}
          onChange={handlejobChange}
        />
        <Checkbox
          id="email-consent"
          name="emailConsent"
          checked={formData.emailConsent}
          onChange={handleEmailConsentChange}
          label="이메일 수신 동의"
        />
      </form>
    </Modal>
  );
};

export default MemberForm;
