import React from "react";
import { Outlet, Link } from "react-router-dom";
import libraryPhoto from "../img/library_photo.jpg";

function NavBar() {
  return (
    <>
      <div>
        <h1>Bem vindo a biblioteca virtual</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bookpage">Book Page</Link>
          </li>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
        </ul>
      </nav>
      <div>
        <img src={libraryPhoto} alt="Library" sizes="10 10"></img>
      </div>

      <Outlet />
    </>
  );
}

export default NavBar;
