import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
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
  HomeLink,
} from "../../styles/LoginPageStyles";

// Assets
import { ReactComponent as LoginImage } from "../../assets/svgs/mobile-login.svg";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { ReactComponent as User } from "../../assets/svgs/user.svg";
import { ReactComponent as Lock } from "../../assets/svgs/lock.svg";

const LoginPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  // useEffect(() => {
  //   const navbar = document.querySelector(".Navbar");
  //   const footer = document.querySelector(".Footer");

  //   navbar.classList.add("display-none");
  //   footer.classList.add("display-none");
  // }, []);

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
        <p>Inicio</p>
      </HomeLink>
      <ImageSide>
        <Image>
          <LoginImage />
        </Image>
      </ImageSide>
      <LoginFormSide>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Login</FormTitle>
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

          <InputWrapper>
            <input
              type="password"
              className={`${password && "typed"} ${errors.password && "error"}`}
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
                Tu cuenta no está verificada. Haz click aquí para recibir un
                nuevo correo de confirmación
              </p>
            )}
            {emailConfirmationSent && (
              <p className="error">The email has already been sent</p>
            )}
          </div>
          <Link to="/forgot-password">
            ¿No recuerdas tu contraseña? Haz click aquí
          </Link>
          <Submit>Log in</Submit>
        </LoginForm>
      </LoginFormSide>
    </Login>
  );
};

export default LoginPage;
