import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// ================= USER PAGES =================
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

// ================= ADMIN PAGES =================
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminCategories from "./admin/pages/AdminCategories";
import AdminFoods from "./admin/pages/AdminFoods";
import AdminOrders from "./admin/pages/AdminOrders";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => [...prev, food]);
  };

  return (
    <BrowserRouter>
      {/* 🔹 Navbar har page pe dikhega */}
      <Navbar />

      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminProtectedRoute>
              <AdminCategories />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/foods"
          element={
            <AdminProtectedRoute>
              <AdminFoods />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
