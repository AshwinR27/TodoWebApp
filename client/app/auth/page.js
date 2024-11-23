"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password || (isRegisterMode && !name)) {
      alert("All fields are required.");
      return;
    }

    const payload = isRegisterMode
      ? { name, email, password, mode: "register" }
      : { email, password, mode: "login" };

    try {
      const response = await fetch("http://localhost:5000/api/users/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        alert(`${isRegisterMode ? "Registered and logged in!" : "Logged in!"}`);
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {isRegisterMode ? <h2><span>Todo App</span> Register</h2> : <h2><span>Todo App</span> Login</h2>}
       
        {isRegisterMode && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button onClick={handleAuth} className="auth-button">
          {isRegisterMode ? "Register and Login" : "Login"}
        </button>
        {!isRegisterMode && (
          <p className="auth-toggle-text">
            Don't have an account?{" "}
            <button onClick={() => setIsRegisterMode(true)} className="auth-toggle-button">Register</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
