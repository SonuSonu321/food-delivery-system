import { useEffect, useState } from "react";
import api from "../api/api";

function Menu({ addToCart }) {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔹 Track quantity per food
  const [quantities, setQuantities] = useState({});

  // 🔹 Load categories
  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Load foods
  useEffect(() => {
    const url = selectedCategory
      ? `/foods/category/${selectedCategory}`
      : `/foods`;

    api.get(url)
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, [selectedCategory]);

  // 🔹 Add to cart + increase quantity
  const handleAddToCart = (food) => {
    addToCart(food);

    setQuantities(prev => ({
      ...prev,
      [food.id]: (prev[food.id] || 0) + 1
    }));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* LEFT: Categories */}
      <div style={{ width: "25%", padding: "10px", borderRight: "1px solid #ccc" }}>
        <h2>Categories</h2>

        <button
          onClick={() => setSelectedCategory(null)}
          style={{ display: "block", margin: "5px", width: "100%" }}
        >
          All
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ display: "block", margin: "5px", width: "100%" }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* RIGHT: Foods */}
      <div style={{ width: "75%", padding: "10px" }}>
        <h2>Foods</h2>

        {foods.length === 0 && <p>No foods found</p>}

        {foods.map(food => (
          <div
            key={food.id}
            style={{
              display: "flex",
              border: "1px solid #ddd",
              marginBottom: "15px",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >
            {/* LEFT: IMAGE (50%) */}
            <div style={{ width: "50%", background: "#000" }}>
              <img
                src={food.imageUrl}
                alt={food.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* RIGHT: DETAILS (50%) */}
            <div style={{ width: "50%", padding: "15px" }}>
              <h3>{food.name}</h3>
              <p>Price: ₹ {food.price}</p>
              <p>Category: {food.category?.name}</p>

              <button onClick={() => handleAddToCart(food)}>
                Add to Cart
              </button>

              {/* 🔹 Quantity display */}
              {quantities[food.id] > 0 && (
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Quantity Selected: {quantities[food.id]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
