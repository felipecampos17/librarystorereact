import React from "react";
import ReactModal from "react-modal";

function Modal({ isOpen, onRequestClose, responseBody }) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>{typeof responseBody === "string" ? responseBody : null}</div>
    </ReactModal>
  );
}

export default Modal;
