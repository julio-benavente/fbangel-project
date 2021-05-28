import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getUser,
  logOut,
  logoutSucceeded,
  logoutFailed,
} from "../../store/auth/auth";

// Components
import {
  DashboardProlfile,
  Name,
  ProfileImage,
  Logout,
} from "../../styles/Dashboard/DashboardProfileStyles";

import { ReactComponent as UserSvg } from "../../assets/svgs/user.svg";
import { ReactComponent as LogoutSvg } from "../../assets/svgs/logout.svg";

const MainComponent = () => {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector(getUser);

  const { push } = useHistory();
  const logout = async () => {
    const response = await dispatch(logOut());

    if ([logoutSucceeded.type, logoutFailed.type].includes(response.type)) {
      push("/");
    }
  };

  const { t } = useTranslation();
  return (
    <DashboardProlfile>
      <Name>
        {t("dashboard_profile.hi")}, <p>{`${firstName} ${lastName}`}</p>
      </Name>
      <ProfileImage>
        <UserSvg />
      </ProfileImage>
      <Logout onClick={logout}>
        {t("dashboard_profile.logout")}
        <LogoutSvg />
      </Logout>
    </DashboardProlfile>
  );
};

export default MainComponent;
