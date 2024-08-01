import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CombinedNavbar from "./NavbarCombined"; // Импортируйте этот компонент

const DashnoardButtonHidden = () => <div className="hidden"></div>;

const Header = () => {
  const { isAuthenticated } = useAuth();
  // console.log("isAuthenticated :>> ", isAuthenticated);
  const navigate = useNavigate();

  return (
    <>
      <CombinedNavbar />
    </>
  );
};

export default Header;

/**
 * border-t-[4px] border-purple tablet:border-red laptop:border-blue desktop:border-yellow large:border-maingreen
 */
