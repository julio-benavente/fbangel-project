import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { DetailsUserTable } from "../../../styles/Dashboard/ActionsPageStyles";
import { formatDate } from "../../../utils/formatDate";
import { useTableWidth } from "../../../utils/tableWidth";

const UserRow = ({ action, tableWidth }) => {
  const { details, action: actionText, creationDate, target } = action;
  const [detailsIsOn, setDetailsIsOn] = useState(false);
  const handleDetails = () => setDetailsIsOn(!detailsIsOn);

  const { t } = useTranslation();

  return (
    <>
      <div className="tr" style={tableWidth}>
        <div className="td action">{actionText}</div>
        <div className="td creationDate">{formatDate(creationDate)}</div>
        <div className="td target">{`${target[0].toUpperCase()}${target.slice(
          1
        )}`}</div>
        <div className="td details">
          <button onClick={handleDetails}>Detalles</button>
        </div>
      </div>
      {detailsIsOn && <Details details={details} />}
    </>
  );
};

export default UserRow;

const Details = ({ details }) => {
  const { t } = useTranslation();
  const columns = [
    {
      name: "name",
      width: 30,
      min: 100,
    },
    {
      name: "name",
      width: 30,
      min: 100,
    },
    {
      name: "name",
      width: 30,
      min: 100,
    },
  ];

  const tableWdith = useTableWidth(columns, "DetailsUserTable");
  return (
    <DetailsUserTable className="DetailsUserTable">
      <div className="thead">
        <div className="tr" style={tableWdith}>
          <div className="th name">Nombre</div>
          <div className="th email">Email</div>
          <div className="th action">Action</div>
        </div>
      </div>
      <div className="tbody">
        {details.length !== 0 &&
          details.map((detail, index) => {
            const {
              action,
              item: { firstName, lastName, email },
            } = detail;

            return (
              <div className="tr" key={index} style={tableWdith}>
                <div className="td name">{`${firstName} ${lastName}`}</div>
                <div className="td email">{email}</div>
                <div className="td action ">{action}</div>
              </div>
            );
          })}
      </div>
    </DetailsUserTable>
  );
};
