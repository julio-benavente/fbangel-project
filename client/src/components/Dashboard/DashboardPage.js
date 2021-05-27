import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// Components
import DashboardNavbar from "./DashboardNavbar";
import DashboardProfile from "./DashboardProfile";
import Payments from "./Payments/PaymentsPage";
import Profile from "./Profile/ProfilePage";
import Users from "./Users/UsersPage";
import Referrals from "./Referrals/ReferralsPage";
import Orders from "./Orders/OrdersPage";

// Styles
import { Dashboard, Main } from "../../styles/Dashboard/DashboardPageStyles";

const DashboardPage = () => {
  const { path } = useRouteMatch();

  return (
    <Dashboard>
      <DashboardNavbar />
      <DashboardProfile />
      <Main>
        <Switch>
          <Route path={`${path}/payments`} component={Payments} />
          <Route path={`${path}/users`} component={Users} />
          <Route path={`${path}/profile`} component={Profile} />
          <Route path={`${path}/referrals`} component={Referrals} />
          <Route path={`${path}/orders`} component={Orders} />
          <Route exact path={path} component={Payments} />
          <Route
            path={`${path}/*`}
            render={() => (
              <div
                style={{
                  height: "calc(100%)",
                  width: "calc(100%)",
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <h1>Page not found</h1>
              </div>
            )}
          />
        </Switch>
      </Main>
    </Dashboard>
  );
};

export default DashboardPage;
