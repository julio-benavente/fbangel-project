import styled from "styled-components";

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
`;

export const Main = styled.div`
  grid-area: main;
  padding: 15px;
`;
