import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavbarUpper from "./NavbarUpper";
import NavbarLower from "./NavbarLower";
import CombinedNavbar from "./CombinedNav"; // Импортируйте этот компонент

// todo: сделать респонсив без МУИ и мобильный падинг 16пх
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  fontSize: 14,
}));

const NavBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="border-4 border-purple tablet:border-red laptop:border-blue desktop:border-yellow large:border-maingreen">
      <AppBar position="static">
        <Box>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Выйти
            </Button>
          ) : (
            <ColorButton onClick={() => navigate("/admin")}>Войти</ColorButton>
          )}
        </Box>
        {isSmallScreen ? (
          <CombinedNavbar />
        ) : (
          <>
            <NavbarUpper />
            <NavbarLower />
          </>
        )}
      </AppBar>
    </div>
  );
};

export default NavBar;
