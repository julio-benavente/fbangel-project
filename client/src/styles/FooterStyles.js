import styled from "styled-components";
import { transparentize } from "polished";
import { Link } from "react-router-dom";

// Styles
import { Container, Tiny, breakpoint } from "./GlobalStyles";

export const FooterSection = styled.div`
  background-color: ${(props) => props.theme.color.primary};

  > * {
    color: ${(props) => props.theme.color.white};
  }
`;
export const FooterSectionWrapper = styled(Container)`
  grid-template-columns: auto auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 1200px;

  @media screen and ${breakpoint.md} {
    > * {
      text-align: center;
    }
  }
`;

export const FooterLinks = styled.div`
  margin-bottom: 1rem;
  display: grid;
  justify-content: start;
  grid-auto-columns: minmax(80px, auto);
  grid-auto-flow: column;
  gap: 30px;
  grid-column: 1/-1;
  justify-self: center;
`;

export const Contact = styled(Link)`
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  text-decoration: none;
`;
export const UseConditions = styled(Link)`
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  text-decoration: none;
`;

export const Copyright = styled.div`
  font-weight: 300;
  justify-self: center;
  margin-bottom: 2rem;
  grid-column: 1/-1;
`;
export const Detach = styled(Tiny)`
  max-width: none;
  font-weight: 200;
  color: ${(props) => transparentize(0.6, props.theme.color.white)};
  grid-column: 1/-1;
`;
