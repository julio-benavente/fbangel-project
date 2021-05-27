import React, { useState, useEffect } from "react";
import { PaymentsTable } from "../../../styles/Dashboard/UsersPageStyles";

const Table = (props) => {
  const [paymentsTableWidth, setPaymentsTableWidth] = useState(null);

  const { payments } = props;

  // This provides to the PAYMENT TABLE a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const paymentsWidth = () =>
      setPaymentsTableWidth(() => {
        const parentWidth = document.querySelector(".Users").offsetWidth;
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

    paymentsWidth();
    window.addEventListener("resize", paymentsWidth);

    return () => window.removeEventListener("resize", setPaymentsTableWidth);
  }, []);
  return (
    <PaymentsTable className="PaymentsTable">
      <div className="PaymentsTable">
        <div className="thead">
          <div className="tr" style={{ ...paymentsTableWidth }}>
            <div className="th">Concepto</div>
            <div className="th">Cuenta de paypal</div>
            <div className="th">Fecha de pago</div>
            <div className="th">Estado</div>
            <div className="th">Monto</div>
          </div>
        </div>
        <div className="tbody">
          {payments.list.length !== 0 &&
            payments.list.map((payment, index) => {
              const { amount, concept, id, paymentDate, paypalEmail, status } =
                payment;

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
                  <div className="td concept">{concept}</div>
                  <div className="td paypalEmail">{paypalEmail}</div>
                  <div className="td paymentDate">
                    {paymentDate ? date : "-"}
                  </div>
                  <div className={`td status ${status}`}>{status}</div>
                  <div className="td amount ">{`$ ${amount}`}</div>
                </div>
              );
            })}
        </div>
      </div>
    </PaymentsTable>
  );
};

export default Table;
