import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [nameBook, setNameBook] = useState("");
  const [titleBook, setTitleBook] = useState("");

  const postRequest = () => {
    const data = {
      name: nameBook,
      title: titleBook,
    };

    fetch("http://localhost:3001/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response:", responseData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/books");
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Simple Inventory Table</h1>
      <table className="tablebook">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Book Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.title}</td>

              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <input
        value={nameBook}
        onChange={(event) => {
          setNameBook(event.target.value);
        }}
      ></input>
      <input
        value={titleBook}
        onChange={(event) => {
          setTitleBook(event.target.value);
        }}
      ></input>
      <button
        className="botton"
        onClick={() => {
          postRequest();
        }}
      >
        POST
      </button>
    </div>
  );
}

export default App;
