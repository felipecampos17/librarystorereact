import React from "react";

function BookEditor({ bookName, changeEvent }) {
  return (
    <div>
      <input value={bookName} onChange={changeEvent}></input>
    </div>
  );
}

export default BookEditor;
