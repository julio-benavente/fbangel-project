import React, { useState, useEffect, useRef } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  StepTwo,
  Captcha,
} from "../../../styles/ReferralRegistrationPageStyles";
import { TextInput } from "../../../components/Global/Inputs";
import { OptionInput } from "../../../components/Global/Inputs";
import { FileInput } from "../../../components/Global/Inputs";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

const Main = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const recaptchaRef = React.createRef();

  const {
    register,
    control,
    unregister,
    getValues,
    formState: { errors },
  } = methods;

  const paymentMethod = useWatch({
    control,
    name: "stepTwo.paymentMethod",
  });

  // Unregistration of the payment method
  useEffect(() => {
    if (paymentMethod === "bank-peru") {
      unregister(["stepTwo.paypalEmail", "stepTwo.paypalEmailConfirmation"]);
    }

    if (paymentMethod === "paypal") {
      unregister([
        "stepTwo.holderName",
        "stepTwo.bankAngency",
        "stepTwo.bankAccountCode",
      ]);
    }
  }, [paymentMethod]);

  return (
    <StepTwo>
      <OptionInput
        className="paymentMethod"
        question={t("join_now.step_four.paymentMethod.question")}
        type="radio"
        options={[
          [t("join_now.step_four.paymentMethod.option_1"), "paypal"],
          [t("join_now.step_four.paymentMethod.option_2"), "bank-peru"],
        ]}
        error={
          errors.stepTwo &&
          errors.stepTwo.paymentMethod &&
          errors.stepTwo.paymentMethod.message
        }
        register={register("stepTwo.paymentMethod", {
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
              errors.stepTwo &&
              errors.stepTwo.paypalEmail &&
              errors.stepTwo.paypalEmail.message
            }
            register={register("stepTwo.paypalEmail", {
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
              errors.stepTwo &&
              errors.stepTwo.paypalEmailConfirmation &&
              errors.stepTwo.paypalEmailConfirmation.message
            }
            register={register("stepTwo.paypalEmailConfirmation", {
              required: {
                value: true,
                message: t(
                  "join_now.step_four.paypalEmailConfirmation.error_1"
                ),
              },
              validate: {
                isTheSame: (v) =>
                  !(v === getValues("stepTwo.paypalEmail"))
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
              errors.stepTwo &&
              errors.stepTwo.holderName &&
              errors.stepTwo.holderName.message
            }
            register={register("stepTwo.holderName", {
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
              errors.stepTwo &&
              errors.stepTwo.bankAngency &&
              errors.stepTwo.bankAngency.message
            }
            register={register("stepTwo.bankAngency", {
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
              errors.stepTwo &&
              errors.stepTwo.bankAccountCode &&
              errors.stepTwo.bankAccountCode.message
            }
            register={register("stepTwo.bankAccountCode", {
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
          errors.stepTwo &&
          errors.stepTwo.documentImage &&
          errors.stepTwo.documentImage.message
        }
        register={register("stepTwo.documentImage", {
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
        className="oldReferralCode"
        question="Codigo de referente actual"
        noRequired={true}
        error={
          errors.stepTwo &&
          errors.stepTwo.oldReferralCode &&
          errors.stepTwo.oldReferralCode.message
        }
        register={register("stepTwo.oldReferralCode", {
          validate: {
            max: (v) =>
              v && v.length > 10
                ? t("join_now.step_four.referral.error_1")
                : true,
          },
        })}
      />
      <div className="message">
        <p>
          Si ya eres un referente nuestro, por favor introduce el codigo que
          utilizás actualmente para que todos tus referidos sigan asignados a
          ti. Gracias.
        </p>
      </div>

      <OptionInput
        width="full"
        className="termsAndConditions"
        type="checkbox"
        options={[
          [
            <span>
              Acepto los{" "}
              <Link to="/terms-conditions">términos y condiciones</Link>
            </span>,
            "yes",
          ],
        ]}
        error={
          errors.stepTwo &&
          errors.stepTwo.termsAndConditions &&
          errors.stepTwo.termsAndConditions.message
        }
        register={register("stepTwo.termsAndConditions", {
          required: {
            value: true,
            message: t("join_now.step_four.termsAndConditions.error_1"),
          },
        })}
      />
      <Captcha className="captcha">
        <Controller
          name="stepTwo.captcha"
          defaultValue=""
          control={control}
          rules={{
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
          }}
          render={({ name, field: { onChange } }) => {
            return (
              <ReCAPTCHA
                name={name}
                ref={recaptchaRef}
                sitekey="6LdFDckaAAAAAFJtUWgUqkON2CdA4bnMClpoIM_n"
                onChange={(e) => onChange(true)}
                onExpired={(e) => onChange(false)}
              />
            );
          }}
        />
        <p className="error">
          {errors.stepTwo &&
            errors.stepTwo.captcha &&
            errors.stepTwo.captcha.message}
        </p>
      </Captcha>
    </StepTwo>
  );
};

export default Main;
