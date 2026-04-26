import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../services/api.js";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await API.get("/offers");
        setOffers(data);
      } catch (err) {
        setError("Cannot load offers. Make sure backend is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleApply = async (offerId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must login first.");
      navigate("/login");
      return;
    }

    try {
      await API.post("/applications", {
        offerId,
        motivation: "I am interested in this internship.",
        cvUrl: "https://example.com/my-cv.pdf",
      });

      alert("Application submitted successfully ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Application failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-600">Loading offers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Internship Offers
      </h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {offers.length === 0 && !error && (
        <p className="text-gray-500">No offers found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.id} className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              {offer.title}
            </h2>

            <p className="mt-2 text-gray-600">{offer.description}</p>

            <div className="mt-3 text-sm text-gray-500">
              <p>📍 {offer.location}</p>
              <p>🏢 {offer.company?.name || "Unknown company"}</p>
              <p>💼 {offer.type}</p>
              <p>💰 {offer.salaryOptional || "Not specified"}</p>
            </div>

           <Link
  to={`/offers/${offer.id}`}
  className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
>
  View Details
</Link>
           
          </div>
        ))}
      </div>
    </div>
  );
}