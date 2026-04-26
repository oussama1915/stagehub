import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api.js";

export default function OfferDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState(null);
  const [motivation, setMotivation] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const { data } = await API.get(`/offers/${id}`);
        setOffer(data);
      } catch (err) {
        setError(err.response?.data?.message || "Cannot load offer");
      }
    };

    fetchOffer();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/applications", {
        offerId: Number(id),
        motivation,
        cvUrl,
      });

      alert("Application submitted successfully ✅");
      navigate("/my-applications");
    } catch (err) {
      alert(err.response?.data?.message || "Application failed");
    }
  };

  if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
  }

  if (!offer) {
    return <p className="p-8 text-gray-600">Loading offer...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-800">{offer.title}</h1>

        <p className="mt-4 text-gray-600">{offer.description}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p>🏢 {offer.company?.name}</p>
          <p>📍 {offer.location}</p>
          <p>💼 {offer.type}</p>
          <p>💰 {offer.salaryOptional || "Not specified"}</p>
        </div>

        <hr className="my-6" />

        <form onSubmit={handleApply}>
          <h2 className="mb-4 text-2xl font-bold">Apply for this internship</h2>

          <textarea
            placeholder="Write your motivation..."
            className="mb-4 h-32 w-full rounded border p-3 outline-none focus:border-blue-500"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="CV URL"
            className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
          />

          <button className="rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}