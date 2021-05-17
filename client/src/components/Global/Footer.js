import React from "react";
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
  return (
    <FooterSection className="Footer">
      <FooterSectionWrapper fluid>
        <FooterLinks>
          <Contact to="/contacto">Contacto</Contact>
          <UseConditions to="/terminos-condiciones">
            Condiciones de uso
          </UseConditions>
        </FooterLinks>
        <Copyright>
          &copy; Copyright {new Date().getFullYear()}. All rights reserved
          fbangel
        </Copyright>
        <Detach>
          Este sitio no forma parte de Facebook o Facebook Inc. Además, este
          sitio NO está respaldado por Facebook de ninguna manera. Facebook es
          un marca registrada de Facebook Inc.
        </Detach>
      </FooterSectionWrapper>
    </FooterSection>
  );
};

export default Footer;
