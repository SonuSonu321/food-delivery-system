import axios from "axios";

// ❌ NO TOKEN
// ❌ NO INTERCEPTOR
// ✅ PURE GUEST API

const orderApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default orderApi;
