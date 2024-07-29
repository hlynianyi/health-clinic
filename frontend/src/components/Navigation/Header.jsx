import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CombinedNavbar from "./NavbarCombined"; // Импортируйте этот компонент

const DashnoardButtonHidden = () => <div className="hidden"></div>;

const Header = () => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated :>> ', isAuthenticated);
  const navigate = useNavigate();

  return (
    <header className="border-t-[4px] border-purple tablet:border-red laptop:border-blue desktop:border-yellow large:border-maingreen">
      <div className="flex justify-between items-center">
        <div className="bg-bgdarkgray grow py-1 px-2  flex justify-end">
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
