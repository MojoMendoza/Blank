import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Channel from "./components/Channel";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { setAuthHeaders } from "./services/apiService";
import "./App.css";
import DirectMessage from "./components/DirectMessage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    const storedHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    if (storedHeaders) {
      setAuthHeaders(storedHeaders);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authHeaders");
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="main-container">
      <div className="main-card">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/channels" />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/channels"
            element={isLoggedIn ? <Channel /> : <Navigate to="/login" />}
          />
          <Route path={`/direct-message/`} element={<DirectMessage />} />

        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
