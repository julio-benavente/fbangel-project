import React from "react";
import { useTranslation } from "react-i18next";

// Components
import Form from "./ReferralRegistrationForm";

// Styles
import {
  ReferralRegistration,
  ReferralRegistrationSection,
  ReferralRegistrationSectionWrapper,
  ReferralRegistrationTitle,
  ReferralRegistrationInfo,
} from "../../styles/ReferralRegistrationPageStyles";

const ReferralRegistrationPageStyles = () => {
  const { t } = useTranslation();

  return (
    <ReferralRegistration>
      <ReferralRegistrationSection>
        <ReferralRegistrationSectionWrapper>
          <ReferralRegistrationTitle>
            {t("referral_registration.title")}
          </ReferralRegistrationTitle>
          <ReferralRegistrationInfo>
            {t("referral_registration.info")}
          </ReferralRegistrationInfo>
          <Form />
        </ReferralRegistrationSectionWrapper>
      </ReferralRegistrationSection>
    </ReferralRegistration>
  );
};

export default ReferralRegistrationPageStyles;
