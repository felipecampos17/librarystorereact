import React from "react";
import "../styles/BookTable.css";

function BookTable({ data, onclickEvent }) {
  return (
    <div className="bookTableGeneral">
      <table className="booktable">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Book Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} onClick={() => onclickEvent(item)}>
              <td>{item.name}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
