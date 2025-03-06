import React from "react";
import Button from "../Button/Button";
import { ModalProps } from "./types";
import "../../styles/Modal.css";

const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  children,
  onSave,
  onCancel,
  cancelButtonText,
  saveButtonText,
  disabled,
}) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <Button variant="cancel" onClick={handleCancel}>
            {cancelButtonText}
          </Button>
          {onSave && (
            <Button variant="save" onClick={onSave} disabled={disabled}>
              {saveButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
