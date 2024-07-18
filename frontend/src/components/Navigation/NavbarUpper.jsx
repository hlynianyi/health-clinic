import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/PhoneIphoneRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { orange, grey, blue } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import navbarLogo from "../../assets/logo3.webp";

const whiteGrey = grey["A100"];
const navbarBlue = blue["A200"];

const ColorButton = styled(Button)(({ theme }) => ({
  height: 45,
  color: whiteGrey,
  backgroundColor: "#28926E",
  "&:hover": {
    backgroundColor: "#1976D2",
  },
  fontSize: 14,
}));

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, Arial, sans-serif",
    color: "blue",
  },
});

const NavbarUpper = () => {
  return (
    <AppBar color="default" position="static" sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Box
            component="img"
            src={navbarLogo}
            alt="Clinic Logo"
            sx={{ height: 45, backgroundColor: "transparent" }}
          />
          <ThemeProvider theme={theme}>
            <div className="flex flex-col nowrap font-normal font-montserrat text-mainblue">
              <p>Медицинский центр</p>
              <p>на Демидова</p>
            </div>
          </ThemeProvider>
        </Box>
        <Grid ml={2} container alignItems="center" sx={{ width: "auto" }}>
          <Grid item mr={0}>
            <PhoneIcon fontSize="large" style={{ color: "#B8BAB9" }} />
          </Grid>
          <Grid item>
            <Box ml={0}>
              <p className="font-light font-montserrat text-gray-100 text-xs">
                Круглосуточная запись по телефону:
              </p>
              <p className="flex justify-start">+7 (495) 187-88-36</p>
            </Box>
          </Grid>
          <Grid item ml={2}>
            <ColorButton startIcon={<AssignmentIcon />} variant="">
              Записаться онлайн
            </ColorButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarUpper;
