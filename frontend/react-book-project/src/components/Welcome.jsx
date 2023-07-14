import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/">Retornar a página inicial</Link>
    </div>
  );
}

export default Welcome;
