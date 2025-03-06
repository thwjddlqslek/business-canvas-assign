import React from "react";
import "../../styles/Modal.css";
import { SmallModalProps } from "./types";

const SmallModal = ({ onDelete, onEdit }: SmallModalProps) => {
  return (
    <div className="s-modal-container">
      <div className="s-modal-item" onClick={onEdit}>
        수정
      </div>
      <div className="s-modal-line" />
      <div className="s-modal-item delete" onClick={onDelete}>
        삭제
      </div>
    </div>
  );
};

export default SmallModal;
