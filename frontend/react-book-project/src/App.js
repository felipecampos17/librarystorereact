import "./App.css";
import React, { useEffect, useState } from "react";
import BookTable from "./components/BookTable";
import BookEditor from "./components/BookEditor";
import BookButton from "./components/BookButton";

function App() {
  const [data, setData] = useState([]);
  const [nameBook, setNameBook] = useState("");
  const [titleBook, setTitleBook] = useState("");

  const handleNameChange = (event) => {
    setNameBook(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleBook(event.target.value);
  };

  const handleButtonPost = () => {
    if (nameBook === "" || titleBook === "") {
      console.log("Fail");
      return;
    }
    postRequest();
  };

  const handleButtonRefresh = async () => {
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

  const postRequest = async () => {
    const requestData = {
      name: nameBook,
      title: titleBook,
    };

    try {
      const response = await fetch("http://localhost:3001/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Error in request");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
    } catch (error) {
      console.log("Error:", error);
    }
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
      <h1>Book Table</h1>
      <BookTable data={data} />
      <BookEditor bookName={nameBook} changeEvent={handleNameChange} />
      <BookEditor bookName={titleBook} changeEvent={handleTitleChange} />
      <BookButton clickAction={handleButtonPost} buttonText="Save" />
      <BookButton clickAction={handleButtonRefresh} buttonText="Refresh" />
    </div>
  );
}

export default App;
