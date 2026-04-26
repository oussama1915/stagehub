import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/stats");
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Cannot load admin stats");
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Users</p>
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Companies</p>
          <h2 className="text-3xl font-bold">{stats.totalCompanies}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Offers</p>
          <h2 className="text-3xl font-bold">{stats.totalOffers}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Applications</p>
          <h2 className="text-3xl font-bold">{stats.totalApplications}</h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Applications Status</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded bg-yellow-100 p-4">
            <p className="text-gray-600">Pending</p>
            <h3 className="text-2xl font-bold">
              {stats.applicationStatusStats?.pending}
            </h3>
          </div>

          <div className="rounded bg-green-100 p-4">
            <p className="text-gray-600">Accepted</p>
            <h3 className="text-2xl font-bold">
              {stats.applicationStatusStats?.accepted}
            </h3>
          </div>

          <div className="rounded bg-red-100 p-4">
            <p className="text-gray-600">Rejected</p>
            <h3 className="text-2xl font-bold">
              {stats.applicationStatusStats?.rejected}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}