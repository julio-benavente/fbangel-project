import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import axios from "axios";
// Styles
import { FormFive } from "../../../styles/JoinNowPageStyles";

const StepFive = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const {
    stepTwo: { email },
    stepFour: { paymentMethod, paypalEmail },
  } = getValues();

  const [emailConfirmationMessage, setEmailConfirmationMessage] =
    useState(null);
  const sendEmailConfirmation = (email) => {
    setEmailConfirmationMessage(t("join_now.step_five.email_confirmation"));
    axios.post("/auth/send-confirmation-email", {
      email,
    });
  };

  return (
    <FormFive>
      <p>
        <span className="congratulations">{t("join_now.step_five.p_1.0")}</span>{" "}
        {t("join_now.step_five.p_1.1")} <b>{email}</b>.{" "}
        {paymentMethod === "paypal" && `${t("join_now.step_five.p_1.2")} `}
        {paymentMethod === "paypal" && <b>{paypalEmail}</b>}
      </p>
      <p
        className="sendEmailConfirmation"
        onClick={() => sendEmailConfirmation(email)}
      >
        {t("join_now.step_five.p_2.0")}
      </p>
      <p className="emailConfirmationMessage">{emailConfirmationMessage}</p>
    </FormFive>
  );
};

export default StepFive;
