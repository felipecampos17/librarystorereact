import "./App.css";
import React, { useEffect, useState } from "react";
import BookTable from "./components/BookTable";
import BookEditor from "./components/BookEditor";
import BookButton from "./components/BookButton";
import Modal from "./components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState([]);
  const [nameBook, setNameBook] = useState("");
  const [titleBook, setTitleBook] = useState("");
  const [rowBook, setRowBook] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseBody, setResponseBody] = useState("");

  const handleNameChange = (event) => {
    setNameBook(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleBook(event.target.value);
  };

  const handleShowResponse = async (body) => {
    try {
      console.log(body);
      setResponseBody(body);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleRowChange = (row) => {
    setRowBook(row);
    setNameBook(row.name);
    setTitleBook(row.title);
    console.log(rowBook);
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
        throw new Error(response.body);
      } else {
        const responseBody = await response.json();
        toast.success(responseBody.message);
        //handleShowResponse(responseBody.message);
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
    } catch (error) {
      console.log("Error:", error);
    }
  };

  function handleClick() {
    alert("You clicked me!");
  }

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
      <BookTable data={data} onclickEvent={handleRowChange} />
      <BookEditor bookName={nameBook} changeEvent={handleNameChange} />
      <BookEditor bookName={titleBook} changeEvent={handleTitleChange} />
      <BookButton clickAction={handleButtonPost} buttonText="Save" />
      <BookButton clickAction={handleButtonRefresh} buttonText="Refresh" />
      <BookButton clickAction={handleButtonUpdate} buttonText="Update" />
      <BookButton clickAction={handleButtonDelete} buttonText="Delete" />
      <BookButton clickAction={handleClick} buttonText="Test" />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        responseBody={responseBody}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
