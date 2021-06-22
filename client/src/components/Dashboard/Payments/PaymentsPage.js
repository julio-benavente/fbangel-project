import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  requestUserPayments,
  requestPayments,
  getUserPayments,
  getPaymentsState,
} from "../../../store/entities/payments";
import { getUser as getUserInformation, requestUser as requestUserInformation } from "../../../store/entities/users";
import { getUser } from "../../../store/auth/auth";
import Pagination from "rc-pagination";

import { useTableWidth } from "../../../utils/tableWidth";

// Styles
import { Payments, Title, Table, PaypalEmailMessage } from "../../../styles/Dashboard/PaymentsPageStyle";
import { PaginationWrapper } from "../../../styles/Dashboard/PaginationStyles";

const PaymentsPage = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(getPaymentsState);
  const payments = useSelector(getUserPayments);
  const userInformation = useSelector(getUserInformation);
  const user = useSelector(getUser);

  const userColumns = [
    { column: "concept", width: 35, min: 80 },
    { column: "paypal", width: 20, min: 100 },
    { column: "date", width: 15, min: 70 },
    { column: "status", width: 15, min: 70 },
    { column: "amount", width: 15, min: 50 },
  ];

  const adminColumns = [
    { column: "name", width: 15, min: 80 },
    { column: "concept", width: 35, min: 80 },
    { column: "paypal", width: 20, min: 100 },
    { column: "date", width: 10, min: 70 },
    { column: "status", width: 10, min: 70 },
    { column: "amount", width: 10, min: 50 },
  ];

  const userTableWith = useTableWidth(userColumns, "Payments");
  const adminTableWith = useTableWidth(adminColumns, "Payments");

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

  useEffect(() => {
    dispatch(requestUserInformation({ id: user.id }));
  });

  const [paypalEmailIsSent, setPaypalEmailIsSent] = useState(false);
  const sendPaypalEmail = async (id) => {
    try {
      setPaypalEmailIsSent(true);
      const response = await axios.put("/api/users/send-paypal-email-confirmation", {
        id,
      });
    } catch (error) {}
  };

  // PAGINATION
  const [pageSize, setPagSize] = useState(15);
  const [totalPages, setTotalPages] = useState(null);
  const [current, setCurrent] = useState(1);

  // Select the rows to display on the table
  const [showRows, setShowRows] = useState([]);

  const onTableChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    const selectRows = (current, pageSize) => {
      const _1 = pageSize * current - pageSize;
      const _2 = pageSize * current;

      return payments.slice(_1, _2);
    };
    setShowRows(selectRows(current, pageSize));
  }, [payments, current, pageSize]);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("payments.title");
  }, [language]);

  return (
    <Payments className="Payments">
      {userInformation && userInformation.paymentMethod && !userInformation.paypalEmailVerified && (
        <PaypalEmailMessage bg={paypalEmailIsSent}>
          {!paypalEmailIsSent && (
            <p className="message">
              {t("payments.paypal_email_verified.0")}
              <span className="sendPaypalEmail" onClick={() => sendPaypalEmail(user.id)} to="/dashboard/profile">
                {t("payments.paypal_email_verified.1")}
              </span>
              {t("payments.paypal_email_verified.2")}
            </p>
          )}
          {paypalEmailIsSent && (
            <p className="emailSent">
              {t("payments.email_sent.0")}
              <span className="sendPaypalEmail" onClick={() => sendPaypalEmail(user.id)} to="/dashboard/profile">
                {t("payments.email_sent.1")}
              </span>
            </p>
          )}
        </PaypalEmailMessage>
      )}
      <Title> {t("payments.title")} </Title>
      {user.authLevel === "user" && (
        <Table className="displayUser">
          <div className="thead">
            <div
              className="tr"
              style={{
                ...userTableWith,
              }}
            >
              <div className="th concept"> {t("payments.concept")} </div>
              <div className="th paymentMethod"> {t("payments.payment_method")} </div>
              <div className="th paymentDate"> {t("payments.payment_date")} </div>
              <div className="th status"> {t("payments.status")} </div>
              <div className="th amount"> {t("payments.amount")} </div>
            </div>
          </div>
          <div className="tbody">
            {loading && (
              <div
                className="tr loading"
                style={{
                  ...userTableWith,
                }}
              >
                {t("loading")}
              </div>
            )}
            {!loading &&
              showRows.map((payment, index) => {
                const { concept, paypalEmail, creationDate, amount, status } = payment;

                const date = new Date(creationDate).toLocaleDateString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div
                    className="tr"
                    key={index}
                    style={{
                      ...userTableWith,
                    }}
                  >
                    <div className="td concept"> {concept} </div>
                    <div className="td paymentMethod"> {paypalEmail} </div>
                    <div className="td paymentDate"> {date} </div>
                    <div className={`td status ${status}`}> {`${status[0].toUpperCase()}${status.slice(1)}`} </div>
                    <div className="td amount">$ {(Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2)} </div>
                  </div>
                );
              })}
          </div>
        </Table>
      )}
      {user.authLevel === "admin" && (
        <Table className="displayAdmin">
          <div className="thead">
            <div
              className="tr"
              style={{
                ...adminTableWith,
              }}
            >
              <div className="th name"> {t("payments.name")} </div>
              <div className="th concept"> {t("payments.concept")} </div>
              <div className="th paymentMethod"> {t("payments.payment_method")} </div>
              <div className="th paymentDate"> {t("payments.payment_date")} </div>
              <div className="th status"> {t("payments.status")} </div>
              <div className="th amount"> {t("payments.amount")} </div>
            </div>
          </div>
          <div className="tbody">
            {loading && (
              <div
                className="tr loading"
                style={{
                  ...adminTableWith,
                }}
              >
                {t("loading")}
              </div>
            )}
            {!loading &&
              showRows.map((payment, index) => {
                const {
                  concept,
                  paymentMethod,
                  creationDate,
                  amount,
                  status,
                  payee: { firstName, lastName },
                } = payment;

                const date = new Date(creationDate).toLocaleDateString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div
                    className="tr"
                    key={index}
                    style={{
                      ...adminTableWith,
                    }}
                  >
                    <div className="td name"> {`${firstName} ${lastName}`} </div>
                    <div className="td concept"> {concept} </div>
                    <div className="td paymentMethod">
                      {`${paymentMethod ? paymentMethod[0].toUpperCase() : ""}${
                        paymentMethod ? paymentMethod.slice(1) : ""
                      }`}
                    </div>
                    <div className="td paymentDate"> {date} </div>
                    <div className={`td status ${status}`}> {`${status[0].toUpperCase()}${status.slice(1)}`} </div>
                    <div className="td amount">$ {(Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2)} </div>
                  </div>
                );
              })}
          </div>
        </Table>
      )}
      <PaginationWrapper>
        <Pagination
          onChange={onTableChange}
          current={current}
          total={totalPages}
          defaultPageSize={pageSize}
          showPrevNextJumpers={false}
          prevIcon={() => <i className="fas fa-angle-double-left"> </i>}
          nextIcon={() => <i className="fas fa-angle-double-right"> </i>}
        />
      </PaginationWrapper>
    </Payments>
  );
};

export default PaymentsPage;
