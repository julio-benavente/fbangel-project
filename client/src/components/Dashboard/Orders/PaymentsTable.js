import React, { useState, useEffect } from "react";
import { PaymentsTable } from "../../../styles/Dashboard/OrdersPageStyles";
import { useTranslation } from "react-i18next";

const Table = (props) => {
  const [paymentsTableWidth, setPaymentsTableWidth] = useState(null);

  const { payments } = props;

  // This provides to the PAYMENT TABLE a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const paymentsWidth = () =>
      setPaymentsTableWidth(() => {
        const parentWidth = document.querySelector(".Orders").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "name",
            width: 20,
            min: 80,
          },
          {
            column: "concept",
            width: 20,
            min: 80,
          },
          {
            column: "paypal",
            width: 20,
            min: 70,
          },
          {
            column: "date",
            width: 10,
            min: 70,
          },
          {
            column: "status",
            width: 15,
            min: 60,
          },
          {
            column: "amount",
            width: 15,
            min: 60,
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

    paymentsWidth();
    window.addEventListener("resize", paymentsWidth);

    return () => window.removeEventListener("resize", setPaymentsTableWidth);
  }, []);

  const { t } = useTranslation();

  return (
    <PaymentsTable className="PaymentsTable">
      <div className="PaymentsTable">
        <div className="thead">
          <div className="tr" style={{ ...paymentsTableWidth }}>
            <div className="th name">{t("orders.payment_table.name")}</div>
            <div className="th concept">
              {t("orders.payment_table.concept")}
            </div>
            <div className="th paymentMethod">
              {t("orders.payment_table.payment_method")}
            </div>
            <div className="th paymentDate">
              {t("orders.payment_table.payment_date")}
            </div>
            <div className="th status">{t("orders.payment_table.status")}</div>
            <div className="th amount">{t("orders.payment_table.amount")}</div>
          </div>
        </div>
        <div className="tbody">
          {payments.length !== 0 &&
            payments.map((payment, index) => {
              const {
                amount,
                concept,
                id,
                paymentDate,
                paymentMethod,
                paypalEmail,
                status,
                payee: { firstName, lastName },
              } = payment;
              const date = new Date(paymentDate).toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <div
                  className="tr"
                  key={index}
                  style={{ ...paymentsTableWidth }}
                >
                  <div className="td name">{`${firstName} ${lastName}`}</div>
                  <div className="td concept">{concept}</div>
                  <div className="td paymentMethod">{`${paymentMethod[0].toUpperCase()}${paymentMethod.slice(
                    1
                  )}`}</div>
                  <div className="td paymentDate">
                    {paymentDate ? date : "-"}
                  </div>
                  <div
                    className={`td status ${status}`}
                  >{`${status[0].toUpperCase()}${status.slice(1)}`}</div>
                  <div className="td amount ">{`$ ${amount.toFixed(2)}`}</div>
                </div>
              );
            })}
        </div>
      </div>
    </PaymentsTable>
  );
};

export default Table;
