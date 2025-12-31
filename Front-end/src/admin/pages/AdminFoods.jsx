import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= LOAD =================
  const loadData = async () => {
    try {
      setLoading(true);

      const foodsRes = await adminApi.get("/foods");
      const catRes = await adminApi.get("/categories");

      setFoods(foodsRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= ADD / UPDATE =================
  const handleSave = async () => {
    if (!name || !price || !categoryId) {
      alert("All fields required");
      return;
    }

    // 🔥 THIS MATCHES FoodRequest
    const payload = {
      name,
      price,
      imageUrl,
      categoryId,
    };

    try {
      if (editId) {
        await adminApi.put(`/foods/${editId}`, payload);
      } else {
        await adminApi.post("/foods", payload);
      }

      resetForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (food) => {
    setEditId(food.id);
    setName(food.name);
    setPrice(food.price);
    setImageUrl(food.imageUrl || "");
    setCategoryId(food.category?.id || "");
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {
      await adminApi.delete(`/foods/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setImageUrl("");
    setCategoryId("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🍔 Manage Foods</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ marginLeft: "10px", width: "250px" }}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button onClick={handleSave} style={{ marginLeft: "10px" }}>
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button onClick={resetForm} style={{ marginLeft: "5px" }}>
            Cancel
          </button>
        )}
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : foods.length === 0 ? (
        <p>No foods found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>{food.id}</td>
                <td>{food.name}</td>
                <td>₹ {food.price}</td>
                <td>{food.category?.name}</td>
                <td>
                  <button onClick={() => handleEdit(food)}>Edit</button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    style={{ marginLeft: "8px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminFoods;
