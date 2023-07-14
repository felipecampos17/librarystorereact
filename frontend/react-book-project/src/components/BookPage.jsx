import React, { useEffect, useState } from "react";
import BookTable from "./BookTable";
import BookEditor from "./BookEditor";
import BookButton from "./BookButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/BookPage.css";
import { Link } from "react-router-dom";

function BookPage() {
  const [data, setData] = useState([]);
  const [nameBook, setNameBook] = useState("");
  const [titleBook, setTitleBook] = useState("");
  const [rowBook, setRowBook] = useState("");

  const handleNameChange = (event) => {
    setNameBook(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleBook(event.target.value);
  };

  const handleRowChange = (row) => {
    setRowBook(row);
    setNameBook(row.name);
    setTitleBook(row.title);
    console.log(rowBook);
  };

  const handleButtonPost = async () => {
    if (nameBook === "" || titleBook === "") {
      console.log("Fail");
      return;
    }
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
        const responseData = await response.json();
        toast.error(responseData.error);
        throw new Error("Error in request");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      toast.success(requestData.name);
    } catch (error) {
      console.log("Error:", error);
    }
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
      toast.success("Tabela atualizada com sucesso!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleButtonUpdate = async () => {
    try {
      const requestData = {
        name: nameBook,
        title: titleBook,
      };

      const response = await fetch("http://localhost:3001/book", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        toast.error(responseBody.message);
        throw new Error(response.body);
      } else {
        const responseBody = await response.json();
        toast.success(responseBody.message);
        handleButtonRefresh();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleButtonDelete = async () => {
    try {
      const requestData = {
        name: nameBook,
        title: titleBook,
      };

      const response = await fetch("http://localhost:3001/book", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(response.body);
      }
      toast.success("Livro apagado com sucesso!");
      handleButtonRefresh();
    } catch (error) {
      console.log("Error:", error);
      toast.error(error);
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
      <BookTable data={data} onclickEvent={handleRowChange} />
      <div className="inputFields">
        <BookEditor bookName={nameBook} changeEvent={handleNameChange} />
        <BookEditor bookName={titleBook} changeEvent={handleTitleChange} />
      </div>
      <div className="buttonFields">
        <BookButton clickAction={handleButtonPost} buttonText="Save" />
        <BookButton clickAction={handleButtonRefresh} buttonText="Refresh" />
        <BookButton clickAction={handleButtonUpdate} buttonText="Update" />
        <BookButton clickAction={handleButtonDelete} buttonText="Delete" />
      </div>
      <ToastContainer />
      <div className="navBar">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default BookPage;
