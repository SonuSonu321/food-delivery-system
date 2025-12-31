import { useNavigate } from "react-router-dom";

function Cart({ cart }) {
  const navigate = useNavigate();

  // 🔹 group items by id and count quantity
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // 🔹 calculate total price
  const totalPrice = groupedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {groupedCart.length === 0 && <p>Cart is empty</p>}

      {groupedCart.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <h4>{item.name}</h4>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>
            Subtotal: ₹{item.price * item.quantity}
          </p>
        </div>
      ))}

      {groupedCart.length > 0 && (
        <>
          <h3>Total Price: ₹{totalPrice}</h3>

          {/* ✅ CHECKOUT BUTTON */}
          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
