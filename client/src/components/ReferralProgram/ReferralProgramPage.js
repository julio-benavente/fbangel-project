import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Styles
import {
  ReferralProgram,
  ReferralProgramSection,
  ReferralProgramSectionTitle,
  ReferralProgramSectionInfo,
  InformationList,
  ReferralProgramImage,
  RegistrationBtn,
  TinyLetter,
} from "../../styles/ReferralProgramStyles";

// Assets
import friendsChatting from "../../assets/svgs/friends-chatting.svg";

const ReferralProgramPage = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("navbar.referral_program");
  }, [language]);

  return (
    <ReferralProgram>
      <ReferralProgramSection>
        <ReferralProgramSectionTitle>{t("referral_program.title")}</ReferralProgramSectionTitle>
        <ReferralProgramSectionInfo>
          <Link to="/referral-registration">{t("referral_program.info.0")}</Link> {t("referral_program.info.1")}{" "}
          <span className="money">
            {t("referral_program.info.2")} {t("referral_program.info.3")}
          </span>{" "}
          <span className="asterisk">*</span>
        </ReferralProgramSectionInfo>
        <InformationList>
          <p>
            {t("referral_program.list.p_1.0")}
            <b> {t("referral_program.list.p_1.1")}</b>
          </p>
          <p>
            {t("referral_program.list.p_2.0")}
            <Link to="/referral-registration"> {t("referral_program.list.p_2.1")}</Link>{" "}
            {t("referral_program.list.p_2.2")}{" "}
            <Link to="/referral-registration">{t("referral_program.list.p_2.3")}</Link>
            {t("referral_program.list.p_2.4")}
          </p>
          <p>
            {t("referral_program.list.p_3.0")}
            <Link to="/referral-registration"> {t("referral_program.list.p_3.1")}</Link>{" "}
            {t("referral_program.list.p_3.2")}
          </p>
          <p>{t("referral_program.list.p_4.0")} </p>
          <p>
            <span className="important">{t("referral_program.list.p_5.0")}</span> {t("referral_program.list.p_5.1")}
          </p>
        </InformationList>
        <ReferralProgramImage src={friendsChatting} />

        <RegistrationBtn to="/referral-registration">{t("referral_program.register_btn")}</RegistrationBtn>
        <TinyLetter>
          <span>*</span> {t("referral_program.tiny")}
        </TinyLetter>
      </ReferralProgramSection>
    </ReferralProgram>
  );
};

export default ReferralProgramPage;
