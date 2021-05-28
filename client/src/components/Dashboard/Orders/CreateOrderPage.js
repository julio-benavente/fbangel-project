import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  getUsers,
  requestUsers,
  getUserState,
} from "../../../store/entities/users";
import { getUser } from "../../../store/auth/auth";
import {
  getProducts,
  requestProducts,
  getProductsState,
} from "../../../store/entities/products";
import { useSelector, useDispatch } from "react-redux";

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

  const loading = false;
  const [payments, setPayments] = useState([]);

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

        const parentWidth = document.querySelector(".CreateOrder").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "name",
            width: 20,
            min: 80,
          },
          {
            column: "email",
            width: 20,
            min: 130,
          },
          {
            column: "paymentMethod",
            width: 20,
            min: 80,
          },
          {
            column: "concept",
            width: 30,
            min: 100,
          },
          {
            column: "amount",
            width: 10,
            min: 70,
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

  // Order actions
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const { loading: usersLoading } = useSelector(getUserState);
  const products = useSelector(getProducts);
  const { loading: productsLoading } = useSelector(getProductsState);

  const rentalPayment = (fortnightPeriod) => {
    const fortnightUsers = users.filter((user, index) => {
      const userType = user.userType === "rental";
      const status = user.status === "active";
      const period = user.fortnight === fortnightPeriod;

      return userType && status && period;
    });

    const product = products.find((product) => product.abrv === "rental");

    const concept = () => {
      const months = {
        1: "JAN",
        2: "FEB",
        3: "MAR",
        4: "APR",
        5: "MAY",
        6: "JUN",
        7: "JULY",
        8: "AUG",
        9: "SET",
        10: "OCT",
        11: "NOV",
        12: "DEC",
      };
      const [month, year] = [new Date().getMonth(), new Date().getFullYear()];
      const concept = `${product.name} : ${
        months[month + 1]
      }-${year} (${fortnightPeriod}) `;
      return concept;
    };

    const amount = (userTier) => {
      const tier = product.prices.find(
        (prodcut) => prodcut.tierName === userTier
      );
      return tier.price;
    };

    const paymentsInfo = fortnightUsers.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      paymentMethod: user.paymentMethod,
      concept: concept(),
      amount: amount(user.payments.tier),
    }));

    setPayments(paymentsInfo);
    setOrder({
      ...order,
      product: product._id,
      concept: concept(),
      payees: paymentsInfo,
    });
    return paymentsInfo;
  };

  const referralPayment = () => {
    const thisMonthReferrals = users.filter((user, index) => {
      const status = user.status === "active";

      const date = new Date();
      const firstDayLastMonth = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        1
      );
      const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);

      const lastMonth =
        firstDayLastMonth <= new Date(user.creationDate) &&
        new Date(user.creationDate) <= lastDayLastMonth;

      const hasBeenPayed = user.referralHasBeenPaid === false;

      return status && lastMonth && hasBeenPayed;
    });

    const product = products.find((product) => product.abrv === "referral");

    const concept = (firstName, lastName) => {
      const concept = `${product.name} : ${firstName} ${lastName}`;
      return concept;
    };

    const amount = (userTier) => {
      const tier = product.prices.find(
        (prodcut) => prodcut.tierName === userTier
      );

      return tier.price;
    };

    const referralPaymentInformation = thisMonthReferrals.map((referral) => {
      const user = users.filter(
        (user) => user.referralCode === referral.referral
      )[0];

      return {
        id: user._id,
        referral: referral._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        paymentMethod: user.paymentMethod,
        concept: concept(referral.firstName, referral.lastName),
        amount: amount(user.payments && user.payments.tier),
      };
    });

    setPayments(referralPaymentInformation);

    setOrder({
      ...order,
      product: product._id,
      concept: product.name,
      payees: referralPaymentInformation,
    });

    return referralPaymentInformation;
  };

  const newUsersRentalPayment = () => {
    const newRentalPayments = users.filter((user, index) => {
      const userType = user.userType === "rental";
      const status = user.status === "active";
      const firstRental = user.payments.firstRentPayed === false;

      console.log(userType && status && firstRental);
      return userType && status && firstRental;
    });

    const product = products.find((product) => product.abrv === "rental");

    const concept = () => {
      const months = {
        1: "JAN",
        2: "FEB",
        3: "MAR",
        4: "APR",
        5: "MAY",
        6: "JUN",
        7: "JULY",
        8: "AUG",
        9: "SET",
        10: "OCT",
        11: "NOV",
        12: "DEC",
      };
      const [month, year] = [new Date().getMonth(), new Date().getFullYear()];
      const concept = `${product.name} : ${months[month + 1]}-${year}`;
      return concept;
    };

    const amount = (userTier) => {
      const tier = product.prices.find(
        (prodcut) => prodcut.tierName === userTier
      );
      return tier.price;
    };

    const paymentsInfo = newRentalPayments.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      paymentMethod: user.paymentMethod,
      concept: concept(),
      amount: amount(user.payments.tier),
    }));

    setPayments(paymentsInfo);

    console.log({
      ...order,
      product: product._id,
      concept: product.name,
      payees: paymentsInfo,
    });

    setOrder({
      ...order,
      product: product._id,
      concept: product.name,
      payees: paymentsInfo,
    });

    return paymentsInfo;
  };

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
        return rentalPayment(1);
      case "secondFornight":
        return rentalPayment(2);
      case "referral":
        return referralPayment();
      case "newUserRental":
        return newUsersRentalPayment();
      default:
        return setPayments([]);
    }
  };

  const createOrderDisabled =
    usersLoading ||
    productsLoading ||
    users.length === 0 ||
    products.length === 0;

  const [sendingOrder, setSendingOrder] = useState(false);
  const sendOrder = async () => {
    setSendingOrder(true);
    try {
      const response = await axios.post("/api/orders/create-order", order);
      if (response) {
        console.log(response);
        setPayments([]);
        setSendingOrder(false);
      }
    } catch ({ response }) {
      console.log(response);
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
        <Select
          className="ordersOptions"
          options={ordersOptions}
          onChange={(v) => onChangeAction(v)}
        />
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
            <div className="th paymentMethod">
              {t("orders.create_order.payment_method")}
            </div>
            <div className="th concept">{t("orders.create_order.concept")}</div>
            <div className="th amount">{t("orders.create_order.amount")}</div>
          </div>
        </div>
        <div className="tbody">
          {payments.map((payment, index) => {
            const {
              firstName,
              lastName,
              email,
              paymentMethod,
              concept,
              amount,
            } = payment;
            return (
              <div className="tr" key={index} style={{ ...tableWidth }}>
                <div className="th name">{`${firstName} ${lastName}`}</div>
                <div className="th email">{email}</div>
                <div className="th paymentMethod">{`${paymentMethod[0].toUpperCase()}${paymentMethod.slice(
                  1
                )}`}</div>
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
