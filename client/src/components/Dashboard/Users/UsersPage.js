import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import {
  requestUsers,
  getUsers,
  getUsersState,
} from "../../../store/entities/users";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "rc-pagination";
import { useTranslation } from "react-i18next";

// Components
import UserRow from "./UserRow";

// Styles
import {
  Users,
  Title,
  UsersTable,
} from "../../../styles/Dashboard/UsersPageStyles";
import { PaginationWrapper } from "../../../styles/Dashboard/PaginationStyles";

const UsersPage = () => {
  const [usersTableWidth, setUsersTableWidth] = useState(null);

  // This provides to the USER TABLE a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const usersWidth = () =>
      setUsersTableWidth(() => {
        if (window.innerWidth < 700) {
          return {
            gridTemplateColumns: `1fr`,
          };
        }

        const parentWidth = document.querySelector(".Users").offsetWidth;
        const padding = 30;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "name",
            width: 10,
            min: 100,
          },
          {
            column: "status",
            width: 10,
            min: 60,
          },
          {
            column: "userType",
            width: 10,
            min: 50,
          },
          {
            column: "email",
            width: 20,
            min: 100,
          },
          {
            column: "country",
            width: 10,
            min: 50,
          },
          {
            column: "phone",
            width: 10,
            min: 80,
          },
          {
            column: "payments",
            width: 10,
            min: 70,
          },
          {
            column: "moreInformation",
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

    usersWidth();
    window.addEventListener("resize", usersWidth);

    return () => window.removeEventListener("resize", setUsersTableWidth);
  }, []);

  const { loading } = useSelector(getUsersState);
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  useEffect(() => {
    dispatch(requestUsers());
  }, []);

  // PAGINATION
  const [pageSize, setPagSize] = useState(15);
  const [totalPages, setTotalPages] = useState(null);
  const [current, setCurrent] = useState(1);

  // Select the rows to display on the table
  const [showRows, setShowRows] = useState([]);

  useEffect(() => {
    setTotalPages(users.length - 1);
  }, [users, totalPages]);

  const onTableChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    const selectRows = (current, pageSize) => {
      const _1 = pageSize * current - pageSize;
      const _2 = pageSize * current;

      return users.slice(_1, _2);
    };
    setShowRows(selectRows(current, pageSize));
  }, [users, current, pageSize]);

  const { t } = useTranslation();

  return (
    <Users className="Users">
      <Title>{t("users.name")}</Title>
      <UsersTable>
        <div className="thead">
          <div className="tr" style={{ ...usersTableWidth }}>
            <div className="th name">{t("users.name")}</div>
            <div className="th status">{t("users.status")}</div>
            <div className="th userType">{t("users.user_type")}</div>
            <div className="th email">{t("users.email")}</div>
            <div className="th country">{t("users.country")}</div>
            <div className="th phone">{t("users.phone")}</div>
            <div className="th payments"></div>
            <div className="th moreInformation"></div>
          </div>
        </div>
        <div className="tbody">
          {loading && (
            <div className="tr loading" style={{ ...usersTableWidth }}>
              {t("loading")}
            </div>
          )}
          {!loading &&
            users.length !== 0 &&
            showRows.map((user, index) => (
              <UserRow
                user={user}
                key={index}
                usersTableWidth={usersTableWidth}
              />
            ))}
        </div>
      </UsersTable>
      <PaginationWrapper>
        <Pagination
          onChange={onTableChange}
          current={current}
          total={totalPages}
          defaultPageSize={pageSize}
          showPrevNextJumpers={false}
          prevIcon={() => <i className="fas fa-angle-double-left"></i>}
          nextIcon={() => <i className="fas fa-angle-double-right"></i>}
        />
      </PaginationWrapper>
    </Users>
  );
};

export default UsersPage;
