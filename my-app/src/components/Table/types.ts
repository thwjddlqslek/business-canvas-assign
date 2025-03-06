export interface MemeberTableProps {
  onAddBtnClick: () => void;
}
export interface MemberProps {
  id: string;
  name: string;
  address: string;
  memo: string;
  joinDate: string;
  job: string;
  emailConsent: boolean;
}

export interface CheckboxProps {
  id?: string;
  name?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export interface FilterDataProps {
  name: string[];
  address: string[];
  memo: string[];
  joinDate: string[];
  job: string[];
  emailConsent: boolean[];
}
