import React, { useState } from "react";

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

  return (
    <UserRowWrapper>
      <div className="tr" style={{ ...usersTableWidth }}>
        <div className="td name">{`${firstName} ${lastName}`}</div>
        <div className={`td status ${status}`}>{status}</div>
        <div className={`td userType`}>{userType}</div>
        <div className="td email">{email}</div>
        <div className="td country">{country}</div>
        <div className="td phone">{phone}</div>
        <button
          type="button"
          className="td payments"
          onClick={() => setPaymentsIsOpen(!paymentsIsOpen)}
        >
          Pagos
        </button>
        <button
          className="td moreInformation"
          onClick={() => setMoreInformationIsOpen(!moreInformationIsOpen)}
        >
          Más información
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

  return (
    <MoreInformationWrapper>
      <div className="moreInformationTitle">Mas informacion</div>
      <div className="information">
        <p>
          <b>Adress: </b>
          {address}
        </p>
        <p>
          <b>City: </b>
          {city}
        </p>
        <p>
          <b>Birthday: </b>
          {new Date(birthday).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p>
          <b>Creation date: </b>
          {new Date(creationDate).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>

        <p>
          <b>IP: </b>
          {ip}
        </p>

        <p>
          <b>Payment Method: </b>
          {paymentMethod}
        </p>
        <p>
          <b>Paypal Email: </b>
          {paypalEmail}
        </p>
        <p>
          <b>Holder Name: </b>
          {holderName}
        </p>
        <p>
          <b>Bank account code: </b>
          {bankAccountCode}
        </p>
        <p>
          <b>Bank Agency: </b>
          {bankAngency}
        </p>
        <p>
          <b>Referral: </b>
          {referral}
        </p>
        <p>
          <b>Old referral cod: </b>
          {oldReferralCode}
        </p>
        <p>
          <b>Referral Code: </b>
          {referralCode}
        </p>
        <p>
          <b>Zip Code: </b>
          {zipCode}
        </p>
      </div>
    </MoreInformationWrapper>
  );
};
