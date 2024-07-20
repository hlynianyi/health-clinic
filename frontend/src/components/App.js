import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import NavBar from "./Navigation/Navbar";
import HomePage from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import RegisterDoctor from "./pages/Admin/RegisterDoctor";
import Doctors from "./pages/Doctors"; // Импортируем компонент Doctors
import Footer from "./Navigation/Footer";
import Services from "./pages/Services";
import Diagnostic from "./pages/Diagnostic";
import Offers from "./pages/Offers";
import Patients from "./pages/Patients";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import { AuthProvider, useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
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
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/diagnostics" element={<Diagnostic />} />
            <Route path="/promotions" element={<Offers />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
