import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookPage from "./components/BookPage";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}></Route>
        <Route path="/bookpage" element={<BookPage />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
