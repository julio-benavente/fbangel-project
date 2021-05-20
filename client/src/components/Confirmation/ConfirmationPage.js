import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
// Styles
import {
  Confirmation,
  Message,
  ConfirmationMessage,
  ErrorMessage,
} from "../../styles/ConfirmationPageStyles";

const ConfirmatioPage = () => {
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
            <Message>Tu email de PayPal esta siendo verificado</Message>
          )}

          {paypalEmailIsConfirmed && (
            <ConfirmationMessage>
              Tu email de Paypal ya está verificado
            </ConfirmationMessage>
          )}
          {error && (
            <ErrorMessage>
              A ocurrido un problema, intenta refrescar la página o envía de
              nuevo el email de confirmación
            </ErrorMessage>
          )}
        </>
      )}

      {isLocatedEmail && (
        <>
          {!(emailIsConfirmed || error) && (
            <Message>Tu email esta siendo verificado</Message>
          )}

          {emailIsConfirmed && (
            <ConfirmationMessage>
              Tu email ya esta verificado
            </ConfirmationMessage>
          )}
          {error && (
            <ErrorMessage>
              A ocurrido un problema, intenta refrescar la página o envía de
              nuevo el email de confirmación
            </ErrorMessage>
          )}
        </>
      )}
    </Confirmation>
  );
};

export default ConfirmatioPage;
