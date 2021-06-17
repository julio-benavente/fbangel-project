import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
// Styles
import {
  Login,
  ImageSide,
  Image,
  LoginFormSide,
  LoginForm,
  Submit,
  InputWrapper,
  FormTitle,
  HomeLink,
} from "../../styles/LoginPageStyles";

// Assets
import { ReactComponent as LoginImage } from "../../assets/svgs/mobile-login.svg";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { ReactComponent as Lock } from "../../assets/svgs/lock.svg";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("reset_password.title");
  }, [language]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const password = useWatch({ control, name: "password" });
  const passwordConfirmation = useWatch({
    control,
    name: "passwordConfirmation",
  });

  const { token } = useParams();
  const [resetPasswordConfirmation, setResetPasswordConfirmation] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(false);

  const onSubmit = async data => {
    try {
      const response = await axios.put(`/auth/reset-password/${token}`, {
        password,
      });

      if (response) {
        setResetPasswordConfirmation(true);
      }

      console.log(response);
    } catch ({ response }) {
      setResetPasswordError(true);
    }
  };

  return (
    <Login>
      <HomeLink to="/login">
        <Arrow />
        <p>{t("reset_password.login_link")}</p>
      </HomeLink>
      <ImageSide>
        <Image>
          <LoginImage />
        </Image>
      </ImageSide>
      <LoginFormSide>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>{t("reset_password.title")}</FormTitle>

          {!resetPasswordConfirmation && (
            <>
              {" "}
              <InputWrapper>
                <input
                  type="password"
                  className={`${password && "typed"} ${errors.password && "error"}`}
                  {...register("password", {
                    required: {
                      value: true,
                      message: t("reset_password.password_error_required"),
                    },
                    validate: {
                      min: v => (v.length < 6 ? t("reset_password.password_error_min") : true),
                    },
                  })}
                />
                <Lock />
                <label>{t("reset_password.password")}</label>
                <p className="error">{errors.password && errors.password.message}</p>
              </InputWrapper>
              <InputWrapper>
                <input
                  type="password"
                  className={`${passwordConfirmation && "typed"} ${errors.passwordConfirmation && "error"}`}
                  {...register("passwordConfirmation", {
                    required: {
                      value: true,
                      message: t("reset_password.password_confirmation_error_required"),
                    },
                    validate: {
                      same: v => (v !== password ? t("reset_password.password_confirmation_error_same") : true),
                    },
                  })}
                />
                <Lock />
                <label>{t("reset_password.password_confirmation")}</label>
                <p className="error">{errors.passwordConfirmation && errors.passwordConfirmation.message}</p>
              </InputWrapper>
            </>
          )}

          <div className="errorMessages">
            {resetPasswordConfirmation && <p className="error">{t("reset_password.reset_confirmation_message")}</p>}

            {resetPasswordError && <p className="error">{t("reset_password.reset_password_confirmation")}</p>}
          </div>

          {!resetPasswordConfirmation && (
            <Submit>
              {!isSubmitting ? t("reset_password.submit_button") : t("reset_password.submit_button_waiting")}
            </Submit>
          )}
        </LoginForm>
      </LoginFormSide>
    </Login>
  );
};

export default LoginPage;
