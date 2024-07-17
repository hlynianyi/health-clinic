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
import HomePage from "./Home";
import LoginPage from "./LoginPage";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Dashboard";
import RegisterDoctor from "./RegisterDoctor";
import Doctors from "./Doctors"; // Импортируем компонент Doctors
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
            <Route path="/login" element={<LoginPage />} />
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
            <Route path="/doctors" element={<Doctors />} /> {/* Добавляем маршрут для Doctors */}
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
