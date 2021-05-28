import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Styles
import {
  Confirmation,
  Message,
  ConfirmationMessage,
  ErrorMessage,
} from "../../styles/ConfirmationPageStyles";

const ConfirmatioPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const { pathname } = useLocation();
  const isLocatedPaypalEmail = pathname.includes("confirm-paypal-email");
  const isLocatedEmail = pathname.includes("confirm-email");

  const [paypalEmailIsConfirmed, setPaypalEmailIsConfirmed] = useState(false);
  const [emailIsConfirmed, setEmailIsConfirmed] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const request = async () => {
      if (isLocatedPaypalEmail) {
        try {
          var response = await axios.get(
            `/api/users/confirm-paypal-email/${token}`
          );
          if (response) {
            setPaypalEmailIsConfirmed(true);
          }
        } catch (error) {
          setError(true);
        }
      }

      if (isLocatedEmail) {
        try {
          var response = await axios.get(`/auth/confirmation/${token}`);
          if (response) {
            setEmailIsConfirmed(true);
          }
        } catch (error) {
          setError(true);
        }
      }

      console.log(response);
    };

    request();
  }, []);

  return (
    <Confirmation>
      {isLocatedPaypalEmail && (
        <>
          {!(paypalEmailIsConfirmed || error) && (
            <Message>{t("confirmation.paypal.message")}</Message>
          )}

          {paypalEmailIsConfirmed && (
            <ConfirmationMessage>
              {t("confirmation.paypal.confirmation_message")}
            </ConfirmationMessage>
          )}
          {error && (
            <ErrorMessage>{t("confirmation.paypal.error")} </ErrorMessage>
          )}
        </>
      )}

      {isLocatedEmail && (
        <>
          {!(emailIsConfirmed || error) && (
            <Message>{t("confirmation.email.message")}</Message>
          )}

          {emailIsConfirmed && (
            <ConfirmationMessage>
              {t("confirmation.email.confirmation_message")}
            </ConfirmationMessage>
          )}
          {error && (
            <ErrorMessage>{t("confirmation.email.error")}</ErrorMessage>
          )}
        </>
      )}
    </Confirmation>
  );
};

export default ConfirmatioPage;
