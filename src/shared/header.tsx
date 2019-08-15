import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import FitbitLogo from "../assets/fitbitlogo.png";
import AuthButton from "../modules/auth/authButton";

const Header: React.FC = () => {
  return (
    <div>
      <Navbar color="light" light>
        <img
          src={FitbitLogo}
          alt="Fitbit Logo"
          style={{ width: 40, height: 40, margin: 5 }}
        />
        <NavbarBrand href="/home" className="mr-auto">
          Fitbit Data Logging
        </NavbarBrand>
        <AuthButton />
      </Navbar>
    </div>
  );
};
export default Header;
