import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/auth/auth";
import {
  getOrders,
  getOrdersState,
  requestOrders,
} from "../../../store/entities/orders";
import axios from "axios";

// Components
import CreateOrder from "./CreateOrderPage";
import PaymentsTable from "./PaymentsTable";

// Styles
import {
  Title,
  Table,
  Orders,
  Header,
  CreateOrderButton,
} from "../../../styles/Dashboard/OrdersPageStyles";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const [tableWidth, setTableWidth] = useState(null);
  // This provides a table width behavior. All of the columns are going to have the same width
  useEffect(() => {
    const width = () =>
      setTableWidth(() => {
        const parentWidth = document.querySelector(".Orders").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "concept",
            width: 30,
            min: 200,
          },
          {
            column: "status",
            width: 10,
            min: 100,
          },
          {
            column: "date",
            width: 15,
            min: 100,
          },
          {
            column: "payments",
            width: 15,
            min: 100,
          },
          {
            column: "buttons",
            width: 25,
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

  const [createOrderIsOpen, setCreateOrderIsOpen] = useState(false);
  const openCreateOrder = () => setCreateOrderIsOpen(true);

  const orders = useSelector(getOrders);
  const { loading } = useSelector(getOrdersState);

  useEffect(() => {
    dispatch(requestOrders());
  }, []);

  return (
    <Orders className="Orders">
      {createOrderIsOpen && (
        <CreateOrder
          createOrderIsOpen={createOrderIsOpen}
          setCreateOrderIsOpen={setCreateOrderIsOpen}
        />
      )}
      <Header>
        <Title>Orders</Title>
        <CreateOrderButton onClick={openCreateOrder}>
          Create order
        </CreateOrderButton>
      </Header>

      <Table className="displayUser">
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th concept">Concepto</div>
            <div className="th status">Status</div>
            <div className="th date">Creation date</div>
            <div className="th payments">Payments</div>
            <div className="th update">Update</div>
          </div>
        </div>
        <div className="tbody">
          {loading && (
            <div className="tr loading" style={{ ...tableWidth }}>
              Cargando...
            </div>
          )}

          {!loading &&
            orders.map((order, index) => {
              return <Row key={index} order={order} tableWidth={tableWidth} />;
            })}
        </div>
      </Table>
    </Orders>
  );
};

export default OrdersPage;

const Row = ({ order, tableWidth }) => {
  const {
    concept,
    paypalEmail,
    creationDate,
    amount,
    status,
    payments,
    _id: orderId,
  } = order;

  const date = new Date(creationDate).toLocaleDateString([], {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  });

  const [paymentsIsOn, setPaymentsIsOn] = useState(false);
  const handlePayments = () => setPaymentsIsOn(!paymentsIsOn);

  const [updateIsOn, setUpdateIsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelUpdate = () => setUpdateIsOn(false);
  const updateOrder = () => setUpdateIsOn(true);
  const changeStatus = async (status) => {
    setLoading(true);

    try {
      if (status === "payOrder") {
        var response = await axios.put(`/api/orders/change-status/${status}`, {
          order: orderId,
        });
      }

      if (status === "cancelOrder") {
        var response = await axios.put(`/api/orders/change-status/${status}`, {
          order: orderId,
        });
      }

      setLoading(false);
      cancelUpdate();

      console.log(response);
    } catch ({ response }) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="tr" style={{ ...tableWidth }}>
        <div className="td concept">{concept}</div>
        <div
          className={`td status ${status}`}
        >{`${status[0].toUpperCase()}${status.slice(1)}`}</div>
        <div className="td date">{date}</div>
        <div className="td payments">
          <button onClick={handlePayments}>Payments</button>
        </div>
        <div className="td update">
          {!updateIsOn && (
            <button className="updateBtn" onClick={updateOrder}>
              Update order
            </button>
          )}
          {updateIsOn && (
            <>
              <button
                className="approveBtn"
                disabled={loading}
                onClick={() => changeStatus("payOrder")}
              >
                Approve
              </button>
              <button
                className="rejectBtn"
                disabled={loading}
                onClick={() => changeStatus("cancelOrder")}
              >
                Reject
              </button>
              <button
                className="cancelBtn"
                disabled={loading}
                onClick={cancelUpdate}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      {paymentsIsOn && <PaymentsTable payments={payments} />}
    </>
  );
};
