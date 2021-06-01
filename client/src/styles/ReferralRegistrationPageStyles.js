import styled, { css } from "styled-components";
import { transparentize } from "polished";

// Styles
import { page, Container, H2, textInputStyle } from "./GlobalStyles";

export const ReferralRegistration = styled.div`
  ${page}
`;

export const ReferralRegistrationSection = styled.div``;

export const ReferralRegistrationSectionWrapper = styled(Container)``;

export const ReferralRegistrationTitle = styled(H2)``;

export const ReferralRegistrationInfo = styled.div`
  margin-bottom: 1rem;
`;

export const Form = styled.div``;

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
`;

export const Forms = styled.form`
  padding: 20px;
  display: grid;
`;

const baseStepStyle = css`
  display: grid;
  gap: 20px;
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

export const StepOne = styled.div`
  ${baseStepStyle}

  select[name="rcrs-country"],
  select[name="rcrs-region"],
  input[class=" form-control"] {
    width: 100%;
    height: 31.82px;

    ${textInputStyle}
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  input[class=" form-control"] {
    border: 2px solid #bfbfbf;
    padding-left: 44px;
  }

  grid-template-columns: repeat(2, calc((50% - 10px)));
`;

export const StepTwo = styled.div`
  ${baseStepStyle}
  ${message}
  grid-template-columns: repeat(2, calc(((100% - 20px - 20px) / 2) + 10px));
  overflow-x: hidden;
  /* justify-items: start; */
  > * {
    grid-column: 1/-1;
  }

  .paymentMethod {
    label {
      width: 100%;
      input {
        width: auto;
        max-width: none;
      }
    }
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

  .documentImage input {
    border: none;
    width: 100%;
    max-width: none;
    padding: 0;
  }

  .termsAndConditions {
    margin-bottom: 10px;
    input {
      width: auto;
    }
    a {
      text-decoration: none;
      color: ${(props) => props.theme.color.link};
    }
  }
`;

export const Captcha = styled.div`
  position: relative;
  .error {
    position: absolute;
    font-size: 0.75rem;
    color: #fb5d64;
    max-width: 100%;
  }
`;

export const StepThree = styled.div`
  ${baseStepStyle}
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
