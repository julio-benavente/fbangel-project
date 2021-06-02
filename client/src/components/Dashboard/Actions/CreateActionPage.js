import React, { useState, useEffect } from "react";
import { CreateAction } from "../../../styles/Dashboard/CreateActionPageStyles";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  requestUsers,
  getUserState,
  getUsers,
} from "../../../store/entities/users";
import { getUser } from "../../../store/auth/auth";
import ChangeUserStatus from "./Actions/ChangeUserStatus";

// Styles
import {
  Header,
  Title,
  Close,
  ChangeUserStatusTable,
  CreateActionWrapper,
  CreateActionButton,
  UsersSelected,
  UsersSelectedSummary,
  Filter,
} from "../../../styles/Dashboard/CreateActionPageStyles";

// Assets
import { ReactComponent as CloseSvg } from "../../../assets/svgs/close.svg";

const CreateActionPage = ({ setCreateActionPageIsOpen }) => {
  const { t } = useTranslation();

  const closeCreateOrder = () => {
    setCreateActionPageIsOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers());
  }, []);

  const [itemsSelected, setItemsSelected] = useState();

  const [action, setAction] = useState("");
  const [actionOptionSelected, setActionOptionSelected] = useState("");
  const actionsOptions = [
    { label: "Change user state", value: "changeUserState" },
  ];
  return (
    <CreateAction>
      <Header>
        <Title>{t("orders.create_order.title")}</Title>
        <Close onClick={closeCreateOrder}>
          <CloseSvg />
        </Close>
      </Header>
      <CreateActionWrapper>
        <Select
          className="select"
          options={actionsOptions}
          onChange={({ value }) => setActionOptionSelected(value)}
        />
        <CreateActionButton onClick={() => setAction(actionOptionSelected)}>
          Crear accion
        </CreateActionButton>
      </CreateActionWrapper>
      {action === "changeUserState" && (
        <ChangeUserStatus
          setItemsSelected={setItemsSelected}
          itemsSelected={itemsSelected}
          setAction={setAction}
        />
      )}
    </CreateAction>
  );
};

export default CreateActionPage;
