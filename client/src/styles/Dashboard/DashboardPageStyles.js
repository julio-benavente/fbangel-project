import styled from "styled-components";
import { breakpoint } from "../GlobalStyles";

export const Dashboard = styled.div`
  position: absolute;
  z-index: 100;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "navbar profile"
    "navbar main";
  min-width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.color.gray200};

  @media screen and ${breakpoint.md} {
    /* font-size: clamp(1.7rem, 3vw, 2.5rem); */
  }
`;

export const Main = styled.div`
  grid-area: main;
  padding: 15px;
`;
