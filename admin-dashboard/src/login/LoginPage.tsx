import axios from "axios";
import React, { useState } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async (formData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/LoginAdminDanDokter",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await login(formData);

      if (response.data.role === "admin") {
        localStorage.setItem("adminId", response.data.adminId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        console.log("Login successful:", response.data.message);
        window.location.href = "/Home";
        
      } else {
        localStorage.setItem("dokterId", response.data.dokterId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        console.log("Login successful:", response.data.message);
        window.location.href = "/Home";
      }

      // Lakukan navigasi atau tindakan lain setelah login berhasil
    } catch (error) {
      console.error("Error logging in:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika diperlukan
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="email"
              id="email"
              name="email" // Tambahkan properti name
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="password"
              id="password"
              name="password" // Tambahkan properti name
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
