import React, { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getGlobal } from "../../../store/global/global";
import { useSelector } from "react-redux";
// Components
import OptionInput from "../OptionInput";
import TextInput from "../TextInput";
import FileInput from "../FileInput";

// Styles
import { FormFour } from "../../../styles/JoinNowPageStyles";

const StepFour = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const {
    register,
    getValues,
    control,
    unregister,
    formState: { errors },
  } = methods;

  const paymentMethod = useWatch({
    control,
    name: "stepFour.paymentMethod",
  });

  // Unregistration of the payment method
  useEffect(() => {
    if (paymentMethod === "bank-peru") {
      unregister(["stepFour.paypalEmail", "stepFour.paypalEmailConfirmation"]);
    }

    if (paymentMethod === "paypal") {
      unregister([
        "stepFour.holderName",
        "stepFour.bankAngency",
        "stepFour.bankAccountCode",
      ]);
    }
  }, [paymentMethod]);

  const { emailDuplicated } = useSelector(getGlobal);

  return (
    <FormFour>
      <OptionInput
        className="paymentMethod"
        question={t("join_now.step_four.paymentMethod.question")}
        type="radio"
        options={[
          [t("join_now.step_four.paymentMethod.option_1"), "paypal"],
          [t("join_now.step_four.paymentMethod.option_2"), "bank-peru"],
        ]}
        error={
          errors.stepFour &&
          errors.stepFour.paymentMethod &&
          errors.stepFour.paymentMethod.message
        }
        register={register("stepFour.paymentMethod", {
          required: {
            value: true,
            message: t("join_now.step_four.paymentMethod.error_1"),
          },
        })}
      />
      {paymentMethod === "paypal" && (
        <>
          <TextInput
            className="paypalEmail"
            question={t("join_now.step_four.paypalEmail.question")}
            error={
              errors.stepFour &&
              errors.stepFour.paypalEmail &&
              errors.stepFour.paypalEmail.message
            }
            register={register("stepFour.paypalEmail", {
              required: {
                value: true,
                message: t("join_now.step_four.paypalEmail.error_1"),
              },
              pattern: {
                value:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: t("join_now.step_four.paypalEmail.error_2"),
              },
              validate: {
                min: (v) =>
                  v.length < 6
                    ? t("join_now.step_four.paypalEmail.error_3")
                    : true,
              },
            })}
          />

          <TextInput
            className="paypalEmailConfirmation"
            question={t("join_now.step_four.paypalEmailConfirmation.question")}
            error={
              errors.stepFour &&
              errors.stepFour.paypalEmailConfirmation &&
              errors.stepFour.paypalEmailConfirmation.message
            }
            register={register("stepFour.paypalEmailConfirmation", {
              required: {
                value: true,
                message: t(
                  "join_now.step_four.paypalEmailConfirmation.error_1"
                ),
              },
              validate: {
                isTheSame: (v) =>
                  !(v === getValues("stepFour.paypalEmail"))
                    ? t("join_now.step_four.paypalEmailConfirmation.error_2")
                    : true,
              },
            })}
          />
          <div className="message">
            <p>{t("join_now.step_four.paypalMessage.p_1")}</p>
          </div>
        </>
      )}
      {paymentMethod === "bank-peru" && (
        <>
          <TextInput
            className="holderName"
            question={t("join_now.step_four.holderName.question")}
            error={
              errors.stepFour &&
              errors.stepFour.holderName &&
              errors.stepFour.holderName.message
            }
            register={register("stepFour.holderName", {
              required: {
                value: true,
                message: t("join_now.step_four.holderName.error_1"),
              },
            })}
          />
          <TextInput
            className="bankAngency"
            question={t("join_now.step_four.bankAngency.question")}
            error={
              errors.stepFour &&
              errors.stepFour.bankAngency &&
              errors.stepFour.bankAngency.message
            }
            register={register("stepFour.bankAngency", {
              required: {
                value: true,
                message: t("join_now.step_four.bankAngency.error_1"),
              },
            })}
          />
          <TextInput
            className="bankAccountCode"
            question={t("join_now.step_four.bankAccountCode.question")}
            error={
              errors.stepFour &&
              errors.stepFour.bankAccountCode &&
              errors.stepFour.bankAccountCode.message
            }
            register={register("stepFour.bankAccountCode", {
              required: {
                value: true,
                message: t("join_now.step_four.bankAccountCode.error_1"),
              },
              pattern: {
                value: /^[0-9]*$/,
                message: t("join_now.step_four.bankAccountCode.error_2"),
              },
              validate: {
                numberOfDigits: (v) =>
                  v.length !== 20
                    ? t("join_now.step_four.bankAccountCode.error_3")
                    : true,
              },
            })}
          />
          <div className="message">
            <p>{t("join_now.step_four.bankMessage.p_1")}</p>
          </div>
        </>
      )}

      <FileInput
        className="documentImage"
        question={t("join_now.step_four.documentImage.question")}
        error={
          errors.stepFour &&
          errors.stepFour.documentImage &&
          errors.stepFour.documentImage.message
        }
        register={register("stepFour.documentImage", {
          required: {
            value: true,
            message: t("join_now.step_four.documentImage.error_1"),
          },
          validate: {
            size: (v) =>
              v[0].size > 2000000
                ? t("join_now.step_four.documentImage.error_2")
                : true,
            type: (v) =>
              !["image/jpeg", "image/jpg", "image/png"].includes(v[0].type)
                ? t("join_now.step_four.documentImage.error_3")
                : true,
          },
        })}
      />
      <div className="message">
        <p>{t("join_now.step_four.documentImage.message")}</p>
      </div>

      <TextInput
        className="referral"
        question={t("join_now.step_four.referral.question")}
        noRequired={true}
        error={
          errors.stepFour &&
          errors.stepFour.referral &&
          errors.stepFour.referral.message
        }
        register={register("stepFour.referral", {
          validate: {
            max: (v) =>
              v && v.length > 10
                ? t("join_now.step_four.referral.error_1")
                : true,
          },
        })}
      />

      <OptionInput
        width="full"
        className="termsAndConditions"
        type="checkbox"
        options={[[t("join_now.step_four.termsAndConditions.option_1"), "yes"]]}
        error={
          errors.stepFour &&
          errors.stepFour.termsAndConditions &&
          errors.stepFour.termsAndConditions.message
        }
        register={register("stepFour.termsAndConditions", {
          required: {
            value: true,
            message: t("join_now.step_four.termsAndConditions.error_1"),
          },
        })}
      />

      <div className="message terms">
        <h2>
          <b>{t("join_now.step_four.termsAndConditionsMessage.intro.title")}</b>
        </h2>
        {t("join_now.step_four.termsAndConditionsMessage.intro.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.definitions.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.definitions.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.recognition.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.recognition.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.service_condition.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.service_condition.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t("join_now.step_four.termsAndConditionsMessage.privacy.title")}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.privacy.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.property_promise.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.property_promise.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.compensation.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.compensation.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t("join_now.step_four.termsAndConditionsMessage.payment.title")}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.payment.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.payment_calendar.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.payment_calendar.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.payment_method.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.payment_method.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.rental_termination.title"
            )}
          </b>
        </p>
        {t(
          "join_now.step_four.termsAndConditionsMessage.rental_termination.p",
          {
            returnObjects: true,
          }
        ).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.material_violation.title"
            )}
          </b>
        </p>
        {t(
          "join_now.step_four.termsAndConditionsMessage.material_violation.p",
          {
            returnObjects: true,
          }
        ).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.limited_liability.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.limited_liability.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t("join_now.step_four.termsAndConditionsMessage.disclaimer.title")}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.disclaimer.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.dispute_resolution.title"
            )}
          </b>
        </p>
        {t(
          "join_now.step_four.termsAndConditionsMessage.dispute_resolution.p",
          {
            returnObjects: true,
          }
        ).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.severability_saiver.title"
            )}
          </b>
        </p>
        {t(
          "join_now.step_four.termsAndConditionsMessage.severability_saiver.p",
          {
            returnObjects: true,
          }
        ).map(({ tag, message }, index) => {
          {
            if (tag === "p") return <p key={index}>{message}</p>;
            if (tag === "i") {
              return (
                <p key={index}>
                  <i>{message}</i>
                </p>
              );
            }
          }
        })}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.interpretation.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.interpretation.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t(
              "join_now.step_four.termsAndConditionsMessage.change_terms.title"
            )}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.change_terms.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <p>
          <b>
            {t("join_now.step_four.termsAndConditionsMessage.contact.title")}
          </b>
        </p>
        {t("join_now.step_four.termsAndConditionsMessage.contact.p", {
          returnObjects: true,
        }).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>

      <OptionInput
        width="full"
        className="gdprAgreement"
        type="checkbox"
        options={[[t("join_now.step_four.gdprAgreement.option_1"), "yes"]]}
        error={
          errors.stepFour &&
          errors.stepFour.gdprAgreement &&
          errors.stepFour.gdprAgreement.message
        }
        register={register("stepFour.gdprAgreement", {
          required: {
            value: true,
            message: t("join_now.step_four.gdprAgreement.error_1"),
          },
        })}
      />
      {emailDuplicated && (
        <div className="message error">
          {t("join_now.step_four.emailDuplicateMessage")}
        </div>
      )}
    </FormFour>
  );
};

export default StepFour;
