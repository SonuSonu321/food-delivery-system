import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await adminApi.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("ORDER LOAD ERROR", err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading orders...</h3>;

  return (
    <div style={{ padding: "30px", background: "#fff", minHeight: "100vh" }}>
      <h1>📦 Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>₹ {order.totalAmount}</td>
                <td>{order.status || "NEW"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
