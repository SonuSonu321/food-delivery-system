import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // 🔐 ADMIN TOKEN YAHI CHECK HOGA
  const adminToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="nav">
      <h2>🍽️ Foodies</h2>

      <div>
        {/* USER LINKS */}
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>

        {/* 🔐 ADMIN LINKS */}
        {!adminToken && (
          <Link to="/admin/login">Admin</Link>
        )}

        {adminToken && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
