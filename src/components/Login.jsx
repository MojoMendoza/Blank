import { useState } from "react";
import { setAuthHeaders, login } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login(email, password);

            setAuthHeaders(response.headers);
            const userData = response.data.data;
            const userId = userData['id'];

            localStorage.setItem("authHeaders", JSON.stringify(response.headers));
            localStorage.setItem("userId", userId);

            setMessage("Login successful!");
            alert("Login successful!");
            onLogin();
            navigate("/channels");
        } catch (error) {
            setMessage("Login failed.");
            console.error("Login error:", error);
        }
    };


    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
                <p className={`login-message ${message.includes("successful") ? "success" : "error"}`}>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Login;
