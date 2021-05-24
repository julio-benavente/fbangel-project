import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/auth/auth";

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
import { ReactComponent as PeopleSvg } from "../../assets/svgs/people.svg";
import { ReactComponent as OrderSvg } from "../../assets/svgs/order.svg";

const MainComponent = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const { authLevel } = useSelector(getUser);

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

        {authLevel === "user" && (
          <NavbarItem activeClassName="active" to={() => `${path}/referrals`}>
            <PeopleSvg />
            <p>Referrals</p>
          </NavbarItem>
        )}
        <NavbarItem activeClassName="active" to={() => `${path}/profile`}>
          <ConfigurationSvg />
          <p>Profile</p>
        </NavbarItem>

        {authLevel === "admin" && (
          <NavbarItem activeClassName="active" to={() => `${path}/users`}>
            <UsersSvg />
            <p>Users</p>
          </NavbarItem>
        )}

        {authLevel === "admin" && (
          <NavbarItem activeClassName="active" to={() => `${path}/orders`}>
            <OrderSvg />
            <p>Orders</p>
          </NavbarItem>
        )}
      </NavbarWrapper>
    </DashboardNavbar>
  );
};

export default MainComponent;
