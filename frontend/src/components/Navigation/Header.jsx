import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CombinedNavbar from "./NavbarCombined"; // Импортируйте этот компонент

const DashnoardButtonHidden = () => <div className="hidden"></div>;

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="bg-bgdarkgray grow py-1 px-1 tablet:px-4 laptop:px-8 desktop:px-16 flex justify-start">
          {isAuthenticated ? (
            <Button
              style={{
                color: "#fff",
                backgroundColor: "#28926E",
                fontSize: 12,
              }}
              onClick={() => navigate("/dashboard")}
            >
              Панель администратора
            </Button>
          ) : (
            <DashnoardButtonHidden />
          )}
        </div>
      </div>
      <CombinedNavbar />
    </header>
  );
};

export default Header;
