import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Styles
import {
  NoValid,
  NoValidSection,
  NoValidSectionWrapper,
  Message,
  Image,
} from "../../styles/NoValidPageStyles";

// Assets
import guy from "../../assets/svgs/guy-in-hole.svg";

const NoValidPage = () => {
  const { t } = useTranslation();
  return (
    <NoValid>
      <NoValidSection>
        <NoValidSectionWrapper>
          <Message>
            <p>{t("no_valid.p_1.0")}</p>
            <p>
              {t("no_valid.p_2.0")}
              <Link to="/referral-program"> {t("no_valid.p_2.1")}</Link>{" "}
              {t("no_valid.p_2.2")}
            </p>
          </Message>
          <Image src={guy} />
        </NoValidSectionWrapper>
      </NoValidSection>
    </NoValid>
  );
};

export default NoValidPage;
