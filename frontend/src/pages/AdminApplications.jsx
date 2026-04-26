import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const { data } = await API.get("/applications");
      setApplications(data);
    } catch (err) {
      setError(err.response?.data?.message || "Cannot load applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/applications/${id}/status`, { status });
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Applications</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {applications.length === 0 && !error && (
        <p className="text-gray-500">No applications found.</p>
      )}

      <div className="grid gap-4">
        {applications.map((app) => (
          <div key={app.id} className="rounded bg-white p-5 shadow">
            <h2 className="text-xl font-bold">{app.offer?.title}</h2>

            <p className="text-gray-600">{app.offer?.description}</p>

            <div className="mt-3 text-sm text-gray-600">
              <p>👤 User: {app.user?.name} ({app.user?.email})</p>
              <p>🏢 Company: {app.offer?.company?.name}</p>
              <p>📍 Location: {app.offer?.location}</p>
              <p>📌 Current status: <strong>{app.status}</strong></p>
              <p>📝 Motivation: {app.motivation}</p>
              {app.cvUrl && (
                <p>
                  📄 CV:{" "}
                  <a
                    href={app.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open CV
                  </a>
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleStatusChange(app.id, "PENDING")}
                className="rounded bg-yellow-500 px-3 py-1 text-white"
              >
                Pending
              </button>

              <button
                onClick={() => handleStatusChange(app.id, "ACCEPTED")}
                className="rounded bg-green-600 px-3 py-1 text-white"
              >
                Accept
              </button>

              <button
                onClick={() => handleStatusChange(app.id, "REJECTED")}
                className="rounded bg-red-600 px-3 py-1 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}