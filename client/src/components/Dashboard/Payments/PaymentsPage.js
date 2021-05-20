import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  requestUserPayments,
  requestPayments,
  getUserPayments,
  getPaymentsState,
} from "../../../store/entities/payments";
import { getUser } from "../../../store/auth/auth";

// Styles
import {
  Payments,
  Title,
  Table,
  PaypalEmailMessage,
} from "../../../styles/Dashboard/PaymentsPageStyle";

const PaymentsPage = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(getPaymentsState);
  const payments = useSelector(getUserPayments);
  const user = useSelector(getUser);

  const [tableWidth, setTableWidth] = useState(null);
  // This provides a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const width = () =>
      setTableWidth(() => {
        const parentWidth = document.querySelector(".Payments").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "concept",
            width: 35,
            min: 200,
          },
          {
            column: "paypal",
            width: 20,
            min: 100,
          },
          {
            column: "date",
            width: 15,
            min: 100,
          },
          {
            column: "status",
            width: 15,
            min: 100,
          },
          {
            column: "amount",
            width: 15,
            min: 100,
          },
        ];

        const grid = () => {
          var template = "";
          columns.map((column) => {
            const { width, min } = column;
            const value =
              (realWidth * width) / 100 > min ? `${width}%` : `${min}px`;
            template += `${value} `;
            return null;
          });

          return template;
        };

        return {
          gridTemplateColumns: grid(),
        };
      });

    width();
    window.addEventListener("resize", width);

    return () => window.removeEventListener("resize", setTableWidth);
  }, []);

  useEffect(() => {
    const request = async () => {
      if (user.authLevel === "user") {
        const response = await dispatch(
          requestUserPayments({
            id: user.id,
          })
        );
      }

      if (user.authLevel === "admin") {
        const response = await dispatch(requestPayments());
      }
    };

    request();
  }, []);

  const [paypalEmailIsSent, setPaypalEmailIsSent] = useState(false);
  const sendPaypalEmail = async (id) => {
    try {
      setPaypalEmailIsSent(true);
      const response = await axios.put(
        "/api/users/send-paypal-email-confirmation",
        {
          id,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <Payments className="Payments">
      {!user.paypalEmailVerified && (
        <PaypalEmailMessage bg={paypalEmailIsSent}>
          {!paypalEmailIsSent && (
            <p className="message">
              Tu email de paypal no ha sido verificado. Por favor,{" "}
              <span
                className="sendPaypalEmail"
                onClick={() => sendPaypalEmail(user.id)}
                to="/dashboard/profile"
              >
                HAZ CLICK AQUI
              </span>{" "}
              para enviar un correo de confirmación.
            </p>
          )}
          {paypalEmailIsSent && (
            <p className="emailSent">
              An email has been sent to your PayPal email. Check it out and
              verify your PayPal email. Si no te ha llegado{" "}
              <span
                className="sendPaypalEmail"
                onClick={() => sendPaypalEmail(user.id)}
                to="/dashboard/profile"
              >
                HAZ CLICK AQUI.
              </span>
            </p>
          )}
        </PaypalEmailMessage>
      )}
      <Title>Payments</Title>
      {user.authLevel === "user" && (
        <Table className="displayUser">
          <div className="thead">
            <div className="tr" style={{ ...tableWidth }}>
              <div className="th">Concepto</div>
              <div className="th">Cuenta de paypal</div>
              <div className="th">Fecha de pago</div>
              <div className="th">Estado</div>
              <div className="th">Monto</div>
            </div>
          </div>
          <div className="tbody">
            {loading && (
              <div className="tr loading" style={{ ...tableWidth }}>
                Cargando...
              </div>
            )}

            {!loading &&
              payments.map((payment, index) => {
                const { concept, paypalEmail, creationDate, amount, status } =
                  payment;

                const date = new Date(creationDate).toLocaleDateString([], {
                  day: "numeric",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div className="tr" key={index} style={{ ...tableWidth }}>
                    <div className="td">{concept}</div>
                    <div className="td">{paypalEmail}</div>
                    <div className="td">{date}</div>
                    <div className={`td ${status}`}>{status}</div>
                    <div className="td">
                      ${" "}
                      {(
                        Math.round((amount + Number.EPSILON) * 100) / 100
                      ).toFixed(2)}
                    </div>
                  </div>
                );
              })}
          </div>
        </Table>
      )}

      {user.authLevel === "admin" && (
        <Table className="displayAdmin">
          <div className="thead">
            <div className="tr" style={{ ...tableWidth }}>
              <div className="th">Concepto</div>
              <div className="th">Cuenta de paypal</div>
              <div className="th">Fecha de pago</div>
              <div className="th">Estado</div>
              <div className="th">Monto</div>
            </div>
          </div>
          <div className="tbody">
            {loading && (
              <div className="tr loading" style={{ ...tableWidth }}>
                Cargando...
              </div>
            )}
            {!loading &&
              payments.map((payment, index) => {
                const { concept, paypalEmail, creationDate, amount, status } =
                  payment;

                const date = new Date(creationDate).toLocaleDateString([], {
                  day: "numeric",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div className="tr" key={index} style={{ ...tableWidth }}>
                    <div className="td">{concept}</div>
                    <div className="td">{paypalEmail}</div>
                    <div className="td">{date}</div>
                    <div className={`td ${status}`}>{status}</div>
                    <div className="td">
                      ${" "}
                      {(
                        Math.round((amount + Number.EPSILON) * 100) / 100
                      ).toFixed(2)}
                    </div>
                  </div>
                );
              })}
          </div>
        </Table>
      )}
    </Payments>
  );
};

export default PaymentsPage;
