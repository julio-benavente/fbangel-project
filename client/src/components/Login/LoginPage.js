import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  logIn,
  getUser,
  getErrors,
  loginSucceeded,
} from "../../store/auth/auth";

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
import { ReactComponent as User } from "../../assets/svgs/user.svg";
import { ReactComponent as Lock } from "../../assets/svgs/lock.svg";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const authErrors = useSelector(getErrors);
  const user = useSelector(getUser);

  const email = useWatch({ control, name: "email" });
  const password = useWatch({ control, name: "password" });

  const { push } = useHistory();
  const onSubmit = async (data) => {
    const response = await dispatch(
      logIn({
        email,
        password,
      })
    );

    console.log(response);

    response.type === loginSucceeded.type && push("/dashboard");
  };

  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);
  const sendEmailConfirmation = (email) => {
    setEmailConfirmationSent(true);
    axios.post("/auth/send-confirmation-email", {
      email,
    });
  };

  return (
    <Login>
      <HomeLink to="/">
        <Arrow />
        <p>{t("login.home_link")}</p>
      </HomeLink>
      <ImageSide>
        <Image>
          <LoginImage />
        </Image>
      </ImageSide>
      <LoginFormSide>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>{t("login.title")}</FormTitle>
          <InputWrapper>
            <input
              type="text"
              className={`${email && "typed"} ${errors.email && "error"}`}
              {...register("email", {
                required: {
                  value: true,
                  message: t("login.email_error_required"),
                },
                validate: {
                  min: (v) =>
                    v.length < 6 ? t("login.email_error_min") : true,
                },
                // pattern: {
                //   value:
                //     /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                //   message: t("login.email_error_pattern"),
                // },
              })}
            />
            <User />
            <label>{t("login.email")}</label>
            <p className="error">{errors.email && errors.email.message}</p>
          </InputWrapper>

          <InputWrapper>
            <input
              type="password"
              className={`${password && "typed"} ${errors.password && "error"}`}
              {...register("password", {
                required: {
                  value: true,
                  message: t("login.password_error_required"),
                },
                validate: {
                  min: (v) =>
                    v.length < 6 ? t("login.password_error_min") : true,
                },
              })}
            />
            <Lock />
            <label>{t("login.password")}</label>
            <p className="error">
              {errors.password && errors.password.message}
            </p>
          </InputWrapper>
          <div className="errorMessages">
            {authErrors.email && <p className="error">{authErrors.email}</p>}
            {authErrors.password && (
              <p className="error">{authErrors.password}</p>
            )}
            {authErrors.emailVerified && (
              <p
                className="error sendEmailConfirmation"
                onClick={() => sendEmailConfirmation(email)}
              >
                {t("login.email_verified_error")}
              </p>
            )}
            {emailConfirmationSent && (
              <p className="error">
                {t("login.email_confirmation_sent_error")}
              </p>
            )}
          </div>
          <Link to="/join-now">{t("login.no_account")}</Link>
          <Link to="/forgot-password">{t("login.forgot_password")}</Link>
          <Submit>{t("login.login_button")}</Submit>
        </LoginForm>
      </LoginFormSide>
    </Login>
  );
};

export default LoginPage;
