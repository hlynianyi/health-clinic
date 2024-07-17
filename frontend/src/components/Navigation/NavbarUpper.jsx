import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/CallEnd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { orange, grey } from "@mui/material/colors";

const whiteGrey = grey["A100"];

const ColorButton = styled(Button)(({ theme }) => ({
  color: whiteGrey,
  backgroundColor: theme.palette.warning.light,
  "&:hover": {
    backgroundColor: theme.palette.warning.main,
  },
  fontSize: 14,
}));

const NavbarUpper = () => {
  return (
    <AppBar color="default" position="static" sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box gap={2} display="flex">
          <Typography alignContent="center" variant="h6" component="span">
            Клиника Здоровья
          </Typography>
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
          </Grid>
        </Box>

        <ColorButton startIcon={<AssignmentIcon />} variant="">
          Записаться онлайн
        </ColorButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarUpper;
