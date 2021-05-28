import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
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
  HomeLink as LoginLink,
} from "../../styles/LoginPageStyles";

// Assets
import { ReactComponent as LoginImage } from "../../assets/svgs/mobile-login.svg";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { ReactComponent as User } from "../../assets/svgs/user.svg";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const email = useWatch({ control, name: "email" });

  const [resetEmailSent, setResetEmailSent] = useState(false);
  const onSubmit = (data) => {
    if (!isSubmitting) {
      setResetEmailSent(true);
      axios.post("/auth/forgotten-password", {
        email,
      });
    }
  };

  return (
    <Login>
      <LoginLink to="/login">
        <Arrow />
        <p>{t("forgot_password.login_link")}</p>
      </LoginLink>
      <ImageSide>
        <Image>
          <LoginImage />
        </Image>
      </ImageSide>
      <LoginFormSide>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>{t("forgot_password.title")}</FormTitle>
          <InputWrapper>
            <input
              type="text"
              className={`${email && "typed"} ${errors.email && "error"}`}
              {...register("email", {
                required: {
                  value: true,
                  message: t("forgot_password.email_error_required"),
                },
                validate: {
                  min: (v) =>
                    v.length < 6 ? t("forgot_password.email_error_min") : true,
                },
              })}
            />
            <User />
            <label>{t("forgot_password.email")}</label>
            <p className="error">{errors.email && errors.email.message}</p>
          </InputWrapper>

          <div className="errorMessages">
            {resetEmailSent && (
              <p className="error">{t("forgot_password.email_sent")}</p>
            )}
          </div>
          <Submit>{t("forgot_password.submit_button")}</Submit>
        </LoginForm>
      </LoginFormSide>
    </Login>
  );
};

export default LoginPage;
