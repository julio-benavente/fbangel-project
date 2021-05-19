import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  HomeLink as LoginLink,
} from "../../styles/LoginPageStyles";

// Assets
import { ReactComponent as LoginImage } from "../../assets/svgs/mobile-login.svg";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { ReactComponent as User } from "../../assets/svgs/user.svg";

const LoginPage = () => {
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
        <p>Login</p>
      </LoginLink>
      <ImageSide>
        <Image>
          <LoginImage />
        </Image>
      </ImageSide>
      <LoginFormSide>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Forgot password</FormTitle>
          <InputWrapper>
            <input
              type="text"
              className={`${email && "typed"} ${errors.email && "error"}`}
              {...register("email", {
                required: {
                  value: true,
                  message: "Por favor, llenar este campo",
                },
                validate: {
                  min: (v) => (v.length < 6 ? "Mínimo 6 caracteres" : true),
                },
              })}
            />
            <User />
            <label>Email</label>
            <p className="error">{errors.email && errors.email.message}</p>
          </InputWrapper>

          <div className="errorMessages">
            {resetEmailSent && (
              <p className="error">The email has already been sent</p>
            )}
          </div>
          <Submit>Send reset password email</Submit>
        </LoginForm>
      </LoginFormSide>
    </Login>
  );
};

export default LoginPage;
