import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "HYBRID",
    salary: "",
    companyId: "",
  });

  const fetchData = async () => {
    const offersRes = await API.get("/offers");
    const companiesRes = await API.get("/companies");

    setOffers(offersRes.data);
    setCompanies(companiesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/offers", {
        title: form.title,
        description: form.description,
        location: form.location,
        type: form.type,
        salary: Number(form.salary),
        companyId: Number(form.companyId),
      });

      setForm({
        title: "",
        description: "",
        location: "",
        type: "HYBRID",
        salary: "",
        companyId: "",
      });

      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Create offer failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/offers/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Offers</h1>

      <form onSubmit={handleCreate} className="mb-6 rounded bg-white p-4 shadow">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            name="title"
            placeholder="Title"
            className="border p-2"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            className="border p-2"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            className="border p-2"
            value={form.location}
            onChange={handleChange}
          />

          <select
            name="type"
            className="border p-2"
            value={form.type}
            onChange={handleChange}
          >
            <option value="REMOTE">REMOTE</option>
            <option value="ONSITE">ONSITE</option>
            <option value="HYBRID">HYBRID</option>
          </select>

          <input
            name="salary"
            placeholder="Salary"
            type="number"
            className="border p-2"
            value={form.salary}
            onChange={handleChange}
          />

          <select
            name="companyId"
            className="border p-2"
            value={form.companyId}
            onChange={handleChange}
          >
            <option value="">Select company</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
          Create Offer
        </button>
      </form>

      <div className="grid gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex justify-between rounded bg-white p-4 shadow"
          >
            <div>
              <h2 className="font-bold">{offer.title}</h2>
              <p>{offer.description}</p>
              <p className="text-sm text-gray-600">📍 {offer.location}</p>
              <p className="text-sm text-gray-600">🏢 {offer.company?.name}</p>
              <p className="text-sm text-gray-600">💼 {offer.type}</p>
              <p className="text-sm text-gray-600">
                💰 {offer.salaryOptional || "Not specified"}
              </p>
            </div>

            <button
              onClick={() => handleDelete(offer.id)}
              className="h-10 rounded bg-red-500 px-3 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}