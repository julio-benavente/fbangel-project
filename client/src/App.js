import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";

//Components
import Navbar from "./components/Global/Navbar";
import Footer from "./components/Global/Footer";
import Home from "./components/Home/HomePage";
import HowItWorks from "./components/HowItWorks/HowItWorksPage";
import JoinUs from "./components/JoinUs/JoinUsPage";
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

// Styles
import GlobalStyle from "./styles/GlobalStyles";
import Theme from "./styles/Theme";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/join-now/:token" component={JoinUs} />
          <Route path="/join-now" component={JoinUs} />
          <Route path="/referral-program" component={ReferralProgram} />
          <Route path="/faq" component={Faq} />
          <Route path="/contact" component={Contact} />
          <Route path="/no-valid" component={NoValid} />
          <Route path="/terms-conditions" component={TermsAndConditions} />
          <Route
            path="/referral-registration"
            component={ReferralRegistration}
          />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route
            path="/confirm-paypal-email/:token"
            component={ConfirmationPage}
          />
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
                <h1>Page not found</h1>
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
