import React from "react";
import "../../styles/Modal.css";

const SmallModal = () => {
  return (
    <div className="s-modal-container">
      <div className="s-modal-item">수정</div>
      <div className="s-modal-line" />
      <div className="s-modal-item delete">삭제</div>
    </div>
  );
};

export default SmallModal;
