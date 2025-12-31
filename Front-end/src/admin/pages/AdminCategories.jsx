import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= LOAD =================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("FETCH ERROR", err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= ADD / UPDATE =================
  const handleSave = async () => {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await adminApi.put(`/categories/${editId}`, { name });
      } else {
        // ADD
        await adminApi.post("/categories", { name });
      }

      setName("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error("SAVE ERROR", err);
      alert("Save failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await adminApi.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("DELETE ERROR", err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px", background: "#fff", minHeight: "100vh" }}>
      <h1>📂 Manage Categories</h1>

      {/* INPUT SECTION */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />

        <button
          onClick={handleSave}
          style={{
            marginLeft: "10px",
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setName("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* LIST SECTION */}
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <button onClick={() => handleEdit(cat)}>Edit</button>
                  <button
                    onClick={() => handleDelete(cat.id)}
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

export default AdminCategories;
