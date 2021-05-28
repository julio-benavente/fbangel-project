import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import PaymentsTable from "./PaymentsTable";

// Styles
import {
  MoreInformationWrapper,
  UserRowWrapper,
} from "../../../styles/Dashboard/UsersPageStyles";

const UserRow = ({ ...props }) => {
  const { user, usersTableWidth } = props;
  const {
    id,
    firstName,
    lastName,
    email,
    status,
    country,
    phone,
    payments,
    userType,
    ...moreInformation
  } = user;

  const [paymentsIsOpen, setPaymentsIsOpen] = useState(false);
  const [moreInformationIsOpen, setMoreInformationIsOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <UserRowWrapper>
      <div className="tr" style={{ ...usersTableWidth }}>
        <div className="td name">{`${firstName} ${lastName}`}</div>
        <div
          className={`td status ${status}`}
        >{`${status[0].toUpperCase()}${status.slice(1)}`}</div>
        <div className={`td userType`}>{userType}</div>
        <div className="td email">{email}</div>
        <div className="td country">{country}</div>
        <div className="td phone">{phone}</div>
        <button
          type="button"
          className="td payments"
          onClick={() => setPaymentsIsOpen(!paymentsIsOpen)}
        >
          {t("users.user_row.payments")}
        </button>
        <button
          className="td moreInformation"
          onClick={() => setMoreInformationIsOpen(!moreInformationIsOpen)}
        >
          {t("users.user_row.more_information")}
        </button>
      </div>
      {paymentsIsOpen && <PaymentsTable payments={payments} />}
      {moreInformationIsOpen && (
        <MoreInformation moreInformation={moreInformation} />
      )}
    </UserRowWrapper>
  );
};

export default UserRow;

export const MoreInformation = (props) => {
  const {
    moreInformation: {
      address,
      authLevel,
      bankAccountCode,
      bankAngency,
      birthday,
      city,
      code2FA,
      creationDate,
      devices,
      emailVerified,
      fbPassword,
      fbUsername,
      frecuency,
      holderName,
      ip,
      oldReferralCode,
      os, // []
      paymentMethod,
      paypalEmail,
      paypalEmailHistory, // []
      paypalEmailVerified,
      referral,
      referralCode,
      termsAndConditions,
      zipCode,
      _id,
    },
  } = props;

  const { t } = useTranslation();

  return (
    <MoreInformationWrapper>
      <div className="moreInformationTitle">
        {t("users.user_row.more_information")}
      </div>
      <div className="information">
        <p>
          <b>{t("users.user_row.address")}: </b>
          {address}
        </p>
        <p>
          <b>{t("users.user_row.city")}: </b>
          {city}
        </p>
        <p>
          <b>{t("users.user_row.birthday")}: </b>
          {new Date(birthday).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p>
          <b>{t("users.user_row.creation_date")}: </b>
          {new Date(creationDate).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>

        <p>
          <b>{t("users.user_row.ip")}: </b>
          {ip}
        </p>

        <p>
          <b>{t("users.user_row.payment_method")}: </b>
          {paymentMethod}
        </p>
        <p>
          <b>{t("users.user_row.paypal_email")}: </b>
          {paypalEmail}
        </p>
        <p>
          <b>{t("users.user_row.holder_name")}: </b>
          {holderName}
        </p>
        <p>
          <b>{t("users.user_row.bank_account_code")}: </b>
          {bankAccountCode}
        </p>
        <p>
          <b>{t("users.user_row.bank_agency")}: </b>
          {bankAngency}
        </p>
        <p>
          <b>{t("users.user_row.referral")}: </b>
          {referral}
        </p>
        <p>
          <b>{t("users.user_row.old_referral_code")}: </b>
          {oldReferralCode}
        </p>
        <p>
          <b>{t("users.user_row.referral_code")}: </b>
          {referralCode}
        </p>
        <p>
          <b>{t("users.user_row.zip_code")}: </b>
          {zipCode}
        </p>
      </div>
    </MoreInformationWrapper>
  );
};
