import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import FitbitLogo from "../assets/fitbitlogo.png";
import { clientId, clientSecret } from "../config";
import { fetchData } from "../api/api";
import { base64Encoding } from "../util/base64Encoding";
import AuthButton from "../modules/auth/authButton";

const Header: React.FC = (props: any) => {
  const openAuthenticationUsingFitbit = () => {
    const url =
      "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DNVH&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=31536000";
    window.open(url, "_self");
  };

  return (
    <div>
      <Navbar color="faded" light>
        <img
          src={FitbitLogo}
          alt="Fitbit Logo"
          style={{ width: 40, height: 40, margin: 5 }}
        />
        <NavbarBrand href="/" className="mr-auto">
          Fitbit Data Logging
        </NavbarBrand>
        <AuthButton />   
      </Navbar>
    </div>
  );
};
export default Header;
