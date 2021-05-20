import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, requestUser } from "../../../store/entities/users";
import { getUser as getAuthUser } from "../../../store/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
  const { id, paypalEmailVerified } = useSelector(getAuthUser);

  useEffect(() => {
    dispatch(requestUser({ id }));
  }, []);

  const [paypalEmailIsSent, setPaypalEmailIsSent] = useState(false);
  const sendPaypalEmail = async (id) => {
    try {
      setPaypalEmailIsSent(true);
      const response = await axios.put(
        "/api/users/send-paypal-email-confirmation",
        {
          id,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <Profile>
      <ProfileSection>
        <ProfileTitle>Profile</ProfileTitle>
        {user && (
          <Information>
            <InformationItem>
              <InfoLabel>First Name</InfoLabel>
              <InfoValue>{user.firstName}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>Last Name</InfoLabel>
              <InfoValue>{user.lastName}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>Birthday</InfoLabel>
              <InfoValue>
                {new Date(user.birthday).toLocaleString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>{user.phone}</InfoValue>
            </InformationItem>

            <InformationItem>
              <InfoLabel>Referral code</InfoLabel>
              <InfoValue>{user.referralCode}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>Referral link</InfoLabel>
              <InfoValue>{user.referralCodeLink}</InfoValue>
            </InformationItem>
            <InformationItem>
              <InfoLabel>Status</InfoLabel>
              <InfoValue className={`status ${user.status}`}>
                {user.status}
              </InfoValue>
            </InformationItem>
            {user.paymentMethod === "paypal" && (
              <InformationItem>
                <InfoLabel>Paypal email</InfoLabel>
                <InfoValue>{user.paypalEmail}</InfoValue>
              </InformationItem>
            )}

            {user.paymentMethod === "bank-peru" && (
              <>
                <InformationItem>
                  <InfoLabel>Card holder name</InfoLabel>
                  <InfoValue>{user.holderName}</InfoValue>
                </InformationItem>
                <InformationItem>
                  <InfoLabel>Bank agency</InfoLabel>
                  <InfoValue>{user.bankAngency}</InfoValue>
                </InformationItem>
                <InformationItem>
                  <InfoLabel>Bank account</InfoLabel>
                  <InfoValue>{user.bankAccountCode}</InfoValue>
                </InformationItem>
              </>
            )}
          </Information>
        )}
      </ProfileSection>
      <ConfigurationSection>
        <ConfigurationTitle>Configuration</ConfigurationTitle>
        <Configuration>
          <ConfigurationItem>
            <Link to="/forgot-password" target="_blank">
              Reset password
            </Link>
          </ConfigurationItem>

          {user && user.paymentMethod === "paypal" && !paypalEmailVerified && (
            <>
              <ConfigurationItem
                className="paypalEmailVerified"
                onClick={() => sendPaypalEmail(user._id)}
              >
                <p>Verify PayPal email</p>
              </ConfigurationItem>
              {paypalEmailIsSent && (
                <p className="message">
                  An email has been sent to <span>{user.paypalEmail}</span>.
                  Check it out and verify your PayPal email.
                </p>
              )}
            </>
          )}
          <ConfigurationItem>
            <Link to="/forgot-password" target="_blank">
              Change PayPal email
            </Link>
          </ConfigurationItem>
        </Configuration>
      </ConfigurationSection>
    </Profile>
  );
};

export default ProfilePage;
