import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import {
  requestUsers,
  getUsers,
  getUsersState,
} from "../../../store/entities/users";
import { useDispatch, useSelector } from "react-redux";

// Components
import UserRow from "./UserRow";

// Styles
import {
  Users,
  Title,
  UsersTable,
} from "../../../styles/Dashboard/UsersPageStyles";

const UsersPage = () => {
  const [usersTableWidth, setUsersTableWidth] = useState(null);

  // This provides to the USER TABLE a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const usersWidth = () =>
      setUsersTableWidth(() => {
        const parentWidth = document.querySelector(".Users").offsetWidth;
        const padding = 30;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "name",
            width: 15,
            min: 100,
          },
          {
            column: "status",
            width: 8,
            min: 100,
          },
          {
            column: "userType",
            width: 8,
            min: 100,
          },
          {
            column: "email",
            width: 18,
            min: 100,
          },
          {
            column: "country",
            width: 8,
            min: 100,
          },
          {
            column: "phone",
            width: 15,
            min: 100,
          },
          {
            column: "payments",
            width: 8,
            min: 100,
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

  return (
    <Users className="Users">
      <Title>Users</Title>
      <UsersTable>
        <div className="thead">
          <div className="tr" style={{ ...usersTableWidth }}>
            <div className="th name">Nombre</div>
            <div className="th status">Estado</div>
            <div className="th userType">Tipo de usuario</div>
            <div className="th email">Email</div>
            <div className="th country">Pais</div>
            <div className="th phone">Telefono</div>
            <div className="th payments"></div>
            <div className="th moreInformation"></div>
          </div>
        </div>
        <div className="tbody">
          {loading && (
            <div className="tr loading" style={{ ...usersTableWidth }}>
              Cargando...
            </div>
          )}
          {!loading &&
            users.length !== 0 &&
            users.map((user, index) => (
              <UserRow
                user={user}
                key={index}
                usersTableWidth={usersTableWidth}
              />
            ))}
        </div>
      </UsersTable>
    </Users>
  );
};

export default UsersPage;
