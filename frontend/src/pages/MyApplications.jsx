import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../services/api.js";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);

    if (decoded.role !== "USER") {
      navigate("/admin");
      return;
    }

    const fetchApplications = async () => {
      try {
        const { data } = await API.get("/applications/me");
        setApplications(data);
      } catch (err) {
        setError(err.response?.data?.message || "Cannot load applications");
      }
    };

    fetchApplications();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        My Applications
      </h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {applications.length === 0 && !error && (
        <p className="text-gray-500">No applications yet.</p>
      )}

      <div className="grid gap-4">
        {applications.map((app) => (
          <div key={app.id} className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              {app.offer?.title}
            </h2>

            <p className="mt-2 text-gray-600">{app.offer?.description}</p>

            <div className="mt-3 text-sm text-gray-500">
              <p>🏢 {app.offer?.company?.name}</p>
              <p>📍 {app.offer?.location}</p>
              <p>💼 {app.offer?.type}</p>
              <p>
                📌 Status:{" "}
                <span className="font-semibold text-blue-600">
                  {app.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}