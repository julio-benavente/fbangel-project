import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getUsers } from "../../../../store/entities/users";
import { getUser } from "../../../../store/auth/auth";
import { changeUserStatus } from "../../../../store/entities/actions";

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
    { name: "name", width: 20, min: 100 },
    { name: "email", width: 30, min: 100 },
    { name: "status", width: 20, min: 100 },
    { name: "referralCode", width: 20, min: 100 },
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
    setUsersSelected(usersSelected.filter((userElem) => userElem._id !== user._id));
  };

  const [usersSelectedIsOpen, setUsersSelectedIsOpen] = useState(false);

  const [filterAttribute, setFilterAttribute] = useState(null);
  const [filterData, setFilterData] = useState("");
  const filterOption = [
    { label: t("actions.change_user_status.none"), value: null },
    {
      label: t("actions.change_user_status.referral_code"),
      value: "referralCode",
    },
    { label: t("actions.change_user_status.email"), value: "email" },
    { label: t("actions.change_user_status.first_name"), value: "firstName" },
    { label: t("actions.change_user_status.last_name"), value: "lastName" },
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
              <p>{t("actions.change_user_status.filter")} : </p>
              <input className="filterData" type="text" onChange={(e) => setFilterData(e.target.value)} />
              <div className="selectWrapper">
                <Select options={filterOption} onChange={({ value }) => setFilterAttribute(value)} />
              </div>
            </Filter>
            <div className="thead">
              <div className="tr" style={{ ...tableWidth }}>
                <div className="th select"></div>
                <div className="th name">{t("actions.change_user_status.first_name")}</div>
                <div className="th email">{t("actions.change_user_status.email")}</div>
                <div className={`td status`}>{t("actions.change_user_status.status")}</div>

                <div className="th referralCode">{t("actions.change_user_status.referral_code")}</div>
              </div>
            </div>
            <div className="tbody">
              {usersToSelect
                .filter((user) => {
                  if (filterAttribute === null) {
                    return true;
                  }

                  return user[filterAttribute].toLowerCase().includes(filterData.toLowerCase());
                })
                .map((user, index) => {
                  const { firstName, lastName, email, referralCode, select, status } = user;
                  return (
                    <div className="tr" key={index} style={{ ...tableWidth }}>
                      <div className="td select">
                        {!select && <div className="box-select" onClick={() => addToSelection(user)}></div>}
                        {select && <div className="box-selected" onClick={() => removeFromSelection(user)}></div>}
                      </div>
                      <div className="td name">{`${firstName} ${lastName}`}</div>
                      <div className="td email">{email}</div>
                      <div className={`td status ${status}`}>{`${status[0].toUpperCase()}${status.slice(1)}`}</div>
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

  const dispatch = useDispatch();

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
    { label: "Active", value: "active" },
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
      action: `Status changed to ${data[key].status[0].toUpperCase()}${data[key].status.slice(1)}`,
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
      const response = await dispatch(changeUserStatus(action));
      console.log("page response", response);
      // clean selections
      setAction("");
    } catch ({ response }) {}
  };

  const { t } = useTranslation();

  return (
    <UsersSelected>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UsersSelectedSummary>
          <button type="button" onClick={() => setUsersSelectedIsOpen(!usersSelectedIsOpen)}>
            {!usersSelectedIsOpen ? "Ver selecionados" : "Ocultar selecionados"}
          </button>
          {usersSelectedIsOpen && (
            <p>
              {t("actions.change_user_status.users_selected")} : {usersSelected.length}
            </p>
          )}

          {usersSelectedIsOpen && <button type="submit">{t("actions.change_user_status.send")}</button>}
        </UsersSelectedSummary>
        {usersSelectedIsOpen && (
          <>
            <div className="thead">
              <div className="tr" style={{ ...tableWidth }}>
                <div className="th select"></div>
                <div className="th name">{t("actions.change_user_status.name")}</div>
                <div className="th email">{t("actions.change_user_status.email")}</div>
                <div className="th referralCode">{t("actions.change_user_status.referral_code")}</div>
                <div className="th status">{t("actions.change_user_status.status")}</div>
                <div className="th statusObservation">{t("actions.change_user_status.observation")}</div>
              </div>
            </div>
            <div className="tbody">
              {usersSelected.map((user, index) => {
                const { firstName, lastName, email, referralCode, select, _id } = user;
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
                              className={`select ${errors && errors[_id] && errors[_id].status && "error"} `}
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
                        <input type="text" {...register(`${_id}.statusObservation`)} />
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
