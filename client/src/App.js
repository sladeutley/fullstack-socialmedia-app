import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage"; //this is whole reason for jsconfig.json. itstead of having to put './scenes/homePage
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {

  return (
    <div className="app">
      <h1>hi</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
