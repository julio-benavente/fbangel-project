import styled, { css } from "styled-components";
import { textInputStyle } from "../GlobalStyles";

export const InputWraper = styled.div`
  input {
    ${textInputStyle}
  }

  .error {
    position: absolute;
    font-size: 0.75rem;
    color: ${(props) => props.theme.color.secondary};
    max-width: 100%;
  }
`;

export const Question = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
  span {
    color: ${(props) => props.theme.color.secondary};
  }
`;

export const Options = styled.div`
  display: grid;
  justify-content: start;
  align-content: start;
  gap: 0 20px;

  ${(props) =>
    // Yes or no option
    props.width === "short" &&
    css`
      grid-auto-columns: auto;
      grid-auto-flow: column;
    `}

  ${(props) =>
    props.width === "wide" &&
    // Half width
    css`
      grid-template-columns: 1fr 1fr;
    `}
  
  ${(props) =>
    // Full width
    props.width === "full" &&
    css`
      grid-template-columns: 1fr;
    `}
`;

export const Option = styled.label`
  padding: 0 20px 0 0;
  position: relative;

  .box {
    position: absolute;
    width: 14px;
    height: 14px;
    border: 1px solid ${(props) => props.theme.color.gray300};
    top: 12px;
    transform: translateY(-50%);
    left: 0;

    &.radio {
      border-radius: 100px;
    }

    &.checkbox {
      border-radius: 2px;
    }
  }

  input:checked ~ .box {
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: ${(props) => props.theme.color.secondary};
    }

    &.radio::after {
      border-radius: 100px;
    }

    &.checkbox::after {
      border-radius: 1px;
    }
  }
`;
