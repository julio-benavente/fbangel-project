import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getUsers } from "../../../../store/entities/users";
import { getUser } from "../../../../store/auth/auth";

// Styles
import {
  ChangeUserStatusTable,
  UsersSelectedSummary,
  Filter,
  UsersSelected,
} from "../../../../styles/Dashboard/CreateActionPageStyles";

// Assets and utils
import { useTableWidth } from "../../../../utils/tableWidth";

const ChangeUserStatus = ({ setItemsSelected, itemsSelected, setAction }) => {
  const { t } = useTranslation();

  const [usersToSelect, setUsersToSelect] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);
  const users = useSelector(getUsers);

  useEffect(() => {
    setUsersToSelect(users);
  }, [users]);

  const columns = [
    { name: "select", width: 10, min: 100 },
    { name: "name", width: 30, min: 100 },
    { name: "email", width: 30, min: 100 },
    { name: "referralCode", width: 30, min: 100 },
  ];

  const tableWidth = useTableWidth(columns, "ChangeUserStatusTable");

  const addToSelection = (user) => {
    // change state
    setUsersToSelect(
      usersToSelect.map((userElem) => {
        if (userElem._id === user._id) {
          return { ...userElem, select: true };
        }

        return userElem;
      })
    );

    // add to users selected list
    setUsersSelected([...usersSelected, user]);
  };

  const removeFromSelection = (user) => {
    // change select state
    setUsersToSelect(
      usersToSelect.map((userElem) => {
        if (userElem._id === user._id) {
          return { ...userElem, select: false };
        }

        return userElem;
      })
    );

    // remove to users selected list
    setUsersSelected(
      usersSelected.filter((userElem) => userElem._id !== user._id)
    );
  };

  const [usersSelectedIsOpen, setUsersSelectedIsOpen] = useState(false);

  const [filterAttribute, setFilterAttribute] = useState(null);
  const [filterData, setFilterData] = useState("");
  const filterOption = [
    { label: "Ninguno", value: null },
    { label: "Codigo de referido", value: "referralCode" },
    { label: "Nombre", value: "firstName" },
    { label: "Apellido", value: "lastName" },
  ];

  return (
    <>
      <UserSelectedTable
        usersSelected={usersSelected}
        setUsersSelected={setUsersSelected}
        usersSelectedIsOpen={usersSelectedIsOpen}
        setUsersSelectedIsOpen={setUsersSelectedIsOpen}
        removeFromSelection={removeFromSelection}
        setAction={setAction}
      />
      <ChangeUserStatusTable className="ChangeUserStatusTable">
        {!usersSelectedIsOpen && (
          <>
            <Filter className="filter">
              <p>Filtro : </p>
              <input
                className="filterData"
                type="text"
                onChange={(e) => setFilterData(e.target.value)}
              />
              <div className="selectWrapper">
                <Select
                  options={filterOption}
                  onChange={({ value }) => setFilterAttribute(value)}
                />
              </div>
            </Filter>
            <div className="thead">
              <div className="tr" style={{ ...tableWidth }}>
                <div className="th select"></div>
                <div className="th name">Nombre</div>
                <div className="th email">Email</div>
                <div className="th referralCode">Codigo de referido</div>
              </div>
            </div>
            <div className="tbody">
              {usersToSelect
                .filter((user) => {
                  if (filterAttribute === null) {
                    return true;
                  }

                  return user[filterAttribute]
                    .toLowerCase()
                    .includes(filterData.toLowerCase());
                })
                .map((user, index) => {
                  const { firstName, lastName, email, referralCode, select } =
                    user;
                  return (
                    <div className="tr" key={index} style={{ ...tableWidth }}>
                      <div className="td select">
                        {!select && (
                          <div
                            className="box-select"
                            onClick={() => addToSelection(user)}
                          ></div>
                        )}
                        {select && (
                          <div
                            className="box-selected"
                            onClick={() => removeFromSelection(user)}
                          ></div>
                        )}
                      </div>
                      <div className="td name">{`${firstName} ${lastName}`}</div>
                      <div className="td email">{email}</div>
                      <div className="td referralCode">{referralCode}</div>{" "}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </ChangeUserStatusTable>
    </>
  );
};

export default ChangeUserStatus;

const UserSelectedTable = (props) => {
  const {
    usersSelected,
    setUsersSelected,
    usersSelectedIsOpen,
    setUsersSelectedIsOpen,
    removeFromSelection,
    setAction,
  } = props;

  const columns = [
    { name: "select", width: 10, min: 100 },
    { name: "name", width: 15, min: 100 },
    { name: "email", width: 20, min: 100 },
    { name: "referralCode", width: 15, min: 100 },
    { name: "status", width: 15, min: 100 },
    { name: "statusObservation", width: 20, min: 100 },
  ];

  const tableWidth = useTableWidth(columns, "ChangeUserStatusTable");

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  // Validation
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
  } = useForm();

  const { id } = useSelector(getUser);

  const onSubmit = async (data) => {
    const informationToSend = Object.keys(data).map((key) => ({
      item: key,
      action: `Status changed to ${data[key].status[0].toUpperCase()}${data[
        key
      ].status.slice(1)}`,
      modification: {
        status: data[key].status,
        statusObservation: data[key].statusObservation || "",
      },
    }));

    const action = {
      action: "User status change",
      createdBy: id,
      target: "user",
      details: informationToSend,
    };

    try {
      const response = await axios.post(
        "/api/actions/change-user-status",
        action
      );

      // clean selections
      setAction("");
    } catch ({ response }) {}
  };

  return (
    <UsersSelected>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UsersSelectedSummary>
          <button
            type="button"
            onClick={() => setUsersSelectedIsOpen(!usersSelectedIsOpen)}
          >
            {!usersSelectedIsOpen ? "Ver selecionados" : "Ocultar selecionados"}
          </button>
          {usersSelectedIsOpen && (
            <p>Usuarios selecionados : {usersSelected.length}</p>
          )}

          {usersSelectedIsOpen && <button type="submit">Enviar</button>}
        </UsersSelectedSummary>
        {usersSelectedIsOpen && (
          <>
            <div className="thead">
              <div className="tr" style={{ ...tableWidth }}>
                <div className="th select"></div>
                <div className="th name">Nombre</div>
                <div className="th email">Email</div>
                <div className="th referralCode">Codigo de referido</div>
                <div className="th status">Estado</div>
                <div className="th statusObservation">Observacion</div>
              </div>
            </div>
            <div className="tbody">
              {usersSelected.map((user, index) => {
                const {
                  firstName,
                  lastName,
                  email,
                  referralCode,
                  select,
                  _id,
                } = user;
                return (
                  <div className="tr" key={index} style={{ ...tableWidth }}>
                    <div className="td select">
                      {select && <div className="box-select"></div>}
                      {!select && <div className="box-selected"></div>}
                    </div>
                    <div className="td name">{`${firstName} ${lastName}`}</div>
                    <div className="td email">{email}</div>
                    <div className="td referralCode">{referralCode}</div>{" "}
                    <div className="td status">
                      <Controller
                        name={`${_id}.status`}
                        control={control}
                        rules={{
                          required: {
                            value: true,
                          },
                        }}
                        render={({ field: { onChange } }) => (
                          <div className="inputWrapper">
                            <Select
                              className={`select ${
                                errors &&
                                errors[_id] &&
                                errors[_id].status &&
                                "error"
                              } `}
                              options={statusOptions}
                              onChange={({ value }) => {
                                onChange(value);
                              }}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="td statusObservation">
                      <div className="inputWrapper">
                        <input
                          type="text"
                          {...register(`${_id}.statusObservation`)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </form>
    </UsersSelected>
  );
};
