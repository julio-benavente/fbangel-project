import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";

// Styles
import {
  DashboardNavbar,
  Logo,
  NavbarWrapper,
  NavbarItem,
} from "../../styles/Dashboard/DashboardNavbarStyles";

// Assets
import { ReactComponent as UsersSvg } from "../../assets/svgs/user.svg";
import { ReactComponent as PaymentsSvg } from "../../assets/svgs/payments.svg";
import { ReactComponent as ConfigurationSvg } from "../../assets/svgs/configuration.svg";

const MainComponent = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  return (
    <DashboardNavbar>
      <Logo>fbangel</Logo>
      <NavbarWrapper>
        <NavbarItem
          activeClassName="active"
          isActive={() => {
            if (
              pathname === "/dashboard" ||
              /^\/dashboard\/payments/.test(pathname)
            )
              return true;
          }}
          to={() => `${path}/payments`}
        >
          <PaymentsSvg />
          <p>Payments</p>
        </NavbarItem>

        <NavbarItem activeClassName="active" to={() => `${path}/configuration`}>
          <ConfigurationSvg />
          <p>Configuration</p>
        </NavbarItem>

        <NavbarItem activeClassName="active" to={() => `${path}/users`}>
          <UsersSvg />
          <p>Users</p>
        </NavbarItem>
      </NavbarWrapper>
    </DashboardNavbar>
  );
};

export default MainComponent;
