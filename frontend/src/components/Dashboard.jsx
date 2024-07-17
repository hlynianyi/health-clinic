import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4">Панель управления</Typography>
      <Button variant="contained" onClick={() => navigate("/register-doctor")}>
        Зарегистрировать врача
      </Button>
      <Button variant="contained" color="secondary" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
};

export default Dashboard;
