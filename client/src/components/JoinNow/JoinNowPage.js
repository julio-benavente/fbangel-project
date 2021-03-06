import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("navbar.join_now");
  }, [language]);

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
