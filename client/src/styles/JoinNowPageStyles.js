import styled, { css } from "styled-components";
import { transparentize } from "polished";

// Styles
import { page, H2, Container, Parragraph, breakpoint } from "./GlobalStyles";

export const JoinNow = styled.div`
  ${page}
`;
export const JoinNowSection = styled.div``;
export const JoinNowSectionWrapper = styled(Container)``;
export const JoinNowSectionTitle = styled(H2)``;
export const JoinNowSectionInfo = styled(Parragraph)``;

export const FormsWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  box-shadow: 4px 4px 10px ${(props) => props.theme.color.gray300};
  display: grid;
  grid-template-columns: 4fr 6fr;
  border-radius: 10px;
  overflow-x: hidden;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const FormLocation = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(5, 5fr);
    padding: 10px 20px;
  }
`;

export const FormLocationTitle = styled.p`
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 700px) {
    grid-column: 1/-1;
    margin-bottom: 1rem;
  }
`;
export const Location = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 0.7rem;
  font-weight: 700;
  color: ${(props) => transparentize(0.8, props.theme.color.white)};

  p.number {
    line-height: 30px;
    text-align: center;
    height: 30px;
    width: 30px;
    border-radius: 100px;
    justify-self: center;
    margin-right: 1rem;
  }

  &.active {
    .number {
      color: ${(props) => props.theme.color.primary};
      background: ${(props) => props.theme.color.white};
    }

    .location {
      color: ${(props) => props.theme.color.white};
    }
  }

  @media screen and (max-width: 700px) {
    justify-self: center;
    margin-bottom: 0;
    .location {
      display: none;
    }
  }
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: ${(props) => (props.one ? "end" : "space-between")};
  width: 100%;
`;

export const Button = styled.div`
  background: ${(props) => props.theme.color.secondary};
  border: none;
  color: ${(props) => props.theme.color.white};
  padding: 5px 25px 7px;
  font-weight: 600;
  border-radius: 5px;
  align-self: end;
  cursor: pointer;
  outline: none;
  justify-items: end;
`;

export const SubmitButton = styled.button`
  background: ${(props) => props.theme.color.secondary};
  border: none;
  color: ${(props) => props.theme.color.white};
  padding: 5px 25px 7px;
  font-weight: 600;
  border-radius: 5px;
  align-self: end;
  cursor: pointer;
  outline: none;
  justify-items: end;
  position: relative;
  /* line-height: 1rem; */
  svg {
    height: 20px;
    fill: ${(props) => props.theme.color.white};
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Forms = styled.form`
  padding: 20px;
  display: grid;
`;

export const InputWraper = styled.div`
  position: relative;
  input[type="text"],
  input[type="password"],
  select[name="rcrs-country"],
  select[name="rcrs-region"],
  input.form-control[type="tel"] {
    padding: 3px 10px;
    border: 2px solid ${(props) => props.theme.color.gray300};
    border-radius: 2px;
    outline: none;
    width: 100%;
    max-width: 250px;
    &:focus {
      border: 2px solid ${(props) => props.theme.color.secondary};
    }
  }

  .error {
    position: absolute;
    font-size: 0.75rem;
    color: ${(props) => props.theme.color.secondary};
    max-width: 100%;
  }

  // Country and Region selectors
  select[name="rcrs-country"] {
    width: 100%;
  }

  select[name="rcrs-region"] {
    width: 100%;
  }

  // Phone input
  input.form-control[type="tel"] {
    // min height plust 6px padding
    max-height: calc(25.6px + 6px);
    width: 100%;
    padding-left: 48px;
  }

  // React datepicker
  .react-datepicker-wrapper {
    width: 100%;

    input {
      text-align: center;
    }
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
    props.width == "short" &&
    css`
      grid-auto-columns: auto;
      grid-auto-flow: column;
    `}

  ${(props) =>
    props.width == "wide" &&
    css`
      grid-template-columns: 1fr 1fr;
    `}
  
  ${(props) =>
    props.width == "full" &&
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

const baseForm = css`
  display: grid;
  gap: 30px 20px;
  align-content: start;
  margin-bottom: 30px;
  padding-bottom: 30px;
`;

const message = css`
  .message {
    grid-column: 1/-1;

    p {
      font-size: 0.8rem;
      word-break: break-all;
      a {
        text-decoration: none;
        color: ${(props) => props.theme.color.link};
        cursor: pointer;
      }
    }
  }
`;

export const FormOne = styled.div`
  ${baseForm}
`;

export const FormTwo = styled.div`
  ${baseForm}
  grid-template-columns: repeat(2, calc(((100% - 20px - 20px) / 2) + 10px));
  @media screen and ${breakpoint.xs} {
    grid-template-columns: 1fr;
  }
`;

export const FormThree = styled.div`
  ${baseForm}
  ${message}
  grid-template-columns: 1fr 1fr;

  .frecuency,
  .devices,
  .os,
  .fbEmailImage,
  .bmIdImage,
  .code2FA {
    grid-column: 1/-1;
  }

  @media screen and ${breakpoint.xs} {
    .username,
    .password {
      grid-column: 1/-1;
    }
  }
`;

export const FormFour = styled.div`
  ${baseForm}
  ${message}
  grid-template-columns: repeat(2, calc(((100% - 20px - 20px) / 2) + 10px));
  overflow-x: hidden;
  > * {
    grid-column: 1/-1;
  }
  .paypalEmail {
    grid-column: 1/2;
  }

  .paypalEmailConfirmation {
    grid-column: 2/3;
  }

  .holderName,
  .bankAngency,
  .bankAccountCode,
  .referral {
    width: 100%;
    input[type="text"] {
      width: 100%;
      max-width: none;
    }
  }

  // terms and conditions
  .message.terms {
    max-height: 100px;
    overflow-y: auto;
    border: 2px solid ${(props) => props.theme.color.gray300};
    padding: 10px;
    h2 {
      color: ${(props) => props.theme.color.primary};
      font-size: 0.8rem;
      margin-bottom: 10px;
    }
    p {
      word-break: normal;
      margin-bottom: 5px;
    }
  }

  @media screen and ${breakpoint.sm} {
    .paypalEmail {
      grid-column: 1/-1;
    }

    .paypalEmailConfirmation {
      grid-column: 1/-1;
    }
  }
`;

export const FormFive = styled.div`
  ${baseForm}
  display: block;

  p {
    margin-bottom: 10px;
  }

  p span.congratulations {
    color: ${(props) => props.theme.color.secondary};
    font-weight: 700;
  }

  p.sendEmailConfirmation {
    color: ${(props) => props.theme.color.link};
    font-weight: 500;
    cursor: pointer;
  }
`;

export const JoinNowImage = styled.div``;
