import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// Components
import DashboardNavbar from "./DashboardNavbar";
import DashboardProfile from "./DashboardProfile";
import Payments from "./Payments/PaymentsPage";
import Users from "./Users/UsersPage";

// Styles
import { Dashboard, Main } from "../../styles/Dashboard/DashboardPageStyles";

const DashboardPage = () => {
  useEffect(() => {
    const navbar = document.querySelector(".Navbar");
    const footer = document.querySelector(".Footer");

    navbar.classList.add("display-none");
    footer.classList.add("display-none");
  });

  const { path } = useRouteMatch();

  return (
    <Dashboard>
      <DashboardNavbar />
      <DashboardProfile />
      <Main>
        <Switch>
          <Route path={`${path}/payments`} component={Payments} />
          <Route path={`${path}/users`} component={Users} />

          <Route
            path={`${path}/configuration`}
            render={() => <h1>PConfiguration</h1>}
          />
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
