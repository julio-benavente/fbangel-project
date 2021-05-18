import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import axios from "axios";
// Styles
import { FormFive } from "../../../styles/JoinUsPageStyles";

const StepFive = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const {
    stepTwo: { email },
    stepFour: { paymentMethod },
  } = getValues();

  const [emailConfirmationMessage, setEmailConfirmatioMessage] = useState(null);
  const sendEmailConfirmation = (email) => {
    setEmailConfirmatioMessage("The email has already been sent");
    axios.post("/auth/send-confirmation-email", {
      email,
    });
  };

  return (
    <FormFive>
      <p>
        <span className="congratulations">Felicitaciones por el registro.</span>{" "}
        El proceso de registro no está completamente finalizado. Se le ha
        enviado un correo de confirmación a su correo <b>{email}</b>.{" "}
        {paymentMethod === "paypal" &&
          `También se le ha enviado un correo de confirmacion a su correo de paypal `}
        {paymentMethod === "paypal" && <b>{email}</b>}
      </p>
      <p
        className="sendEmailConfirmation"
        onClick={() => sendEmailConfirmation(email)}
      >
        Si no te ha llegado a tu bandeja el correo de confirmacion de registro
        da click aquí
      </p>
      <p className="emailConfirmationMessage">{emailConfirmationMessage}</p>
    </FormFive>
  );
};

export default StepFive;
