import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getUsers, requestUsers, getUserState } from "../../../store/entities/users";
import { getUser } from "../../../store/auth/auth";
import { getProducts, requestProducts, getProductsState } from "../../../store/entities/products";
import { createOrder as createOrderRequest } from "../../../store/entities/orders";
import { useSelector, useDispatch } from "react-redux";
import newUsersRentalPayment from "./functions/newUsersRentalPayment";
import referralPayment from "./functions/referralPayment";
import rentalPayment from "./functions/rentalPayment";
import { useTableWidth } from "../../../utils/tableWidth";

// Styles
import {
  CreateOrder,
  CreateOrderButton,
  Title,
  CreateOrderWrapper,
  OrderWrapper,
  OrderConcept,
  OrderConfirmation,
  Header,
  Close,
} from "../../../styles/Dashboard/CreateOrderPageStyles";

// Assets
import { ReactComponent as CloseSvg } from "../../../assets/svgs/close.svg";

const CreateOrderPage = ({ createOrderIsOpen, setCreateOrderIsOpen }) => {
  const closeCreateOrder = () => setCreateOrderIsOpen(false);

  const { id } = useSelector(getUser);
  const [order, setOrder] = useState({
    product: "",
    concept: "",
    createdBy: id,
    payees: "",
  });

  const ordersOptions = [
    { value: "firstFortnight", label: "First fortnight rental payment" },
    { value: "secondFornight", label: "Second fortnight rental payment" },
    {
      value: "newUserRental",
      label: "New rental users payment",
    },
    { value: "referral", label: "Referrals payment" },
  ];

  const columns = [
    { column: "name", width: 20, min: 80 },
    { column: "email", width: 20, min: 130 },
    { column: "paymentMethod", width: 20, min: 80 },
    { column: "concept", width: 30, min: 100 },
    { column: "amount", width: 10, min: 70 },
  ];
  const [payments, setPayments] = useState([]);

  // This provides a table width behavior. All of the columns are going to have the same width
  const tableWidth = useTableWidth(columns, "CreateOrder");

  // Order actions
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const { loading: usersLoading } = useSelector(getUserState);
  const products = useSelector(getProducts);
  const { loading: productsLoading } = useSelector(getProductsState);

  useEffect(() => {
    dispatch(requestUsers());
    dispatch(requestProducts());
  }, []);

  const [orderAction, setOrderAction] = useState(null);
  const onChangeAction = (v) => {
    const action = v.value;
    setOrderAction(action);
  };

  const createOrder = () => {
    switch (orderAction) {
      case "firstFortnight":
        return rentalPayment(1, users, products, order, setPayments, setOrder);
      case "secondFornight":
        return rentalPayment(2, users, products, order, setPayments, setOrder);
      case "referral":
        return referralPayment(users, products, order, setPayments, setOrder);
      case "newUserRental":
        return newUsersRentalPayment(users, products, order, setPayments, setOrder);
      default:
        return setPayments([]);
    }
  };

  const createOrderDisabled = usersLoading || productsLoading || users.length === 0 || products.length === 0;

  const [sendingOrder, setSendingOrder] = useState(false);
  const sendOrder = async () => {
    await setSendingOrder(true);
    try {
      const response = await dispatch(createOrderRequest(order));
      console.log(response);
      if (response) {
        setPayments([]);
        setSendingOrder(false);
      }
    } catch (error) {
      console.log(error);
      setSendingOrder(false);
    }
  };

  const { t } = useTranslation();

  return (
    <CreateOrder className="CreateOrder">
      <Header>
        <Title>{t("orders.create_order.title")}</Title>
        <Close onClick={closeCreateOrder}>
          <CloseSvg />
        </Close>
      </Header>
      <CreateOrderWrapper>
        <Select className="ordersOptions" options={ordersOptions} onChange={(v) => onChangeAction(v)} />
        <CreateOrderButton onClick={createOrder} disabled={createOrderDisabled}>
          {t("orders.create_order.create_order_button")}
        </CreateOrderButton>
      </CreateOrderWrapper>
      <OrderConcept>{order.concept}</OrderConcept>

      <OrderWrapper className="displayAdmin">
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th name">{t("orders.create_order.name")}</div>
            <div className="th email">{t("orders.create_order.email")}</div>
            <div className="th paymentMethod">{t("orders.create_order.payment_method")}</div>
            <div className="th concept">{t("orders.create_order.concept")}</div>
            <div className="th amount">{t("orders.create_order.amount")}</div>
          </div>
        </div>
        <div className="tbody">
          {payments.map((payment, index) => {
            const { firstName, lastName, email, paymentMethod, concept, amount } = payment;
            return (
              <div className="tr" key={index} style={{ ...tableWidth }}>
                <div className="th name">{`${firstName} ${lastName}`}</div>
                <div className="th email">{email}</div>
                <div className="th paymentMethod">{`${paymentMethod[0].toUpperCase()}${paymentMethod.slice(1)}`}</div>
                <div className="th concept">{concept}</div>
                <div className="th amount">{`$ ${amount.toFixed(2)}`}</div>
              </div>
            );
          })}
        </div>
      </OrderWrapper>
      {order.concept && (
        <OrderConfirmation>
          <button disabled={sendingOrder} onClick={sendOrder}>
            {t("orders.create_order.confirm_order_button")}
          </button>
        </OrderConfirmation>
      )}
    </CreateOrder>
  );
};

export default CreateOrderPage;
