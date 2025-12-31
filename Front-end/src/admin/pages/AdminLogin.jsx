import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/admin/login",
        {
          username,
          password,
        }
      );

      // 🔐 ADMIN JWT SAVE
      localStorage.setItem("token", res.data);

      alert("Admin login successful");
      navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
