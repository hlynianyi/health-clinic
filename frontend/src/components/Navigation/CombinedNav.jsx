import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { green, grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import navbarLogo from "../../assets/logo3.webp";
// import { useAuth } from "../../context/AuthContext";

const whiteGrey = grey["A100"];

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

const ColorButton = styled(Button)(({ theme }) => ({
  color: whiteGrey,
  backgroundColor: theme.palette.warning.light,
  "&:hover": {
    backgroundColor: theme.palette.warning.main,
  },
  fontSize: 14,
}));

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

const CombinedNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="default" position="static" sx={{ boxShadow: "none" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: "4px 4px",
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src={navbarLogo}
            alt="Clinic Logo"
            sx={{ height: 50, backgroundColor: "transparent" }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center">
            <PhoneIcon fontSize="small" />
            <Typography variant="subtitle2" fontWeight="">
              +7 (495) 187-88-36
            </Typography>
          </Box>
          <ColorButton startIcon={<AssignmentIcon />} variant="">
            {isSmallScreen ? <p>Записаться</p> : <p>Записаться онлайн</p>}
          </ColorButton>
          <IconButton>
            <MenuIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></MenuIcon>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleNavigation("/")}>
              <HomeButton color="primary" aria-label="home">
                <HomeIcon />
              </HomeButton>
            </MenuItem>
            {MENU.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CombinedNavbar;
