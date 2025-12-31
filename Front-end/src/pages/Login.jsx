import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ navigation hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // purana error clear

    console.log("Sending:", username, password);

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data;

      // 🔐 JWT save
      localStorage.setItem("token", token);

      console.log("JWT:", token);
      alert("Login successful!");

      // ✅ YAHI MAIN FIX THA
      navigate("/home");   // ya "/dashboard"

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
