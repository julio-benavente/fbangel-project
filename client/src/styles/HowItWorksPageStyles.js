import styled from "styled-components";
import { Link } from "react-router-dom";

// Styles
import {
  Container,
  H2,
  Parragraph,
  PLink,
  breakpoint,
} from "../styles/GlobalStyles";

export const HowItWorks = styled.div`
  padding-top: calc(90px);
`;

export const HowItWorksSection = styled(Container)`
  grid-template-columns: 1fr 1fr;
  position: relative;
  > * {
    grid-column: 1/2;
  }

  @media screen and ${breakpoint.md} {
    display: block;
    flex-direction: column;
  }
`;

export const HowItWorksSectionTitle = styled(H2)`
  color: ${(props) => props.theme.color.secondary};
`;

export const HowItWorksSectionInfo = styled(Parragraph)``;

export const FAQLink = styled(Link)`
  ${PLink}
  display: block;
  margin-top: 10px;
`;

export const HowItWorksImage = styled.img`
  grid-column: 2/3;
  grid-row: 1/3;
  justify-self: end;
  width: clamp(200px, 25vw, 300px);
  margin-top: 2rem;

  @media screen and ${breakpoint.md} {
    display: inline-block;
    float: right;
    margin-left: 20px;
  }

  @media screen and ${breakpoint.sm} {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(calc(clamp(150px, 25vw, 300px) / 2));
    width: clamp(150px, 25vw, 300px);
  }
`;

export const RequirementsSection = styled.div`
  background-color: ${(props) => props.theme.color.darkBlue};
`;

export const RequirementsSectionWrapper = styled(Container)`
  grid-template-columns: 1fr 1fr;
  > * {
    grid-column: 2/3;
  }

  @media screen and ${breakpoint.md} {
    display: block;
  }
`;

export const RequirementsSectionTitle = styled(H2)`
  color: ${(props) => props.theme.color.white};

  justify-self: end;
`;

export const RequirementsList = styled.ul`
  position: relative;
  color: ${(props) => props.theme.color.white};

  li {
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 100px;
      border: 1px solid ${(props) => props.theme.color.gray300};
      top: 7px;
      left: -22px;
    }

    &::after {
      width: 10px;
      height: 10px;
      top: 9px;
      left: -20px;
      background-color: ${(props) => props.theme.color.secondary};
    }
  }

  @media screen and ${breakpoint.md} {
    margin-left: 20px;
  }
`;

export const RequirementsImage = styled.img`
  grid-column: 1/2;
  grid-row: 1/3;
  width: clamp(200px, 25vw, 350px);
  margin-top: 2rem;

  @media screen and ${breakpoint.md} {
    grid-column: auto;
    grid-row: auto;
    float: right;
    margin-left: 20px;
  }
  @media sreen and ${breakpoint} {
    position: relative;
    width: clamp(150px, 25vw, 350px);
    shape-outside: circle();
    /* left: 40px; */
  }
`;

// Configuration section

export const ConfigurationSection = styled.div``;

export const ConfigurationSectionWrapper = styled(Container)`
  grid-template-columns: 1fr 1fr;
  position: relative;

  > * {
    grid-column: 1/2;
  }
  @media screen and ${breakpoint.md} {
    grid-template-columns: 1fr auto;
  }
`;

export const ConfigurationSectionTitle = styled(H2)`
  color: ${(props) => props.theme.color.secondary};
`;

export const ConfigurationInfo = styled(Parragraph)``;

export const ConfigurationImage = styled(HowItWorksImage)`
  grid-column: 2/3;
  grid-row: 1/5;

  @media screen and ${breakpoint.sm} {
    position: absolute;
    top: clamp(50px, 10vh, 100px);
    grid-column: auto;
    grid-row: auto;
    margin: 0;
    transform: translateY(calc(-100% + 20px));
  }
`;

export const ConfigurationList = styled.ol`
  padding-left: 20px;
  li {
    list-style: decimal;
  }
  margin-bottom: 2rem;
`;

export const StepOne = styled.div`
  max-width: 500px;

  ol,
  ul {
    padding-left: 20px;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.link};
  }
`;

export const StepOneTitle = styled.p`
  font-weight: 700;
  margin-bottom: 20px;
  color: ${(props) => props.theme.color.darkBlue};
`;

export const Options = styled.div`
  grid-column: 1/-1;
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;
  }
`;

export const OptionOne = styled.div`
  ol,
  ul {
    padding-left: 20px;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
  }

  img {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.link};
  }
`;

export const OptionOneTitle = styled.div`
  width: 100%;
  padding: 5px 0;
  font-weight: 500;
  text-align: center;
  background-color: ${(props) => props.theme.color.darkBlue};
  color: ${(props) => props.theme.color.white};
  margin-bottom: 20px;
`;

export const OptionTwo = styled(OptionOne)``;
export const OptionTwoTitle = styled(OptionOneTitle)``;

export const StepTwo = styled(StepOne)`
  .extra {
    margin: 10px 0;
    p {
      margin-bottom: 5px;
    }
  }
`;
export const StepTwoTitle = styled(StepOneTitle)``;

// Registration section
export const RegistrationSection = styled.div`
  background-color: ${(props) => props.theme.color.darkBlue};
`;

export const RegistrationSectionWrapper = styled(Container)`
  grid-template-columns: 1fr 1fr;
  position: relative;
  @media screen and ${breakpoint.md} {
    display: block;
  }
`;

export const RegistrationSectionTitle = styled(H2)`
  color: ${(props) => props.theme.color.white};
`;

export const RegistrationImage = styled(HowItWorksImage)`
  @media screen and ${breakpoint.md} {
    position: relative;
    float: right;
    margin: 0 0 30px 30px;
  }
  @media screen and ${breakpoint.sm} {
    position: absolute;
    top: clamp(50px, 10vh, 100px);
    grid-column: auto;
    grid-row: auto;
    margin: 0;
    transform: translateY(calc(-100% + 40px));
  }
`;

export const RegistrationInfo = styled(Parragraph)`
  color: ${(props) => props.theme.color.white};

  a {
    text-decoration: none;
    font-weight: 600;
    color: ${(props) => props.theme.color.primary};
  }
`;

// Payment section
export const PaymentSection = styled.div``;

export const PaymentSectionWrapper = styled(Container)`
  grid-template-columns: 1fr 1fr;
  > * {
    grid-column: 2/3;
  }

  @media screen and ${breakpoint.md} {
    display: block;
  }
`;

export const PaymentImage = styled(HowItWorksImage)`
  grid-row: 1/3;
  grid-column: 1/2;
  justify-self: start;
  align-self: center;
  margin-top: 0;

  @media screen and ${breakpoint.md} {
    transform: scaleX(-1);
  }

  @media screen and ${breakpoint.sm} {
    position: absolute;
    top: clamp(50px, 10vh, 100px);
    grid-column: auto;
    grid-row: auto;
    margin: 0;
    transform: scaleX(-1) translateY(calc(-100% + 40px));
  }
`;

export const PaymentSectionTitle = styled(H2)`
  justify-self: end;
  color: ${(props) => props.theme.color.secondary};
`;

export const PaymentInfo = styled(Parragraph)`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.link};
  }
`;

// Support section
export const SupportSection = styled.div`
  background-color: ${(props) => props.theme.color.darkBlue};
`;

export const SupportSectionWrapper = styled(Container)`
  grid-template-columns: 1fr 1fr;
  > * {
    grid-column: 1/2;
  }

  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;
  }
`;

export const SupportImage = styled(RequirementsImage)`
  grid-column: 2/3;
  grid-row: 1/3;
  justify-self: end;
  align-self: center;

  @media screen and ${breakpoint.sm} {
    position: absolute;
    top: clamp(50px, 10vh, 100px);
    grid-column: auto;
    grid-row: auto;
    margin: 0;
    transform: scaleX(-1) translateY(calc(-100% + 40px));
  }
`;

export const SupportSectionTitle = styled(H2)`
  color: ${(props) => props.theme.color.white};
`;

export const SupportInfo = styled(Parragraph)`
  color: ${(props) => props.theme.color.white};

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.white};
  }

  .important {
    font-weight: 700;
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.white};
    margin-top: 30px;
  }
`;
