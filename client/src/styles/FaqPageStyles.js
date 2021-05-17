import styled from "styled-components";

// Styles
import {
  page,
  Container,
  H2,
  H4,
  Parragraph,
  image,
  liBullets,
  breakpoint,
} from "./GlobalStyles";

export const Faq = styled.div`
  ${page}
`;

export const QuestionsSection = styled(Container)``;

export const QuestionsSectionWrapper = styled.div``;

export const QuestionsSectionTitle = styled(H2)``;

export const QuestionsWrapper = styled.div``;

export const QuestionCard = styled.div`
  display: grid;
  padding: 20px;
  min-height: calc(20px 20px 44px);
  margin-bottom: 10px;
  box-shadow: 4px 4px 10px ${(props) => props.theme.color.gray300};
  grid-template-columns: 1fr auto;
  cursor: pointer;
`;

export const Question = styled(H4)`
  color: ${(props) =>
    props.color ? props.theme.color.secondary : props.theme.color.primary};
  transition: color 200ms ease-in-out;
`;

export const Answer = styled(Parragraph)`
  max-width: none;
  margin-bottom: 0;
  grid-column: 1/-1;
`;

export const QuestionsSectionImage = styled.img`
  ${image}
  width: clamp(200px, 25vw, 300px);

  @media screen and ${breakpoint.sm} {
    grid-columns: auto;
    position: absolute;
    top: 0;
    z-index: -1;
    transform: translate(30%, -60%);
    opacity: 0.3;
  }
`;

export const Arrow = styled.div`
  align-self: start;
  justify-self: end;
  transform-origin: center center;

  svg {
    width: 20px;
    height: 20px;
    color: ${(props) =>
      props.color ? props.theme.color.secondary : props.theme.color.primary};
    transition: color 200ms ease-in-out;
    transform: rotate(180deg);
  }
`;

export const AccountSecureSection = styled.div``;

export const AccountSecureSectionWrapper = styled(Container)`
  grid-template-columns: 1fr auto;
  padding-top: 0;
  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;
    > * {
      grid-column: auto;
    }
  }
`;

export const AccountSecureSectionTitle = styled(H4)`
  grid-column: 1/-1;
`;

export const AccountSecureSectionList = styled(Parragraph)`
  max-width: none;
  margin-right: 5vw;
  p {
    margin-left: 21px;
    ${liBullets}
    position: relative;
  }
`;
