import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import axios from "axios";
// Styles
import { StepThree } from "../../../styles/ReferralRegistrationPageStyles";

const StepFive = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const {
    stepOne: { email },
    stepTwo: { paymentMethod, paypalEmail },
  } = getValues();

  // const paymentMethod = "paypal";
  // const email = "email@email.com";

  const [emailConfirmationMessage, setEmailConfirmationMessage] =
    useState(null);
  const sendEmailConfirmation = (email) => {
    setEmailConfirmationMessage(
      t("referral_registration.step_three.email_confirmation")
    );
    axios.post("/auth/send-confirmation-email", {
      email,
    });
  };

  return (
    <StepThree>
      <p>
        <span className="congratulations">
          {t("referral_registration.step_three.p_1.0")}
        </span>{" "}
        {t("referral_registration.step_three.p_1.1")} <b>{email}</b>.{" "}
        {paymentMethod === "paypal" &&
          `${t("referral_registration.step_three.p_1.2")} `}
        {paymentMethod === "paypal" && <b>{paypalEmail}</b>}
      </p>
      <p
        className="sendEmailConfirmation"
        onClick={() => sendEmailConfirmation(email)}
      >
        {t("referral_registration.step_three.p_2.0")}
      </p>
      <p className="emailConfirmationMessage">{emailConfirmationMessage}</p>
    </StepThree>
  );
};

export default StepFive;
