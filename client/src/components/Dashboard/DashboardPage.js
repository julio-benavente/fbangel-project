import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// Components
import DashboardNavbar from "./DashboardNavbar";
import DashboardProfile from "./DashboardProfile";
import Payments from "./Payments/PaymentsPage";
import Profile from "./Profile/ProfilePage";
import Users from "./Users/UsersPage";
import Referrals from "./Referrals/ReferralsPage";

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
          <Route exact path={path} component={Payments} />
          <Route
            path={`${path}/*`}
            render={() => <h1>Page doesn't exist</h1>}
          />
        </Switch>
      </Main>
    </Dashboard>
  );
};

export default DashboardPage;
