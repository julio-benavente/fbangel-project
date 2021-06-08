import React from "react";
import { useTranslation } from "react-i18next";

import {
  TermsAndConditions,
  TermsAndConditionsSection,
  TermsAndConditionsSectionWrapper,
  TermsAndConditionsTitle,
  TermsAndConditionsInfo,
} from "../../styles/TermsAndConditionsPageStyles";

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();
  return (
    <TermsAndConditions>
      <TermsAndConditionsSection>
        <TermsAndConditionsSectionWrapper>
          <TermsAndConditionsTitle>
            {t("terms_conditions.title")}
          </TermsAndConditionsTitle>

          <TermsAndConditionsInfo>
            <h2>
              <b>{t("terms_conditions.intro.title")}</b>
            </h2>
            {t("terms_conditions.intro.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.definitions.title")}</b>
            </p>
            {t("terms_conditions.definitions.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.recognition.title")}</b>
            </p>
            {t("terms_conditions.recognition.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.service_condition.title")}</b>
            </p>
            {t("terms_conditions.service_condition.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.privacy.title")}</b>
            </p>
            {t("terms_conditions.privacy.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.property_promise.title")}</b>
            </p>
            {t("terms_conditions.property_promise.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.compensation.title")}</b>
            </p>
            {t("terms_conditions.compensation.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.payment.title")}</b>
            </p>
            {t("terms_conditions.payment.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.payment_calendar.title")}</b>
            </p>
            {t("terms_conditions.payment_calendar.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.payment_method.title")}</b>
            </p>
            {t("terms_conditions.payment_method.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.rental_termination.title")}</b>
            </p>
            {t("terms_conditions.rental_termination.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.material_violation.title")}</b>
            </p>
            {t("terms_conditions.material_violation.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.limited_liability.title")}</b>
            </p>
            {t("terms_conditions.limited_liability.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.disclaimer.title")}</b>
            </p>
            {t("terms_conditions.disclaimer.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.dispute_resolution.title")}</b>
            </p>
            {t("terms_conditions.dispute_resolution.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.severability_saiver.title")}</b>
            </p>
            {t("terms_conditions.severability_saiver.p", {
              returnObjects: true,
            }).map(({ tag, message }) => {
              {
                if (tag === "p") return <p>{message}</p>;
                if (tag === "i")
                  return (
                    <p>
                      <i>{message}</i>
                    </p>
                  );
              }
            })}

            <p className="subTitle">
              <b>{t("terms_conditions.interpretation.title")}</b>
            </p>
            {t("terms_conditions.interpretation.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.change_terms.title")}</b>
            </p>
            {t("terms_conditions.change_terms.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}

            <p className="subTitle">
              <b>{t("terms_conditions.contact.title")}</b>
            </p>
            {t("terms_conditions.contact.p", {
              returnObjects: true,
            }).map((p) => (
              <p>{p}</p>
            ))}
          </TermsAndConditionsInfo>
        </TermsAndConditionsSectionWrapper>
      </TermsAndConditionsSection>
    </TermsAndConditions>
  );
};

export default TermsAndConditionsPage;
