import { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    // important : force le rechargement pour que Navbar relise localStorage
    window.location.href = "/";
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-96 rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Login</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}