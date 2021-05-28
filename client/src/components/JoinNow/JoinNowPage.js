import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// Styles
import {
  JoinNow,
  JoinNowSection,
  JoinNowSectionWrapper,
  JoinNowSectionTitle,
  JoinNowSectionInfo,
  JoinNowImage,
} from "../../styles/JoinNowPageStyles";
import Form from "./Form";

const JoinNowPage = () => {
  const { t } = useTranslation();

  return (
    <JoinNow>
      <JoinNowSection>
        <JoinNowSectionWrapper>
          <JoinNowSectionTitle>{t("join_now.title")}</JoinNowSectionTitle>
          <JoinNowSectionInfo>{t("join_now.info")} </JoinNowSectionInfo>
          <Form />
          <JoinNowImage />
        </JoinNowSectionWrapper>
      </JoinNowSection>
    </JoinNow>
  );
};

export default JoinNowPage;
