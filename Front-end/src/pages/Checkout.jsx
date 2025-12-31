import { useState } from "react";
import orderApi from "../api/orderApi";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handlePlaceOrder = async () => {
    if (!customerName || !mobile || !address) {
      alert("Please fill required fields");
      return;
    }

    const orderData = {
      customerName,
      email,
      mobile,
      address,
      totalAmount,
      items: cart.map((item) => ({
        foodName: item.name,
        price: item.price,
        quantity: 1,
      })),
    };

    try {
      await orderApi.post("/orders", orderData);
      alert("Order placed successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Checkout</h2>

      <input
        placeholder="Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />

      <h3>Total: ₹ {totalAmount}</h3>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
