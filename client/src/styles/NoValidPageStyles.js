import styled from "styled-components";

// Styles

import { page, Container, breakpoint } from "./GlobalStyles";

export const NoValid = styled.div`
  ${page}
`;

export const NoValidSection = styled.div``;

export const NoValidSectionWrapper = styled(Container)`
  justify-content: center;
  min-height: calc(100vh - 174px - 90px);
  position: relative;
`;

export const Message = styled.div`
  max-width: 400px;

  p {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${(props) => props.theme.color.primary};
    margin-bottom: 10px;
    text-align: center;
    a {
      font-weight: 700;
      text-decoration: none;
      color: ${(props) => props.theme.color.secondary};
    }
  }

  @media screen and ${breakpoint.sm} {
    max-width: 300px;
    p {
      font-size: 1.1rem;
    }
  }
`;

export const Image = styled.img`
  position: absolute;
  width: clamp(200px, 25vw, 300px);
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  z-index: -1;

  @media screen and ${breakpoint.sm} {
    top: auto;
    bottom: -20px;
    transform: translate(50%, -0%);
    /* width: clamp(150px, 20vw, 300px); */
  }
`;
