import { useEffect, useState } from "react";
import api from "../api/api";

function Categories({ onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {categories.map(cat => (
        <button key={cat.id} onClick={() => onSelect(cat.id)}>
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
