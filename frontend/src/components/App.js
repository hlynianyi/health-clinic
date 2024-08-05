import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "./Navigation/NavbarCombined";
import HomePage from "./pages/Home/Home";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import RegisterDoctor from "./pages/Admin/RegisterDoctor";
import Doctors from "./pages/Doctor/Doctors";
import Footer from "./Navigation/Footer";
import Services from "./pages/Services";
import Diagnostic from "./pages/Diagnostic";
import Offers from "./pages/Offers";
import Patients from "./pages/Patients";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import License from "./pages/License";
import DoctorDetails from "./pages/Doctor/DoctorDetails";
import Booking from "./pages/Booking/Booking";
import BookingDetails from "./pages/Booking/BookingDetails";
import ManageReviews from "./pages/Admin/ManageReviews";
import ManageDoctors from "./pages/Admin/ManageDoctors";
import ManageLicenses from "./pages/Admin/ManageLicenses";
import ManageServices from "./pages/Admin/ManageServices";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import { AuthProvider } from "../context/AuthContext"; // useAuth

// todo: Логин докторов(UserLogin), страница для каждого доктора с возможностью брони визита

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Header />
          <main className="flex flex-col grow py-4 px-1 tablet:px-4 tablet:pt-0 tablet laptop:px-8 desktop:px-16 large:px-64 font-montserrat text-base">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/login" element={<UserLogin />} /> */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register-doctor"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <RegisterDoctor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-doctors"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ManageDoctors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-reviews"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ManageReviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-licenses"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ManageLicenses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-services"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ManageServices />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route
                path="/doctor-dashboard/:id"
                element={<DoctorDashboard />}
              />

              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:id" element={<DoctorDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/diagnostics" element={<Diagnostic />} />
              <Route path="/promotions" element={<Offers />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/license" element={<License />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/:id" element={<BookingDetails />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
