import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import {
  JoinUs,
  JoinUsSection,
  JoinUsSectionWrapper,
  JoinUsSectionTitle,
  JoinUsSectionInfo,
  JoinUsImage,
} from "../../styles/JoinUsPageStyles";
import Form from "./Form";

const JoinUsPage = () => {
  const { t } = useTranslation();

  return (
    <JoinUs>
      <JoinUsSection>
        <JoinUsSectionWrapper>
          <JoinUsSectionTitle>{t("join_us.title")}</JoinUsSectionTitle>
          <JoinUsSectionInfo>{t("join_us.info")} </JoinUsSectionInfo>
          <Form />
          <JoinUsImage />
        </JoinUsSectionWrapper>
      </JoinUsSection>
    </JoinUs>
  );
};

export default JoinUsPage;
