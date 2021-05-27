import React from "react";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";
import { useTranslation } from "react-i18next";

import {
  // How it works section
  HowItWorks,
  HowItWorksSection,
  HowItWorksSectionTitle,
  HowItWorksSectionInfo,
  FAQLink,
  HowItWorksImage,
  // Requirements section
  RequirementsSection,
  RequirementsSectionWrapper,
  RequirementsSectionTitle,
  RequirementsList,
  RequirementsImage,
  // Configuration section
  ConfigurationSection,
  ConfigurationSectionWrapper,
  ConfigurationSectionTitle,
  ConfigurationImage,
  ConfigurationInfo,
  ConfigurationList,
  StepOne,
  StepOneTitle,
  Options,
  OptionOne,
  OptionOneTitle,
  OptionTwo,
  OptionTwoTitle,
  StepTwo,
  StepTwoTitle,
  // Registration section
  RegistrationSection,
  RegistrationSectionWrapper,
  RegistrationImage,
  RegistrationSectionTitle,
  RegistrationInfo,
  // Payment section
  PaymentSection,
  PaymentSectionWrapper,
  PaymentImage,
  PaymentSectionTitle,
  PaymentInfo,
  // Support section
  SupportSection,
  SupportSectionWrapper,
  SupportImage,
  SupportSectionTitle,
  SupportInfo,
} from "../../styles/HowItWorksPageStyles";

// Assets
import girl_getting_off from "../../assets/svgs/girl-getting-off.svg";
import todo_list from "../../assets/svgs/todo-list.svg";
import browser_girl from "../../assets/svgs/browser-girl.svg";
import watching_laptop from "../../assets/svgs/watching-laptop.svg";
import drinking_coffe from "../../assets/svgs/drinking-coffe.svg";
import sending_email from "../../assets/svgs/sending-email.svg";
import op1img1 from "../../assets/images/option-one-img-one.jpg";
import op1img2 from "../../assets/images/option-one-img-two.jpg";
import op2img1 from "../../assets/images/option-two-img-one.jpg";
import op2img2 from "../../assets/images/option-two-img-two.jpg";

const HowItWorksPage = () => {
  const { t } = useTranslation();
  return (
    <HowItWorks>
      {/* HowItWorks section starts */}
      <HowItWorksSection>
        <HowItWorksSectionTitle>
          {t("how_it_works.how_it_works.title")}
        </HowItWorksSectionTitle>
        <HowItWorksImage src={girl_getting_off} />
        <HowItWorksSectionInfo>
          <p>{t("how_it_works.how_it_works.info.p_1")}</p>
          <p>{t("how_it_works.how_it_works.info.p_2")}</p>
          <p>{t("how_it_works.how_it_works.info.p_3")}</p>
          <p>{t("how_it_works.how_it_works.info.p_4")}</p>
          <FAQLink to="/faq">{t("how_it_works.how_it_works.faq_link")}</FAQLink>
        </HowItWorksSectionInfo>
      </HowItWorksSection>
      {/* HowItWorks section ends */}

      {/* Requirements section starts */}
      <RequirementsSection>
        <RequirementsSectionWrapper>
          <RequirementsSectionTitle>
            {t("how_it_works.requirements.title")}
          </RequirementsSectionTitle>
          <RequirementsImage src={todo_list} />

          <RequirementsList>
            {t("how_it_works.requirements.list", { returnObjects: true }).map(
              (e, i) => (
                <li key={i}>{e}</li>
              )
            )}
          </RequirementsList>
        </RequirementsSectionWrapper>
      </RequirementsSection>
      {/* Requirements section ends */}

      {/* Configuration section starts */}
      <ConfigurationSection>
        <ConfigurationSectionWrapper>
          <ConfigurationImage src={browser_girl} />
          <ConfigurationSectionTitle>
            {t("how_it_works.configuration.title")}
          </ConfigurationSectionTitle>
          <ConfigurationInfo>
            {t("how_it_works.configuration.info.0")}
            <b> {t("how_it_works.configuration.info.1")} </b>
            {t("how_it_works.configuration.info.2")}
          </ConfigurationInfo>
          <ConfigurationList>
            {t("how_it_works.configuration.list", { returnObjects: true }).map(
              (e, i) => (
                <li key={i}>{e}</li>
              )
            )}
          </ConfigurationList>
          <StepOne>
            <StepOneTitle>
              {t("how_it_works.configuration.step_one.title")}
            </StepOneTitle>
            <ol>
              <li>
                {t("how_it_works.configuration.step_one.list.li_1.0")}
                <a
                  href="https://business.facebook.com/overview#/"
                  target="_blank"
                >
                  {" "}
                  business.facebook.com/overview
                </a>
              </li>
              <li>
                {t("how_it_works.configuration.step_one.list.li_2.0")}{" "}
                <b>{t("how_it_works.configuration.step_one.list.li_2.1")}</b>
              </li>
              <li>
                {t("how_it_works.configuration.step_one.list.li_3.0")}{" "}
                <b>{t("how_it_works.configuration.step_one.list.li_3.1")}</b>. -
                <b> {t("how_it_works.configuration.step_one.list.li_3.2")}</b>
              </li>
              <li>
                {t("how_it_works.configuration.step_one.list.li_4.0")}{" "}
                <b> {t("how_it_works.configuration.step_one.list.li_4.1")} </b>{" "}
                {t("how_it_works.configuration.step_one.list.li_4.2")}
              </li>
            </ol>
          </StepOne>
          <Options>
            <OptionOne>
              <OptionOneTitle>
                {t("how_it_works.configuration.option_one.title")}
              </OptionOneTitle>
              <p>{t("how_it_works.configuration.option_one.p_1")}</p>
              <a>
                <ModalImage
                  small={op1img1}
                  large={op1img1}
                  hideDownload={true}
                  alt="Option one image one"
                />
              </a>
              {/* <img src={op1img1} alt="Option one image one" /> */}
              <p>{t("how_it_works.configuration.option_one.p_2")}</p>
              <ol>
                <li>
                  {t("how_it_works.configuration.option_one.list_1.li_1.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_1.li_1.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_one.list_1.li_2.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_1.li_2.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_one.list_1.li_3.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_1.li_3.1")}
                  </b>
                </li>
              </ol>
              <a>
                <ModalImage
                  small={op1img2}
                  large={op1img2}
                  hideDownload={true}
                  alt="Option one image two"
                />
              </a>
              <p>{t("how_it_works.configuration.option_one.p_3")}</p>
              <p>
                {t("how_it_works.configuration.option_one.p_4.0")}{" "}
                <b>{t("how_it_works.configuration.option_one.p_4.1")}</b>{" "}
                {t("how_it_works.configuration.option_one.p_4.2")}
              </p>
              <ol>
                <li>
                  {t("how_it_works.configuration.option_one.list_2.li_1.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_2.li_1.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_one.list_2.li_2.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_2.li_2.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_one.list_2.li_3.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_2.li_3.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_one.list_2.li_4.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_one.list_2.li_4.1")}
                  </b>
                </li>
              </ol>
            </OptionOne>

            <OptionTwo>
              <OptionTwoTitle>
                {t("how_it_works.configuration.option_two.title")}
              </OptionTwoTitle>
              <a>
                <ModalImage
                  small={op2img1}
                  large={op2img1}
                  hideDownload={true}
                  alt="Option two image one"
                />
              </a>
              <p>{t("how_it_works.configuration.option_two.p_1")}</p>
              <p>{t("how_it_works.configuration.option_two.p_2")}</p>
              <ol>
                <li>
                  {t("how_it_works.configuration.option_two.list_1.li_1.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_two.list_1.li_1.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_two.list_1.li_2.0")}
                  <b>
                    {" "}
                    {t("how_it_works.configuration.option_two.list_1.li_2.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_two.list_1.li_3.0")}
                  <b>
                    {" "}
                    {t("how_it_works.configuration.option_two.list_1.li_3.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_two.list_1.li_4.0")}
                </li>
                <li>
                  {t("how_it_works.configuration.option_two.list_1.li_5.0")}{" "}
                  <b>
                    {" "}
                    {t("how_it_works.configuration.option_two.list_1.li_5.1")}
                  </b>
                </li>
              </ol>
              <p>{t("how_it_works.configuration.option_two.p_3")}</p>
              <p>
                {t("how_it_works.configuration.option_two.p_4")}
                <a
                  href="https://business.facebook.com/accountquality/"
                  target="_blank"
                >
                  {" "}
                  business.facebook.com/accountquality{" "}
                </a>
              </p>

              <a>
                <ModalImage
                  small={op2img2}
                  large={op2img2}
                  hideDownload={true}
                  alt="Option one image two"
                />
              </a>
              <p>
                {t("how_it_works.configuration.option_two.p_5.0")}{" "}
                <b>{t("how_it_works.configuration.option_two.p_5.1")}</b>{" "}
                {t("how_it_works.configuration.option_two.p_5.2")}
              </p>
              <ol>
                <li>
                  {t("how_it_works.configuration.option_two.list_2.li_1.0")}{" "}
                  <a
                    href="https://business.facebook.com/settings/"
                    target="_blank"
                  >
                    business.facebook.com/settings
                  </a>
                </li>
                <li>
                  {t("how_it_works.configuration.option_two.list_2.li_2.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_two.list_2.li_2.1")}
                  </b>
                </li>
                <li>
                  {t("how_it_works.configuration.option_two.list_2.li_3.0")}{" "}
                  <b>
                    {t("how_it_works.configuration.option_two.list_2.li_3.1")}
                  </b>
                </li>
              </ol>
            </OptionTwo>
          </Options>

          <StepTwo>
            <StepTwoTitle>
              {t("how_it_works.configuration.step_two.title")}
            </StepTwoTitle>
            <ol>
              <li>
                {t("how_it_works.configuration.step_two.list.li_1.0")}{" "}
                <b>{t("how_it_works.configuration.step_two.list.li_1.1")}</b>
              </li>
              <li>
                {t("how_it_works.configuration.step_two.list.li_2.0")}{" "}
                <b>{t("how_it_works.configuration.step_two.list.li_2.1")}</b>
              </li>
              <li>
                {t("how_it_works.configuration.step_two.list.li_3.0")}{" "}
                <b>{t("how_it_works.configuration.step_two.list.li_3.1")}</b>
              </li>
              <li>
                {t("how_it_works.configuration.step_two.list.li_4.0")}{" "}
                <b>{t("how_it_works.configuration.step_two.list.li_4.1")}</b>
              </li>
              <li>
                {t("how_it_works.configuration.step_two.list.li_5.0")}{" "}
                <b>{t("how_it_works.configuration.step_two.list.li_5.1")}</b>
              </li>
              <li>{t("how_it_works.configuration.step_two.list.li_6.0")}</li>
              <div className="extra">
                <p>{t("how_it_works.configuration.step_two.list.extra.p_1")}</p>
                <p>{t("how_it_works.configuration.step_two.list.extra.p_2")}</p>
                <p>
                  <a
                    href="https://www.facebook.com/help/358336074294704?helpref=faq_content"
                    target="_blank"
                  >
                    {t("how_it_works.configuration.step_two.list.extra.p_3")}
                  </a>
                </p>
              </div>
              <li>
                {t("how_it_works.configuration.step_two.list.li_7.0")}{" "}
                <b>{t("how_it_works.configuration.step_two.list.li_7.1")}</b>
              </li>
            </ol>
          </StepTwo>
        </ConfigurationSectionWrapper>
      </ConfigurationSection>
      {/* Configuration section ends */}

      {/* Registration section starts */}
      <RegistrationSection>
        <RegistrationSectionWrapper>
          <RegistrationImage src={watching_laptop} />
          <RegistrationSectionTitle>
            {t("how_it_works.registration.title")}
          </RegistrationSectionTitle>
          <RegistrationInfo>
            <p>
              {t("how_it_works.registration.info.p_1.0")}{" "}
              <Link to="/join-now">
                {t("how_it_works.registration.info.p_1.1")}
              </Link>{" "}
              {t("how_it_works.registration.info.p_1.2")}
            </p>
            <p>{t("how_it_works.registration.info.p_2.0")}</p>
            <p>
              {t("how_it_works.registration.info.p_3.0")}{" "}
              <b>{t("how_it_works.registration.info.p_3.1")}</b>.
            </p>
            <p>{t("how_it_works.registration.info.p_4.0")}</p>
            <p>{t("how_it_works.registration.info.p_5.0")}</p>
            <p>{t("how_it_works.registration.info.p_6.0")}</p>
            <p>
              {t("how_it_works.registration.info.p_7.0")}{" "}
              <a
                href="https://www.facebook.com/help/159096464162185"
                target="_blank"
              >
                {t("how_it_works.registration.info.p_7.1")}
              </a>
              .
            </p>
            <p>
              {t("how_it_works.registration.info.p_8.0")}{" "}
              <b>{t("how_it_works.registration.info.p_8.1")}</b>{" "}
              {t("how_it_works.registration.info.p_8.2")}{" "}
              <b>{t("how_it_works.registration.info.p_8.3")} </b>
              {t("how_it_works.registration.info.p_8.4")}
            </p>
          </RegistrationInfo>
        </RegistrationSectionWrapper>
      </RegistrationSection>
      {/* Registration section ends */}

      {/* Payment section starts */}
      <PaymentSection>
        <PaymentSectionWrapper>
          <PaymentImage src={drinking_coffe} />
          <PaymentSectionTitle>
            {t("how_it_works.payment.title")}
          </PaymentSectionTitle>
          <PaymentInfo>
            <p>{t("how_it_works.payment.info.p_1.0")}</p>
            <p>{t("how_it_works.payment.info.p_2.0")}</p>
            <p>
              {t("how_it_works.payment.info.p_3.0")}{" "}
              <Link to="programa-referidos">
                {t("how_it_works.payment.info.p_3.1")}
              </Link>
            </p>
            <p>
              <b>{t("how_it_works.payment.info.p_4.0")}</b>
            </p>
            <p>{t("how_it_works.payment.info.p_5.0")}</p>
            <p>{t("how_it_works.payment.info.p_6.0")}</p>
            <p>{t("how_it_works.payment.info.p_7.0")}</p>
            <p>{t("how_it_works.payment.info.p_8.0")}</p>
          </PaymentInfo>
        </PaymentSectionWrapper>
      </PaymentSection>
      {/* Payment section ends */}

      {/* Support section starts */}
      <SupportSection>
        <SupportSectionWrapper>
          <SupportImage src={sending_email} />
          <SupportSectionTitle>
            {t("how_it_works.support.title")}
          </SupportSectionTitle>
          <SupportInfo>
            <p>{t("how_it_works.support.info.p_1.0")}</p>
            <p className="important">{t("how_it_works.support.info.p_2.0")}</p>
            <p>
              {t("how_it_works.support.info.p_3.0")}{" "}
              <b>{t("how_it_works.support.info.p_3.1")}</b>
              {t("how_it_works.support.info.p_3.2")}
            </p>
            <p>
              <Link to="/contact">{t("how_it_works.support.info.p_4.0")}</Link>
            </p>
          </SupportInfo>
        </SupportSectionWrapper>
      </SupportSection>
      {/* Support section ends */}
    </HowItWorks>
  );
};

export default HowItWorksPage;
