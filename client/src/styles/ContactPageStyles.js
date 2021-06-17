import styled from "styled-components";
import { darken } from "polished";
// Styles
import { page, Container, H2, RoundedBtn, Parragraph } from "./GlobalStyles";

export const Contact = styled.div`
  ${page}
`;

export const ContactSection = styled.div``;

export const ContactSectionWrapper = styled(Container)``;

export const FormSideWrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
  min-height: 500px;
  box-shadow: 4px 4px 10px ${(props) => props.theme.color.gray300};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  .email_sent {
    padding: 30px;
    font-size: 2rem;
    font-weight: 700;
    color: ${(props) => props.theme.color.black};
    text-align: left;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactSide = styled.div`
  display: grid;
  align-content: start;
  background: ${(props) => props.theme.color.primary};
  padding: 30px;

  @media screen and (max-width: 700px) {
    grid-row: 1/2;
  }
`;

export const ContactSideTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  text-align: right;
  margin-bottom: 1rem;
`;

export const ContactSideInformation = styled(Parragraph)`
  color: ${(props) => props.theme.color.white};
  font-weight: 300;
`;

export const TelegramButton = styled.a`
  background: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.primary};
  font-weight: 700;
  justify-self: center;
  text-decoration: none;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  align-items: center;
  cursor: pointer;
  svg {
    margin-left: 10px;
    height: 25px;
    fill: ${(props) => props.theme.color.link};
  }

  &:hover {
    background: ${(props) => props.theme.color.link};
    color: ${(props) => props.theme.color.white};
    svg {
      fill: ${(props) => props.theme.color.white};
    }
  }

  @media screen and (max-width: 700px) {
    justify-self: start;
  }
`;

export const Form = styled.form`
  display: grid;
  align-content: start;
  padding: 30px;
`;

export const FormTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  .error {
    position: absolute;
    font-size: 0.75rem;
    color: ${(props) => props.theme.color.secondary};
    max-width: 100%;
  }
`;

export const Label = styled.p`
  font-weight: 700;
  margin-bottom: 5px;
  span {
    color: ${(props) => props.theme.color.secondary};
  }
`;

export const TextInput = styled.input`
  padding: 4px 10px;
  border: 2px solid ${(props) => props.theme.color.gray300};
  border-radius: 2px;
  outline: none;
  width: 100%;
  max-width: 300px;
  &:focus {
    border: 2px solid ${(props) => props.theme.color.secondary};
  }
`;

export const TextArea = styled.textarea`
  padding: 10px 10px;
  min-height: 150px;
  border: 2px solid ${(props) => props.theme.color.gray300};
  border-radius: 2px;
  outline: none;
  width: 100%;
  &:focus {
    border: 2px solid ${(props) => props.theme.color.secondary};
  }
`;

export const SendButton = styled.input`
  background: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
  justify-self: center;
  border: none;
  padding: 7px 23px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
  outline: none;

  &[disabled="true"] {
    background: ${(props) => props.theme.color.gray300};
  }
`;
