function FoodCard({ food, addToCart }) {
  return (
    <div className="card">
      <img src={food.imageUrl} alt={food.name} />
      <h3>{food.name}</h3>
      <p>₹{food.price}</p>
      <button onClick={() => addToCart(food)}>
        Add to Cart
      </button>
    </div>
  );
}
export default FoodCard;
