import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const { data } = await API.get("/companies");
      setCompanies(data);
    } catch (err) {
      setError("Cannot load companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/companies", {
        name,
        description,
        location,
      });

      setName("");
      setDescription("");
      setLocation("");
      fetchCompanies();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Companies</h1>

      <form onSubmit={handleCreate} className="mb-6 rounded bg-white p-4 shadow">
        <input
          type="text"
          placeholder="Company name"
          className="mr-2 border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="mr-2 border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="mr-2 border p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Create
        </button>
      </form>

      <div className="grid gap-4">
        {companies.map((c) => (
          <div
            key={c.id}
            className="flex justify-between rounded bg-white p-4 shadow"
          >
            <div>
              <h2 className="font-bold">{c.name}</h2>
              <p>{c.description}</p>
              <p>{c.location}</p>
            </div>

            <button
              onClick={() => handleDelete(c.id)}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}