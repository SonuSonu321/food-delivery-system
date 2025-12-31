function Home() {
  return (
    <div style={styles.home}>
      <div style={styles.overlay}>
        <h1>Welcome to Our Restaurant 🍽️</h1>
        <p>Select menu to order delicious food.</p>
      </div>
    </div>
  );
}

export default Home;

const styles = {
  home: {
    backgroundImage:
      "url('https://furoore.com/wp-content/uploads/2022/06/food-styling.jpg')",
    backgroundSize: "cover",        // image covers whole screen
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",                // full viewport height
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)", // dark overlay for readability
    padding: "30px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
  },
};
