import { useEffect, useState } from "react";
import api from "../api/api";

function Foods({ categoryId }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const url = categoryId
      ? `/foods/category/${categoryId}`
      : `/foods`;

    api.get(url)
      .then(res => {
        console.log("API DATA 👉", res.data);
        setFoods(res.data);
      })
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div>
      <h2>Foods</h2>

      {foods.map(food => (
        <div key={food.id} className="card">
          <h3>{food.name}</h3>
          <p>₹ {food.price}</p>
          <img src={food.imageUrl} width="1" />
          <p>{food.category?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Foods;
