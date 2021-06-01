import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
// Components
import DashboardNavbar from "./DashboardNavbar";
import DashboardProfile from "./DashboardProfile";
import Payments from "./Payments/PaymentsPage";
import Profile from "./Profile/ProfilePage";
import Users from "./Users/UsersPage";
import Referrals from "./Referrals/ReferralsPage";
import Orders from "./Orders/OrdersPage";
import Actions from "./Actions/ActionsPage";

// Styles
import { Dashboard, Main } from "../../styles/Dashboard/DashboardPageStyles";

const DashboardPage = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();
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
          <Route path={`${path}/actions`} component={Actions} />
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
                <h1>{t("not_found")}</h1>
              </div>
            )}
          />
        </Switch>
      </Main>
    </Dashboard>
  );
};

export default DashboardPage;
