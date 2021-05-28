import React from "react";
import { useTranslation } from "react-i18next";
import {
  FooterSection,
  FooterSectionWrapper,
  Contact,
  UseConditions,
  Copyright,
  Detach,
  FooterLinks,
} from "../../styles/FooterStyles";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterSection className="Footer">
      <FooterSectionWrapper fluid>
        <FooterLinks>
          <Contact to="/contact">{t("footer.contact")}</Contact>
          <UseConditions to="/terms-conditions">
            {t("footer.terms_conditions")}
          </UseConditions>
        </FooterLinks>
        <Copyright>
          &copy; {t("footer.copyright.0")}
          {new Date().getFullYear()}. {t("footer.copyright.0")}
        </Copyright>
        <Detach>{t("footer.detach")} </Detach>
      </FooterSectionWrapper>
    </FooterSection>
  );
};

export default Footer;
