import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { getUser, requestAuth } from "../../store/auth/auth";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
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
    return <p></p>;
  }
};

export default PrivateRoute;
