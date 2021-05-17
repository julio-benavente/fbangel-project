import React from "react";

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
  return (
    <ReferralRegistration>
      <ReferralRegistrationSection>
        <ReferralRegistrationSectionWrapper>
          <ReferralRegistrationTitle>
            ¡Conviértete en un Referidor!
          </ReferralRegistrationTitle>
          <ReferralRegistrationInfo>
            ¡Completa este sencillo cuestionario y empieza a ganar dinero
            invitando a tus amigos!
          </ReferralRegistrationInfo>
          <Form />
        </ReferralRegistrationSectionWrapper>
      </ReferralRegistrationSection>
    </ReferralRegistration>
  );
};

export default ReferralRegistrationPageStyles;
