import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { Lightbox } from "react-modal-image";
import { useTranslation } from "react-i18next";
import { templateFormatter } from "input-format";

// Components
import FileInput from "../FileInput";
import OptionInput from "../OptionInput";
import TextInput from "../TextInput";

// Assets
import businessManagerImageOne from "../../../assets/images/businessManagerImageOne.jpg";
import businessManagerImageTwo from "../../../assets/images/businessManagerImageTwo.jpg";
import facebookEmailConfirmationImageOne from "../../../assets/images/facebookEmailConfirmationImageOne.jpg";
import facebookEmailConfirmationImageTwo from "../../../assets/images/facebookEmailConfirmationImageTwo.jpg";

// Styles
import { FormThree } from "../../../styles/JoinNowPageStyles";
import { InputWraper, Question } from "../../../styles/JoinNowPageStyles";

const StepThree = () => {
  const { t } = useTranslation();
  const [bussinessManagerImageExOne, setBussinessManagerImageExOne] = useState(false);
  const [bussinessManagerImageExTwo, setBussinessManagerImageExTwo] = useState(false);
  const [facebookEmailConfirmationImageExOne, setFacebookEmailConfirmationImageExOne] = useState(false);
  const [facebookEmailConfirmationImageExTwo, setFacebookEmailConfirmationImageExTwo] = useState(false);

  const methods = useFormContext();
  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const [code2FA, setCode2FA] = useState("");

  return (
    <FormThree>
      <OptionInput
        width="wide"
        className="frecuency"
        type="radio"
        error={errors.stepThree && errors.stepThree.frecuency && errors.stepThree.frecuency.message}
        options={[
          [t("join_now.step_three.frequency.option_1"), "everyday"],
          [t("join_now.step_three.frequency.option_2"), "1-2_a_week"],
          [t("join_now.step_three.frequency.option_3"), "2-3_a_week"],
          [t("join_now.step_three.frequency.option_4"), "1-2_a_month"],
        ]}
        question={t("join_now.step_three.frequency.question")}
        register={register("stepThree.frecuency", {
          required: {
            value: true,
            message: t("join_now.step_three.frequency.error_1"),
          },
        })}
      />

      <OptionInput
        width="wide"
        className="devices"
        type="checkbox"
        options={[
          [t("join_now.step_three.devices.option_1"), "pc"],
          [t("join_now.step_three.devices.option_2"), "tablet"],
          [t("join_now.step_three.devices.option_3"), "movil"],
          [t("join_now.step_three.devices.option_4"), "other"],
        ]}
        error={errors.stepThree && errors.stepThree.devices && errors.stepThree.devices.message}
        question={t("join_now.step_three.devices.question")}
        register={register("stepThree.devices", {
          required: {
            value: true,
            message: t("join_now.step_three.devices.error_1"),
          },
        })}
      />

      <OptionInput
        width="wide"
        className="os"
        type="checkbox"
        options={[
          [t("join_now.step_three.os.option_1"), "windows"],
          [t("join_now.step_three.os.option_2"), "android"],
          [t("join_now.step_three.os.option_3"), "apple"],
          [t("join_now.step_three.os.option_4"), "other"],
        ]}
        question={t("join_now.step_three.os.question")}
        error={errors.stepThree && errors.stepThree.os && errors.stepThree.os.message}
        register={register("stepThree.os", {
          required: {
            value: true,
            message: t("join_now.step_three.os.error_1"),
          },
        })}
      />

      <TextInput
        className="username"
        error={errors.stepThree && errors.stepThree.fbUsername && errors.stepThree.fbUsername.message}
        question={t("join_now.step_three.username.question")}
        register={register("stepThree.fbUsername", {
          required: {
            value: true,
            message: t("join_now.step_three.username.error_1"),
          },
          validate: {
            min: (v) => (v.length < 6 ? t("join_now.step_three.username.error_2") : true),
          },
        })}
      />
      <TextInput
        type="password"
        className="password"
        question={t("join_now.step_three.fbPassword.question")}
        error={errors.stepThree && errors.stepThree.fbPassword && errors.stepThree.fbPassword.message}
        register={register("stepThree.fbPassword", {
          required: {
            value: true,
            message: t("join_now.step_three.fbPassword.error_1"),
          },
          validate: {
            min: (v) => (v.length < 6 ? t("join_now.step_three.fbPassword.error_2") : true),
          },
        })}
      />
      <FileInput
        className="fbEmailImage"
        question={t("join_now.step_three.fbEmailImage.question")}
        error={errors.stepThree && errors.stepThree.fbEmailImage && errors.stepThree.fbEmailImage.message}
        register={register("stepThree.fbEmailImage", {
          required: {
            value: true,
            message: t("join_now.step_three.fbEmailImage.error_1"),
          },
          validate: {
            size: (v) => (v[0].size > 2000000 ? t("join_now.step_three.fbEmailImage.error_2") : true),
            type: (v) =>
              !["image/jpeg", "image/jpg", "image/png"].includes(v[0].type)
                ? t("join_now.step_three.fbEmailImage.error_3")
                : true,
            name: (v) => {
              const name = v[0].name;
              const split = name.split(".");
              split.pop();
              const joined = split.join(".");
              if (joined.length > 20) {
                return t("join_now.step_three.fbEmailImage.error_4");
              } else {
                return true;
              }
            },
          },
        })}
      />
      <div className="message">
        <p>{t("join_now.step_three.fbEmailImage.message.p_1.0")}</p>
        <p>
          {" "}
          <a onClick={() => setFacebookEmailConfirmationImageExOne(true)}>
            {t("join_now.step_three.fbEmailImage.message.p_2.0")}
          </a>{" "}
        </p>{" "}
        {facebookEmailConfirmationImageExOne && (
          <Lightbox
            hideDownload={true}
            medium={facebookEmailConfirmationImageOne}
            large={facebookEmailConfirmationImageOne}
            alt={t("join_now.step_three.fbEmailImage.image_one")}
            onClose={() => setFacebookEmailConfirmationImageExOne(false)}
          />
        )}
        <p>
          <a onClick={() => setFacebookEmailConfirmationImageExTwo(true)}>
            {t("join_now.step_three.fbEmailImage.message.p_3.0")}
          </a>
          {facebookEmailConfirmationImageExTwo && (
            <Lightbox
              hideDownload={true}
              medium={facebookEmailConfirmationImageTwo}
              large={facebookEmailConfirmationImageTwo}
              alt={t("join_now.step_three.fbEmailImage.image_two")}
              onClose={() => setFacebookEmailConfirmationImageExTwo(false)}
            />
          )}
        </p>
        <p>
          <b>{t("join_now.step_three.fbEmailImage.message.p_4.0")}</b>{" "}
          {t("join_now.step_three.fbEmailImage.message.p_4.1")} &gt;{" "}
          {t("join_now.step_three.fbEmailImage.message.p_4.2")} &gt;{" "}
          {t("join_now.step_three.fbEmailImage.message.p_4.3")} &gt;{" "}
          {t("join_now.step_three.fbEmailImage.message.p_4.4")}
        </p>
        <p>
          <b>{t("join_now.step_three.fbEmailImage.message.p_5.0")}</b>{" "}
          {t("join_now.step_three.fbEmailImage.message.p_5.1")} &gt;{" "}
          {t("join_now.step_three.fbEmailImage.message.p_5.2")} &gt;{" "}
          {t("join_now.step_three.fbEmailImage.message.p_5.3")} &gt;{" "}
          {t("join_now.step_three.fbEmailImage.message.p_5.4")}
        </p>
        <p>
          {t("join_now.step_three.fbEmailImage.message.p_6.0")}{" "}
          <a href="https://www.facebook.com/settings" target="_blank">
            https://www.facebook.com/settings
          </a>
        </p>
      </div>

      <FileInput
        className="bmIdImage"
        question={t("join_now.step_three.bmIdImage.question")}
        error={errors.stepThree && errors.stepThree.bmIdImage && errors.stepThree.bmIdImage.message}
        register={register("stepThree.bmIdImage", {
          required: {
            value: true,
            message: t("join_now.step_three.bmIdImage.error_1"),
          },
          validate: {
            size: (v) => (v[0].size > 2000000 ? t("join_now.step_three.bmIdImage.error_2") : true),
            type: (v) =>
              !["image/jpeg", "image/jpg", "image/png"].includes(v[0].type)
                ? t("join_now.step_three.bmIdImage.error_3")
                : true,
            name: (v) => {
              const name = v[0].name;
              const split = name.split(".");
              split.pop();
              const joined = split.join(".");
              if (joined.length > 20) {
                return t("join_now.step_three.bmIdImage.error_4");
              } else {
                return true;
              }
            },
          },
        })}
      />
      <div className="message">
        <p>{t("join_now.step_three.bmIdImage.message.p_1.0")}</p>
        <p>
          <a onClick={() => setBussinessManagerImageExOne(true)}>{t("join_now.step_three.bmIdImage.message.p_2.0")}</a>
        </p>
        {bussinessManagerImageExOne && (
          <Lightbox
            hideDownload={true}
            medium={businessManagerImageOne}
            large={businessManagerImageOne}
            alt={t("join_now.step_three.bmIdImage.image_one")}
            onClose={() => setBussinessManagerImageExOne(false)}
          />
        )}
        <p>
          <a onClick={() => setBussinessManagerImageExTwo(true)}>{t("join_now.step_three.bmIdImage.message.p_3.0")}</a>
        </p>
        {bussinessManagerImageExTwo && (
          <Lightbox
            hideDownload={true}
            medium={businessManagerImageTwo}
            large={businessManagerImageTwo}
            alt={t("join_now.step_three.bmIdImage.image_two")}
            onClose={() => setBussinessManagerImageExTwo(false)}
          />
        )}
      </div>

      <Controller
        name="stepThree.code2FA"
        rules={{
          required: {
            value: true,
            message: t("join_now.step_three.code2FA.error_1"),
          },
          validate: {
            numCharacters: (v) => (v.length !== 32 ? t("join_now.step_three.code2FA.error_2") : true),
          },
        }}
        render={({ field: { onChange } }) => {
          return (
            <InputWraper className="code2FA">
              <Question>{t("join_now.step_three.code2FA.question")}</Question>

              <input
                type="text"
                value={code2FA}
                maxLength="39"
                onChange={(e) => {
                  const value = e.target.value.replace(/-/g, "");

                  const TEMPLATE = "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx";
                  const format = templateFormatter(TEMPLATE);
                  const { text } = format(value);

                  setCode2FA(text);
                  onChange(value);
                }}
              />

              <p className="error">
                {errors.stepThree && errors.stepThree.code2FA && errors.stepThree.code2FA.message}
              </p>
            </InputWraper>
          );
        }}
      />

      <div className="message">
        <p>
          {t("join_now.step_three.code2FA.message.p_1")}{" "}
          <a href="https://www.facebook.com/security/2fac/setup/intro" target="_blank">
            https://www.facebook.com/security/2fac/setup/intro
          </a>{" "}
          {t("join_now.step_three.code2FA.message.p_2")}{" "}
          <Link to="/how-it-works" target="_blank">
            {t("join_now.step_three.code2FA.message.p_3")}
          </Link>{" "}
          {t("join_now.step_three.code2FA.message.p_4")}
        </p>
      </div>
    </FormThree>
  );
};

export default StepThree;
