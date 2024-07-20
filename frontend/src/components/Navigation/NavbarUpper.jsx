import React from "react";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AssignmentIcon from "@mui/icons-material/Assignment";
import navbarLogo from "../../assets/logo3.png";
import { PhoneIcon } from "../../assets/PhoneIcon";

const ColorButton = styled(Button)(({ theme }) => ({
  height: 45,
  color: "#FFFFFF",
  backgroundColor: "#28926E",
  "&:hover": {
    backgroundColor: "#1976D2",
  },
  fontSize: 14,
}));

const NavbarUpper = () => {
  return (
    <div className="bg-white w-full shadow-none">
      <div className="flex justify-between items-center p-1 tablet:px-4 laptop:px-8 desktop:px-16 large:px-64">
        <div className="flex items-center gap-2">
          <img
            src={navbarLogo}
            alt="Clinic Logo"
            className="h-12 bg-transparent"
          />
          <div className="flex flex-col nowrap font-semibold font-montserrat text-maingreen">
            <p>Медицинский центр</p>
            <p>на Демидова</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="mr-1">
              <PhoneIcon />
            </div>
            <div className="flex flex-col">
              <p className="font-light font-sans text-gray-600 text-xs">
                Круглосуточная запись по телефону:
              </p>
              <p className="text-lg">+7 (495) 187-88-36</p>
            </div>
          </div>
          <ColorButton startIcon={<AssignmentIcon />} variant="">
            Записаться онлайн
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default NavbarUpper;
