import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MENU = [
  { label: "Врачи", path: "/doctors" },
  { label: "Услуги", path: "/services" },
  { label: "Диагностика", path: "/diagnostics" },
  { label: "Акции", path: "/promotions" },
  { label: "Пациентам", path: "/patients" },
  { label: "Лицензии", path: "/license" },
  { label: "Отзывы", path: "/reviews" },
  { label: "Контакты", path: "/contacts" },
];

const NavbarLower = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (path) => {
    setCurrentActiveTab(path);
    navigate(path);
  };

  return (
    <div className="bg-mainblue w-full text-white">
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
                color: "white",
                backgroundColor:
                  currentActiveTab === item.path ? "#FFA500" : "transparent", // bg-red -> #FF0000
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
