import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    logout();
    navigate("/admin");
  };

  return (
    <div className="flex flex-col grow">
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления сайтом
      </h2>
      <div className="px-6 flex flex-col w-[350px] justify-between gap-3">
        <Button
          variant="contained"
          onClick={() => navigate("/register-doctor")}
        >
          Зарегистрировать доктора
        </Button>
        <Button variant="contained" onClick={() => navigate("/manage-doctors")}>
          Управлять докторами
        </Button>
        <Button variant="contained" onClick={() => navigate("/manage-reviews")}>
          Управлять отзывами о сайте
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
