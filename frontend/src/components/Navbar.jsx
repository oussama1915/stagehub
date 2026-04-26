import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      role = decoded.role;
    } catch (error) {
      console.error("Invalid token");
      role = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // refresh + redirect
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <h1 className="text-xl font-bold">StageHub</h1>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:underline">
          Offers
        </Link>

        {!token ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>

            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* USER */}
            {role === "USER" && (
              <Link to="/my-applications" className="hover:underline">
                My Applications
              </Link>
            )}

            {/* ADMIN */}
            {role === "ADMIN" && (
              <>
                <Link to="/admin" className="hover:underline">
                  Dashboard
                </Link>

                <Link to="/admin/companies" className="hover:underline">
                  Companies
                </Link>

                <Link to="/admin/offers" className="hover:underline">
                  createOffers
                </Link>

                <Link to="/admin/applications" className="hover:underline">
                  Applications
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-3 py-1 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}