import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/CallEnd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { orange, grey, blue } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import navbarLogo from "../../assets/logo3.webp";

const whiteGrey = grey["A100"];
const navbarBlue = blue["A200"];

const ColorButton = styled(Button)(({ theme }) => ({
  color: whiteGrey,
  backgroundColor: theme.palette.warning.light,
  "&:hover": {
    backgroundColor: theme.palette.warning.main,
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
            sx={{ height: 35, backgroundColor: "transparent" }}
          />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography
              alignContent="center"
              variant="h5"
              component="span"
              color={navbarBlue}
            >
              MEDICARE
            </Typography>
          </ThemeProvider>
        </Box>
        <Grid ml={2} container alignItems="center" sx={{ width: "auto" }}>
          <Grid item mr={1}>
            <PhoneIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Box ml={1}>
              <Typography variant="subtitle2">
                Круглосуточная запись по телефону:
              </Typography>
              <Typography variant="h7" fontWeight="bold">
                +7 (495) 187-88-36
              </Typography>
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
