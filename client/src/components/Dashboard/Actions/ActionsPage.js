import React, { useState, useEffect } from "react";
import { useTableWidth } from "../../../utils/tableWidth";
import { useTranslation } from "react-i18next";
import Pagination from "rc-pagination";
import {
  getActions,
  getActionsState,
  requestActions,
} from "../../../store/entities/actions";
import { useDispatch, useSelector } from "react-redux";
import CreateActionPage from "./CreateActionPage";

// Components
import UserRow from "./UserRow";

// Styles
import {
  Actions,
  Header,
  CreateOrderButton,
  Table,
  Title,
} from "../../../styles/Dashboard/ActionsPageStyles";
import { PaginationWrapper } from "../../../styles/Dashboard/PaginationStyles";

const ActionsPage = () => {
  const dispatch = useDispatch();
  const actions = useSelector(getActions);
  const { loading } = useSelector(getActionsState);

  useEffect(() => {
    dispatch(requestActions());
  }, []);

  // This provides a table width behavior. All of the columns are going to have the same width
  const columns = [
    {
      column: "action",
      width: 55,
      min: 100,
    },
    {
      column: "creationDate",
      width: 15,
      min: 80,
    },
    {
      column: "target",
      width: 15,
      min: 80,
    },
    {
      column: "details",
      width: 15,
      min: 100,
    },
  ];
  const tableWidth = useTableWidth(columns, "Actions");
  const { t } = useTranslation();

  // PAGINATION
  const [pageSize, setPagSize] = useState(15);
  const [totalPages, setTotalPages] = useState(null);
  const [current, setCurrent] = useState(1);

  const openCreateOrder = () => {
    setCreateActionPageIsOpen(true);
  };

  useEffect(() => {
    const selectRows = (current, pageSize) => {
      const _1 = pageSize * current - pageSize;
      const _2 = pageSize * current;

      return actions.slice(_1, _2);
    };
    setShowRows(selectRows(current, pageSize));
  }, [actions, current, pageSize]);

  // Select the rows to display on the table
  const [showRows, setShowRows] = useState([]);

  useEffect(() => {
    setTotalPages(actions.length - 1);
  }, [actions, totalPages]);

  const onTableChange = (page) => {
    setCurrent(page);
  };

  const [createAcionPageIsOpen, setCreateActionPageIsOpen] = useState(false);

  return (
    <Actions className="Actions">
      <Header>
        <Title>{t("actions.title")}</Title>
        <CreateOrderButton onClick={openCreateOrder}>
          {t("actions.create_action_button")}
        </CreateOrderButton>
      </Header>
      {createAcionPageIsOpen && (
        <CreateActionPage
          setCreateActionPageIsOpen={setCreateActionPageIsOpen}
        />
      )}
      <Table>
        <div className="thead">
          <div className="tr" style={{ ...tableWidth }}>
            <div className="th action">{t("actions.action")}</div>
            <div className="th creationDate">{t("actions.creation_date")}</div>
            <div className="th target">{t("actions.target")}</div>
            <div className="th details">{t("actions.details")}</div>
          </div>
        </div>
        <div className="tbody">
          {loading && <div className="tr loading">{t("loading")}</div>}

          {!loading &&
            showRows.map((element, index) => {
              const { target, details } = element;

              switch (target) {
                case "user":
                  return (
                    <UserRow
                      key={index}
                      action={element}
                      tableWidth={tableWidth}
                    />
                  );
                default:
                  return <p key={index}></p>;
              }
            })}
        </div>
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
      </Table>
    </Actions>
  );
};

export default ActionsPage;
