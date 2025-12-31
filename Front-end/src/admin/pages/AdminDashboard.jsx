import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>
          <Link to="/admin/categories">Manage Categories</Link>
        </li>
        <li>
          <Link to="/admin/foods">Manage Foods</Link>
        </li>
        <li>
          <Link to="/admin/orders">View Orders</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
