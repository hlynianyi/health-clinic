import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavBar from "./components/Navigation/Navbar";
import HomePage from "./components/Home";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import RegisterDoctor from "./components/RegisterDoctor";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
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
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
