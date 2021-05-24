import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  getUsers,
  requestUsers,
  getUserState,
} from "../../../store/entities/users";
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
} from "../../../styles/Dashboard/CreateOrderPageStyles";

const CreateOrderPage = () => {
  const ordersOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const loading = false;
  const [payments, setPayments] = useState([]);

  const [tableWidth, setTableWidth] = useState(null);
  // This provides a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const width = () =>
      setTableWidth(() => {
        const parentWidth = document.querySelector(".CreateOrder").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "name",
            width: 20,
            min: 150,
          },
          {
            column: "email",
            width: 20,
            min: 100,
          },
          {
            column: "paymentMethod",
            width: 20,
            min: 100,
          },
          {
            column: "concept",
            width: 30,
            min: 100,
          },
          {
            column: "amount",
            width: 10,
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

  // Order actions
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const { loading: usersLoading } = useSelector(getUserState);
  const products = useSelector(getProducts);
  const { loading: productsLoading } = useSelector(getProductsState);

  const rentalPayment = (period) => {
    const firstFortnightUsers = users.filter((user, index) => {
      return user.fortnight === period;
    });

    const product = products.find((product) => product.abrv === "rental");

    const concept = (userTier) => {
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

    const paymentsInfo = () =>
      firstFortnightUsers.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        paymentMethod: user.paymentMethod,
        concept: concept(),
        amount: amount(user.payments.tier),
      }));

    setPayments(paymentsInfo);

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

      const hasBeenPayed = user.referralHasBeenPayed === false;

      return status && lastMonth && hasBeenPayed;
    });

    const product = products.find((product) => product.abrv === "referral");

    const concept = (firstName, lastName) => {
      const concept = `${product.name} : ${firstName} ${lastName}`;
      return concept;
    };

    const amount = (userTier) => {
      console.log("userTier", userTier);

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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        paymentMethod: user.paymentMethod,
        concept: concept(referral.firstName, referral.lastName),
        amount: amount(user.payments && user.payments.tier),
      };
    });

    setPayments(referralPaymentInformation);

    return referralPaymentInformation;
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
      case "chocolate":
        return rentalPayment(1);
      case "strawberry":
        return rentalPayment(2);
      case "vanilla":
        return referralPayment();
      default:
        return "";
    }
  };

  return (
    <CreateOrder className="CreateOrder">
      <Title>Creating an order</Title>
      <CreateOrderWrapper>
        <Select
          className="ordersOptions"
          options={ordersOptions}
          onChange={(v) => onChangeAction(v)}
        />
        <CreateOrderButton
          onClick={createOrder}
          disabled={usersLoading || productsLoading}
        >
          Create order
        </CreateOrderButton>
      </CreateOrderWrapper>
      <OrderWrapper className="displayAdmin">
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th name">Name</div>
            <div className="th email">Email</div>
            <div className="th paymentMethod">Payment method</div>
            <div className="th concept">Concept</div>
            <div className="th amount">Amount</div>
          </div>
        </div>
        <div className="tbody">
          {payments.map((payment) => {
            const {
              firstName,
              lastName,
              email,
              paymentMethod,
              concept,
              amount,
            } = payment;
            return (
              <div className="tr" style={{ ...tableWidth }}>
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
    </CreateOrder>
  );
};

export default CreateOrderPage;
