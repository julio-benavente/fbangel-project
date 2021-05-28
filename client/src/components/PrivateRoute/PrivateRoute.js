import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { getUser, requestAuth } from "../../store/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PrivateRoute = ({ children, ...rest }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(requestAuth()).then((res) => {
      if (res.type === "auth/authFailed") {
        history.push("/login");
      }
    });
  }, []);

  if (user.id) {
    return <Route {...rest} render={() => children} />;
  } else {
    return (
      <div
        style={{
          height: "calc(100vh - 80px)",
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1>{t("loading")}</h1>
      </div>
    );
  }
};

export default PrivateRoute;
