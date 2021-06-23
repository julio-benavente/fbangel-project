import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/auth/auth";
import { getOrders, getOrdersState, requestOrders } from "../../../store/entities/orders";
import { requestPayments } from "../../../store/entities/payments";
import Pagination from "rc-pagination";
import { useTranslation } from "react-i18next";
import { changeOrderStatus } from "../../../store/entities/orders";

// Components
import CreateOrder from "./CreateOrderPage";
import PaymentsTable from "./PaymentsTable";
import { PaginationWrapper } from "../../../styles/Dashboard/PaginationStyles";

// Styles
import { Title, Table, Orders, Header, CreateOrderButton } from "../../../styles/Dashboard/OrdersPageStyles";
import { ReactComponent as ArrowSvg } from "../../../assets/svgs/bold_arrow.svg";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);

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
        const parentWidth = document.querySelector(".Orders").offsetWidth;
        const padding = parentWidth * 0.07 * 2;
        const realWidth = parentWidth - padding;

        const columns = [
          {
            column: "concept",
            width: 30,
            min: 150,
          },
          {
            column: "status",
            width: 10,
            min: 80,
          },
          {
            column: "date",
            width: 15,
            min: 80,
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

  const [createOrderIsOpen, setCreateOrderIsOpen] = useState(false);
  const openCreateOrder = () => setCreateOrderIsOpen(true);

  const orders = useSelector(getOrders);

  const { loading } = useSelector(getOrdersState);

  useEffect(() => {
    dispatch(requestOrders());
    dispatch(requestPayments());
  }, []);

  // PAGINATION
  const [pageSize, setPagSize] = useState(15);
  const [totalPages, setTotalPages] = useState(null);
  const [current, setCurrent] = useState(1);

  // Select the rows to display on the table
  const [showRows, setShowRows] = useState([]);

  useEffect(() => {
    setTotalPages(orders.length - 1);
  }, [orders, totalPages]);

  const onTableChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    const selectRows = (current, pageSize) => {
      const _1 = pageSize * current - pageSize;
      const _2 = pageSize * current;

      return orders.slice(_1, _2);
    };
    setShowRows(selectRows(current, pageSize));
  }, [orders, current, pageSize]);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("orders.title");
  }, [language]);

  return (
    <Orders className="Orders">
      {createOrderIsOpen && (
        <CreateOrder createOrderIsOpen={createOrderIsOpen} setCreateOrderIsOpen={setCreateOrderIsOpen} />
      )}
      <Header>
        <Title>{t("orders.title")}</Title>
        <CreateOrderButton onClick={openCreateOrder}>{t("orders.create_order_button")}</CreateOrderButton>
      </Header>

      <Table className="displayUser">
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th concept">{t("orders.concept")}</div>
            <div className="th status">{t("orders.status")}</div>
            <div className="th date">{t("orders.creation_date")}</div>
            <div className="th payments">{t("orders.payments")}</div>
            <div className="th update">{t("orders.update")}</div>
          </div>
        </div>
        <div className="tbody">
          {loading && (
            <div className="tr loading" style={{ ...tableWidth }}>
              {t("loading")}
            </div>
          )}

          {!loading &&
            showRows.map((order, index) => {
              return <Row key={index} order={order} tableWidth={tableWidth} />;
            })}
        </div>
        <PaginationWrapper>
          <Pagination
            onChange={onTableChange}
            current={current}
            total={totalPages}
            defaultPageSize={pageSize}
            showPrevNextJumpers={false}
            prevIcon={() => <ArrowSvg className="left_arrow" />}
            nextIcon={() => <ArrowSvg className="right_arrow" />}
            ArrowSvg
          />
        </PaginationWrapper>
      </Table>
    </Orders>
  );
};

export default OrdersPage;

const Row = ({ order, tableWidth }) => {
  const { concept, paypalEmail, creationDate, amount, status, payments, _id: orderId } = order;

  const dispatch = useDispatch();

  const date = new Date(creationDate).toLocaleDateString([], {
    day: "2-digit",
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
        dispatch(changeOrderStatus({ status, order: orderId }));
        // var response = await axios.put(`/api/orders/change-status/${status}`, {
        //   order: orderId,
        // });
      }

      if (status === "cancelOrder") {
        dispatch(changeOrderStatus({ status, order }));

        // var response = await axios.put(`/api/orders/change-status/${status}`, {
        //   order: orderId,
        // });
      }

      setLoading(false);
      cancelUpdate();
    } catch ({ response }) {
      setLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <div className="tr" style={{ ...tableWidth }}>
        <div className="td concept">{concept}</div>
        <div className={`td status ${status}`}>{`${status[0].toUpperCase()}${status.slice(1)}`}</div>
        <div className="td date">{date}</div>
        <div className="td payments">
          <button onClick={handlePayments}>{t("orders.payments")}</button>
        </div>
        <div className="td update">
          {!updateIsOn && (
            <button className="updateBtn" onClick={updateOrder}>
              {t("orders.update_button")}
            </button>
          )}
          {updateIsOn && (
            <>
              <button className="approveBtn" disabled={loading} onClick={() => changeStatus("payOrder")}>
                {t("orders.approve_button")}
              </button>
              <button className="rejectBtn" disabled={loading} onClick={() => changeStatus("cancelOrder")}>
                {t("orders.reject_button")}
              </button>
              <button className="cancelBtn" disabled={loading} onClick={cancelUpdate}>
                {t("orders.cancel_button")}
              </button>
            </>
          )}
        </div>
      </div>
      {paymentsIsOn && <PaymentsTable payments={payments} />}
    </>
  );
};
