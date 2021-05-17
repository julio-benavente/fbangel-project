import styled, { css } from "styled-components";
import { darken } from "polished";
import { Link } from "react-router-dom";

// Styles
import { H2 } from "./GlobalStyles";

export const Login = styled.div`
  position: relative;
  background: ${(props) => props.theme.color.white};
  min-height: 100vh;
  min-width: 100vw;
  max-width: 1440px;
  z-index: 100;
  display: grid;
  grid-template-columns: repeat(2, calc(50%));
  position: absolute;
`;

export const ImageSide = styled.div`
  background: ${(props) => darken(0, props.theme.color.primary)};
  display: grid;
  justify-items: center;
  align-items: center;
`;

export const Image = styled.div`
  width: clamp(200px, 70%, 500px);

  svg {
    width: 100%;
  }
`;

export const LoginFormSide = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  width: clamp(200px, 70%, 300px);
  display: grid;
  position: relative;
  a {
    text-decoration: none;
    font-size: 0.8rem;
    color: ${(props) => props.theme.color.link};
    text-align: center;
  }

  .errorMessages {
    position: relative;

    p.error {
      text-align: center;
      color: ${(props) => props.theme.color.secondary};
      font-size: 0.75rem;
      bottom: 0;
    }
  }
`;

export const FormTitle = styled(H2)`
  color: ${(props) => props.theme.color.primary};
`;

export const InputWrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 5px 10px 5px 40px;
    margin: 20px 0 20px 0;
    outline: none;
    border: 2px ${(props) => props.theme.color.gray300} solid;
    border-radius: 5px;

    &.typed ~ label,
    &:focus ~ label {
      top: 20px;
      left: 0px;
      transform: translateY(-100%);
      font-size: 0.875rem;
      color: ${(props) => props.theme.color.black};
    }

    &.typed ~ svg,
    &:focus ~ svg {
      fill: ${(props) => props.theme.color.primary};
    }

    &:focus,
    &.typed {
      border: 2px ${(props) => props.theme.color.primary} solid;
    }

    &.error {
      border: 2px ${(props) => props.theme.color.secondary} solid;
    }

    &.error ~ svg {
      fill: ${(props) => props.theme.color.secondary};
    }
  }

  label {
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    transition: 200ms all ease-in-out;
    pointer-events: none;
    color: ${(props) => props.theme.color.gray300};
    font-weight: 600;
  }

  svg {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    fill: ${(props) => props.theme.color.gray300};

    &::before {
      content: "asd";
      width: 20px;
      height: 20px;
      background: ${(props) => props.theme.color.gray300};
    }
  }

  p.error {
    position: absolute;
    color: ${(props) => props.theme.color.secondary};
    font-size: 0.75rem;
    bottom: 0;
  }
`;

export const Submit = styled.button`
  padding: 5px 20px;
  color: ${(props) => props.theme.color.white};
  font-weight: 600;
  background: ${(props) => props.theme.color.secondary};
  justify-self: center;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
`;

export const HomeLink = styled(Link)`
  position: absolute;
  right: 50px;
  top: 20px;
  padding: 3px 15px;
  background: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
  text-decoration: none;
  border-radius: 5px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
    margin-right: 10px;
  }
`;
