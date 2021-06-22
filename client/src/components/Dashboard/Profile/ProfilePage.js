import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, requestUser } from "../../../store/entities/users";
import { getUser as getAuthUser } from "../../../store/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Styles
import {
  Profile,
  ProfileSection,
  ProfileTitle,
  Information,
  InformationItem,
  InfoLabel,
  InfoValue,
  ConfigurationSection,
  Configuration,
  ConfigurationTitle,
  ConfigurationItem,
  ConfigLabel,
  ConfigValue,
} from "../../../styles/Dashboard/ProfilePageStyles";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const { id, email, paypalEmailVerified, authLevel } = useSelector(getAuthUser);

  useEffect(() => {
    dispatch(requestUser({ id }));
  }, []);

  const [paypalEmailIsSent, setPaypalEmailIsSent] = useState(false);
  const sendPaypalEmail = async (id) => {
    try {
      setPaypalEmailIsSent(true);
      const response = await axios.put("/api/users/send-paypal-email-confirmation", {
        id,
      });
    } catch (error) {}
  };

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("profile.profile.title");
  }, [language]);

  return (
    <Profile>
      <ProfileSection>
        <ProfileTitle>{t("profile.profile.title")}</ProfileTitle>
        {user && authLevel === "user" && (
          <Information>
            <InformationItem>
              <InfoLabel>{t("profile.profile.first_name")}</InfoLabel>
              <InfoValue>{user.firstName}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.last_name")}</InfoLabel>
              <InfoValue>{user.lastName}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.email")}</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.birthday")}</InfoLabel>
              <InfoValue>
                {new Date(user.birthday).toLocaleString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.phone")}</InfoLabel>
              <InfoValue>{user.phone}</InfoValue>
            </InformationItem>

            <InformationItem>
              <InfoLabel>{t("profile.profile.referral_code")}</InfoLabel>
              <InfoValue>{user.referralCode}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.referral_link")}</InfoLabel>
              <InfoValue>{user.referralCodeLink}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.status")}</InfoLabel>
              <InfoValue className={`status ${user.status}`}>
                {`${user.status[0].toUpperCase()}${user.status.slice(1)}`}
              </InfoValue>
            </InformationItem>
            {user.paymentMethod === "paypal" && (
              <InformationItem>
                <InfoLabel>{t("profile.profile.paypal_email")}</InfoLabel>
                <InfoValue>{user.paypalEmail}</InfoValue>
              </InformationItem>
            )}

            {user.paymentMethod === "bank-peru" && (
              <>
                <InformationItem>
                  <InfoLabel>{t("profile.profile.holder_name")}</InfoLabel>
                  <InfoValue>{user.holderName}</InfoValue>
                </InformationItem>
                <InformationItem>
                  <InfoLabel>{t("profile.profile.bank_agency")}</InfoLabel>
                  <InfoValue>{user.bankAngency}</InfoValue>
                </InformationItem>
                <InformationItem>
                  <InfoLabel>{t("profile.profile.bank_account")}</InfoLabel>
                  <InfoValue>{user.bankAccountCode}</InfoValue>
                </InformationItem>
              </>
            )}
          </Information>
        )}

        {user && authLevel === "admin" && (
          <Information>
            <InformationItem>
              <InfoLabel>{t("profile.profile.first_name")}</InfoLabel>
              <InfoValue>{user.firstName}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.last_name")}</InfoLabel>
              <InfoValue>{user.lastName}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>{t("profile.profile.email")}</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InformationItem>
          </Information>
        )}
      </ProfileSection>
      <ConfigurationSection>
        <ConfigurationTitle>{t("profile.configuration.title")}</ConfigurationTitle>
        <Configuration>
          <ConfigurationItem>
            <Link to="/forgot-password" target="_blank">
              {t("profile.configuration.forgot_password_link")}
            </Link>
          </ConfigurationItem>

          {user && user.paymentMethod === "paypal" && !paypalEmailVerified && (
            <>
              <ConfigurationItem className="paypalEmailVerified" onClick={() => sendPaypalEmail(user._id)}>
                <p>{t("profile.configuration.paypal_email_verified")}</p>
              </ConfigurationItem>
              {paypalEmailIsSent && (
                <p className="message">
                  {t("profile.configuration.paypal_email_sent.0")}
                  <span> {user.paypalEmail}</span>. {t("profile.configuration.paypal_email_sent.1")}
                </p>
              )}
            </>
          )}
          <ConfigurationItem>
            {false && (
              <Link to="/forgot-password" target="_blank">
                {t("profile.configuration.change_paypal_email")}
              </Link>
            )}
          </ConfigurationItem>
        </Configuration>
      </ConfigurationSection>
    </Profile>
  );
};

export default ProfilePage;
