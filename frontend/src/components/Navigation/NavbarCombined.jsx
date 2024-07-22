import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLower from "./NavbarLower";
import navbarLogo from "../../assets/logo3.png";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { PhoneIcon } from "../../assets/PhoneIcon";

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

const ColorButton = styled(Button)(({ theme }) => ({
  height: 40,
  color: "#FFFF",
  backgroundColor: "#28926E",
  "&:hover": {
    backgroundColor: "#1976D2",
  },
  fontSize: 12,
}));

const CombinedNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 490);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsPhoneScreen(window.innerWidth < 490);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="bg-bggray shadow-none border-b-[10px] border-purple tablet:border-red laptop:border-blue desktop:border-yellow large:border-maingreen">
      <div className="flex justify-between items-center p-1 tablet:px-4 laptop:px-8 desktop:px-16 large:px-64">
        <div className="flex items-center">
          <img
            src={navbarLogo}
            alt="Clinic Logo"
            className="h-10 rounded-lg cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="hidden md:flex flex-col nowrap font-semibold font-montserrat text-maingreen">
            <h2 className="leading-5">
              Медицинский центр
              <br /> на Демидова
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 tablet:gap-6">
          <div className="mr-1 flex items-center gap-1">
            <div className="mr-1">
              <PhoneIcon />
            </div>
            <div className="flex flex-col">
              <p className="font-sans text-gray-600 text-xs">
                {isPhoneScreen ? "" : "Круглосуточная запись:"}
              </p>
              <p className="font-montserrat text-sm">+7 (495) 187-88-36</p>
            </div>
          </div>
          <div className={`${isSmallScreen ? "block" : "hidden"}`}>
            <IconButton onClick={handleClick}>
              <MenuIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                style: {
                  width: "100%",
                  left: 0,
                  right: 0,
                  top: "0px", // Adjust if needed based on your app bar height
                  position: "fixed",
                  backgroundColor: "#fff", // or any other color you prefer
                },
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {MENU.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="flex justify-center"
                  sx={{ justifyContent: "center" }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <ColorButton startIcon={<AssignmentIcon />} variant="">
            {isSmallScreen ? <p>Записаться</p> : <p>Записаться онлайн</p>}
          </ColorButton>
        </div>
      </div>
      <div className="hidden md:block">
        <NavbarLower />
      </div>
    </div>
  );
};

export default CombinedNavbar;
