import styled from "styled-components";

// Styles
import { page, Container, Parragraph, H2, breakpoint } from "./GlobalStyles";

export const TermsAndConditions = styled.div`
  ${page}
`;

export const TermsAndConditionsSection = styled.div``;

export const TermsAndConditionsSectionWrapper = styled(Container)``;

export const TermsAndConditionsTitle = styled(H2)``;

export const TermsAndConditionsInfo = styled(Parragraph)`
  max-width: none;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  p.subTitle {
    margin-top: 25px;
  }

  @media screen and ${breakpoint.sm} {
    h2 {
      font-size: 1.1rem;
    }
  }
`;
