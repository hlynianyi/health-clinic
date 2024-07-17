import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import { orange, green } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MENU = [
  { label: "Врачи", path: "/doctors" },
  { label: "Услуги", path: "/services" },
  { label: "Диагностика", path: "/diagnostics" },
  { label: "Анализы", path: "/tests" },
  { label: "Акции", path: "/promotions" },
  { label: "Пациентам", path: "/patients" },
  { label: "Отзывы", path: "/reviews" },
  { label: "Контакты", path: "/contacts" },
];

const NavbarButton = styled(Button)(({ theme }) => ({
  color: "inherit",
  "&:hover": {
    backgroundColor: green[100],
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const HomeButton = styled(IconButton)(({ theme }) => ({
  color: "inherit",
  "&:hover": {
    backgroundColor: green[100],
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

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
    <AppBar
      color="transparent"
      position="static"
      sx={{ boxShadow: "none",  }}
    >
      <Toolbar
        sx={{
          justifyContent: isSmallScreen ? "space-between" : "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <HomeButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => handleNavigation("/")}
            sx={{
              display: "flex",
              backgroundColor:
                currentActiveTab === "/" ? "warning.light" : "transparent",
            }}
          >
            <HomeIcon />
          </HomeButton>
          {MENU.map((item) => (
            <NavbarButton
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              sx={{
                backgroundColor:
                  currentActiveTab === item.path
                    ? "warning.light"
                    : "transparent",
              }}
            >
              {item.label}
            </NavbarButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarLower;
