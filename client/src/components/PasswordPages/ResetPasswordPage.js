import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

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
  const [resetPasswordConfirmation, setResetPasswordConfirmation] =
    useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`/auth/reset-password/${token}`, {
        password,
      });

      if (response) {
        setResetPasswordConfirmation(true);
      }

      console.log(response);
    } catch ({ response }) {
      setResetPasswordError(response.data.error);
    }
  };

  return (
    <Login>
      <HomeLink to="/login">
        <Arrow />
        <p>Login</p>
      </HomeLink>
      <ImageSide>
        <Image>
          <LoginImage />
        </Image>
      </ImageSide>
      <LoginFormSide>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Reset Password</FormTitle>

          {!resetPasswordConfirmation && (
            <>
              {" "}
              <InputWrapper>
                <input
                  type="password"
                  className={`${password && "typed"} ${
                    errors.password && "error"
                  }`}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Por favor, llenar este campo",
                    },
                    validate: {
                      min: (v) => (v.length < 6 ? "Mínimo 6 caracteres" : true),
                    },
                  })}
                />
                <Lock />
                <label>Password</label>
                <p className="error">
                  {errors.password && errors.password.message}
                </p>
              </InputWrapper>
              <InputWrapper>
                <input
                  type="password"
                  className={`${passwordConfirmation && "typed"} ${
                    errors.passwordConfirmation && "error"
                  }`}
                  {...register("passwordConfirmation", {
                    required: {
                      value: true,
                      message: "Por favor, llenar este campo",
                    },
                    validate: {
                      same: (v) =>
                        v !== password ? "Password don't match " : true,
                    },
                  })}
                />
                <Lock />
                <label>Confirm Password</label>
                <p className="error">
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.message}
                </p>
              </InputWrapper>
            </>
          )}

          <div className="errorMessages">
            {resetPasswordConfirmation && (
              <p className="error">Your password has been changed!</p>
            )}
            {resetPasswordError && (
              <p className="error">{resetPasswordError}</p>
            )}
          </div>

          {!resetPasswordConfirmation && (
            <Submit>{!isSubmitting ? "Reset password" : "Waiting"}</Submit>
          )}
        </LoginForm>
      </LoginFormSide>
    </Login>
  );
};

export default LoginPage;
