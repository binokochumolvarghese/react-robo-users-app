import { Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPage";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    
    </>
  );
}

export default App;
