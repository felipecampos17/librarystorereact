import React from "react";
import "../styles/BookButton.css";

function BookButton({ clickAction, buttonText }) {
  return (
    <div>
      <button className="buttonBook" onClick={clickAction}>
        {buttonText}
      </button>
    </div>
  );
}

export default BookButton;
