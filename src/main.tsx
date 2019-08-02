import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import FitbitLogo from './assets/fitbitlogo.png'

const Main: React.FC = () => {
  return (
    <div>
      <Navbar color="faded" light>
      <img src={FitbitLogo} alt="Fitbit Logo" style={{width : 40, height : 40, margin: 5}}/>
        <NavbarBrand href="/" className="mr-auto">
          Fitbit Data Logging
        </NavbarBrand>
        <NavbarToggler className="mr-2" />
        <Collapse navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Main;
