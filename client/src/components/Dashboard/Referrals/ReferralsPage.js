import React, { useState, useEffect } from "react";
import {
  getReferralsState,
  requestReferrals,
} from "../../../store/entities/referrals";
import { getUser } from "../../../store/auth/auth";
import { useSelector, useDispatch } from "react-redux";

// Styles
import {
  Referrals,
  Title,
  Table,
} from "../../../styles/Dashboard/ReferralsPageStyles";

const ReferralsPage = () => {
  const [tableWidth, setTableWidth] = useState(null);
  // This provides a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const width = () =>
      setTableWidth(() => {
        if (window.innerWidth < 600) {
          return {
            gridTemplateColumns: `1fr`,
          };
        }

        const parentWidth = document.querySelector(".Payments").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "name",
            width: 20,
            min: 100,
          },
          {
            column: "email",
            width: 20,
            min: 100,
          },
          {
            column: "createDate",
            width: 10,
            min: 70,
          },
          {
            column: "status",
            width: 10,
            min: 60,
          },
          {
            column: "observation",
            width: 20,
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

  const dispatch = useDispatch();
  const { loading, list: referrals } = useSelector(getReferralsState);
  const { id } = useSelector(getUser);
  useEffect(() => {
    const request = async () => {
      const response = await dispatch(requestReferrals({ id }));
    };
    request();
  }, []);

  return (
    <Referrals className="Payments">
      <Title>Referral</Title>
      <Table>
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th">Name</div>
            <div className="th">Email</div>
            <div className="th">Creation date</div>
            <div className="th">Status</div>
            <div className="th">Observation</div>
          </div>
        </div>
        <div className="tbody">
          {loading && (
            <div className="tr loading" style={{ ...tableWidth }}>
              Cargando...
            </div>
          )}

          {!loading &&
            referrals
              .slice()
              .sort(
                (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
              )
              .map((payment, index) => {
                const {
                  firstName,
                  email,
                  creationDate,
                  status,
                  statusObservation,
                } = payment;

                const date = new Date(creationDate).toLocaleDateString([], {
                  day: "numeric",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div className="tr" key={index} style={{ ...tableWidth }}>
                    <div className="td name">{`${firstName} ******`}</div>
                    <div className="td email">{email}</div>
                    <div className="td createDate">{date}</div>
                    <div className={`td status ${status}`}>{status}</div>
                    <div className="td statusObservation">
                      {statusObservation}
                    </div>
                  </div>
                );
              })}
        </div>
      </Table>
    </Referrals>
  );
};

export default ReferralsPage;
