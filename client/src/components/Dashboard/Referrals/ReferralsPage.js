import React, { useState, useEffect } from "react";
import { getReferralsState, requestReferrals } from "../../../store/entities/referrals";
import { getUser } from "../../../store/auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Pagination from "rc-pagination";

// Styles
import { Referrals, Title, Table } from "../../../styles/Dashboard/ReferralsPageStyles";
import { PaginationWrapper } from "../../../styles/Dashboard/PaginationStyles";

import { ReactComponent as ArrowSvg } from "../../../assets/svgs/bold_arrow.svg";

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
            const value = (realWidth * width) / 100 > min ? `${width}%` : `${min}px`;
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

  // PAGINATION
  const [pageSize, setPagSize] = useState(15);
  const [totalPages, setTotalPages] = useState(null);
  const [current, setCurrent] = useState(1);

  // Select the rows to display on the table
  const [showRows, setShowRows] = useState([]);

  useEffect(() => {
    setTotalPages(referrals.length - 1);
  }, [referrals, totalPages]);

  const onTableChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    const selectRows = (current, pageSize) => {
      const _1 = pageSize * current - pageSize;
      const _2 = pageSize * current;

      return referrals.slice(_1, _2);
    };
    setShowRows(selectRows(current, pageSize));
  }, [referrals, current, pageSize]);

  const { t } = useTranslation();

  return (
    <Referrals className="Payments">
      <Title>{t("referrals.title")}</Title>
      <Table>
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th">{t("referrals.name")}</div>
            <div className="th">{t("referrals.email")}</div>
            <div className="th">{t("referrals.creation_date")}</div>
            <div className="th">{t("referrals.status")}</div>
            <div className="th">{t("referrals.observation")}</div>
          </div>
        </div>
        <div className="tbody">
          {loading && (
            <div className="tr loading" style={{ ...tableWidth }}>
              Cargando...
            </div>
          )}

          {!loading &&
            showRows
              .slice()
              .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
              .map((payment, index) => {
                const { firstName, email, creationDate, status, statusObservation } = payment;

                const date = new Date(creationDate).toLocaleDateString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div className="tr" key={index} style={{ ...tableWidth }}>
                    <div className="td name">{`${firstName} ******`}</div>
                    <div className="td email">{email}</div>
                    <div className="td createDate">{date}</div>
                    <div className={`td status ${status}`}>{`${status[0].toUpperCase()}${status.slice(1)}`}</div>
                    <div className="td statusObservation">{statusObservation}</div>
                  </div>
                );
              })}
        </div>
      </Table>
      <PaginationWrapper>
        <Pagination
          onChange={onTableChange}
          current={current}
          total={totalPages}
          defaultPageSize={pageSize}
          showPrevNextJumpers={false}
          prevIcon={() => <ArrowSvg className="left_arrow" />}
          nextIcon={() => <ArrowSvg className="right_arrow" />}
        />
      </PaginationWrapper>
    </Referrals>
  );
};

export default ReferralsPage;
