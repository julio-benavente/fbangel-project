import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";

//Components
import Navbar from "./components/Global/Navbar";
import Footer from "./components/Global/Footer";
import Home from "./components/Home/HomePage";
import HowItWorks from "./components/HowItWorks/HowItWorksPage";
import JoinNow from "./components/JoinNow/JoinNowPage";
import ReferralProgram from "./components/ReferralProgram/ReferralProgramPage";
import Faq from "./components/Faq/FaqPage";
import Contact from "./components/Contact/ContactPage";
import NoValid from "./components/NoValid/NoValidPage";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditionsPage";
import ReferralRegistration from "./components/ReferralRegistration/ReferralRegistrationPage";
import Login from "./components/Login/LoginPage";
import ForgotPassword from "./components/PasswordPages/ForgotPasswordPage";
import ResetPassword from "./components/PasswordPages/ResetPasswordPage";
import Dashboard from "./components/Dashboard/DashboardPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ConfirmationPage from "./components/Confirmation/ConfirmationPage";
import { useTranslation } from "react-i18next";
// Styles
import GlobalStyle from "./styles/GlobalStyles";
import Theme from "./styles/Theme";

import CookieConsent from "react-cookie-consent";

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Navbar />
        <CookieConsent cookieName="fb4cashCookieConsent" buttonText={t("cookie_consentment.accept")}>
          {t("cookie_consentment.message")}
        </CookieConsent>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/join-now/:token" component={JoinNow} />
          <Route path="/join-now" component={JoinNow} />
          <Route path="/referral-program" component={ReferralProgram} />
          <Route path="/faq" component={Faq} />
          <Route path="/contact" component={Contact} />
          <Route path="/no-valid" component={NoValid} />
          <Route path="/terms-conditions" component={TermsAndConditions} />
          <Route path="/referral-registration" component={ReferralRegistration} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/confirm-paypal-email/:token" component={ConfirmationPage} />
          <Route path="/confirm-email/:token" component={ConfirmationPage} />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route
            path="*"
            render={() => (
              <div
                style={{
                  height: "calc(100vh - 80px)",
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
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
