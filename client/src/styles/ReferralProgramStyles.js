import styled from "styled-components";

// Styles
import {
  Container,
  H2,
  Parragraph,
  RoundedBtn,
  Tiny,
  liBullets,
  breakpoint,
} from "./GlobalStyles";

export const ReferralProgram = styled.div`
  padding-top: 90px;
`;

export const ReferralProgramSection = styled(Container)`
  grid-template-columns: 1fr 1fr;

  > * {
    grid-column: 1/2;
  }

  @media screen and ${breakpoint.md} {
    grid-template-columns: 6fr 4fr;
  }

  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;
    > * {
      grid-column: auto;
    }
    /* display: block; */
  }
`;

export const ReferralProgramSectionTitle = styled(H2)``;

export const ReferralProgramSectionInfo = styled(Parragraph)`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.secondary};
    font-weight: 700;
  }
  .money {
    color: ${(props) => props.theme.color.green};
    font-weight: 700;
  }

  .asterisk {
    color: ${(props) => props.theme.color.secondary};
  }
`;

export const InformationList = styled(Parragraph)`
  position: relative;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.link};
  }

  .important {
    color: ${(props) => props.theme.color.secondary};
  }

  p {
    margin-left: 14px;
    position: relative;
    ${liBullets}
  }
`;

export const ReferralProgramImage = styled.img`
  grid-column: 2/3;
  grid-row: 1/4;
  justify-self: end;
  align-self: center;
  width: clamp(200px, 30vw, 350px);

  @media screen and ${breakpoint.md} {
    position: relative;
    align-self: auto;
    top: 10rem;
    margin-left: 2rem;
  }

  @media screen and ${breakpoint.sm} {
    grid-column: auto;
    grid-row: 4/5;
    grid-column: 1/-1;
    top: 0;
  }
`;

export const RegistrationBtn = styled.a`
  ${RoundedBtn}
  margin-bottom: 4rem;

  @media screen and ${breakpoint.sm} {
    grid-row: 4/5;
    grid-column: 1/-1;
    align-self: start;
  }
`;

export const TinyLetter = styled(Tiny)``;
