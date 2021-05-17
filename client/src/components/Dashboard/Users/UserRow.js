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
    ...moreInformation
  } = user;

  const [paymentsIsOpen, setPaymentsIsOpen] = useState(false);
  const [moreInformationIsOpen, setMoreInformationIsOpen] = useState(false);

  return (
    <UserRowWrapper>
      <div className="tr" style={{ ...usersTableWidth }}>
        <div className="td name">{`${firstName} ${lastName}`}</div>
        <div className={`td status ${status}`}>{status}</div>
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
      fake_firstName,
      fake_lastName,
      fake_email,
      fake_status,
      fake_country,
      fake_phone,
    },
  } = props;

  return (
    <MoreInformationWrapper>
      <div className="moreInformationTitle">Mas informacion</div>
      <div className="information">
        <p>
          <b>fake_firstName: </b>
          {fake_firstName}
        </p>
        <p>
          <b>fake_lastName: </b>
          {fake_lastName}
        </p>
        <p>
          <b>fake_email: </b>
          {fake_email}
        </p>
        <p>
          <b>fake_status: </b>
          {fake_status}
        </p>
        <p>
          <b>fake_country: </b>
          {fake_country}
        </p>
        <p>
          <b>fake_phone: </b>
          {fake_phone}
        </p>
      </div>
    </MoreInformationWrapper>
  );
};
