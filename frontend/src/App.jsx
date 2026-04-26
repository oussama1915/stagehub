import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Offers from "./pages/Offers.jsx";
import OfferDetails from "./pages/OfferDetails.jsx";
import MyApplications from "./pages/MyApplications.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCompanies from "./pages/AdminCompanies.jsx";
import AdminOffers from "./pages/AdminOffers.jsx";
import AdminApplications from "./pages/AdminApplications.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offers/:id" element={<OfferDetails />} />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute roleRequired="USER">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminCompanies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/offers"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminOffers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminApplications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;