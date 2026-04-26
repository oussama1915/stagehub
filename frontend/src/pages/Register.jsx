import { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="w-96 rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Register</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <input
          name="name"
          type="text"
          placeholder="Name"
          className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          value={form.password}
          onChange={handleChange}
        />

        <button className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}