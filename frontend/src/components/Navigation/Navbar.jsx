import React from "react";
// import { Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import NavbarUpper from "./NavbarUpper";
import NavbarLower from "./NavbarLower";
import CombinedNavbar from "./CombinedNav"; // Импортируйте этот компонент

const NavBar = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  // const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate();

  return (
    <div className="">
        {/* <div className="flex justify-between items-center">
          <div>
            {isAuthenticated ? (
              <Button color="inherit" onClick={logout}>
                Выйти
              </Button>
            ) : (
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#0273BF",
                  fontSize: 14,
                }}
                onClick={() => navigate("/admin")}
              >
                Войти
              </Button>
            )}
          </div>
        </div> */}
        <CombinedNavbar />
        {/* {isSmallScreen ? (
          <CombinedNavbar />
        ) : (
          <>
            <NavbarUpper />
            <NavbarLower />
          </>
        )} */}
    </div>
  );
};

export default NavBar;
