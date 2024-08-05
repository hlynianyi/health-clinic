import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MENU = [
  { label: "Врачи", path: "/doctors" },
  { label: "Услуги и цены", path: "/services" },
  // { label: "Диагностика", path: "/diagnostics" },
  { label: "Акции", path: "/promotions" },
  { label: "Пациентам", path: "/patients" },
  { label: "Лицензии", path: "/license" },
  { label: "Отзывы", path: "/reviews" },
  { label: "Контакты", path: "/contacts" },
];

const NavbarLower = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const found = MENU.find((item) => item.path === location.pathname);
    if (found) {
      setCurrentActiveTab(found.path);
    } else {
      setCurrentActiveTab("");
    }
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-bgdarkgray w-full text-white">
      <div
        className={`flex ${
          isSmallScreen ? "justify-between" : "justify-center"
        } items-center py-2 px-4`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <IconButton
            sx={{
              color: "#FFFF",
              backgroundColor:
                currentActiveTab === "/" ? "#FFA500" : "transparent",
              "&:hover": {
                backgroundColor: "#FFFF",
                color: "#28926E",
              },
            }}
            aria-label="home"
            onClick={() => handleNavigation("/")}
          >
            <HomeIcon />
          </IconButton>
          {MENU.map((item) => (
            <Button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              sx={{
                color: currentActiveTab === item.path ? "black" : "white",
                backgroundColor:
                  currentActiveTab === item.path ? "#FFFF" : "transparent",
                "&:hover": {
                  backgroundColor: "#FFFF",
                  color: "#28926E",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarLower;
