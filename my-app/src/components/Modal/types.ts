import { ReactNode } from "react";
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  cancelButtonText?: string;
  saveButtonText?: string;
}

export interface MemberFormData {
  name: string;
  address: string;
  memo: string;
  joinDate: string;
  job: string;
  emailConsent: boolean;
}

export interface MemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberFormData) => void;
  initialData?: MemberFormData;
  isEdit?: boolean;
}
