import styled from "styled-components";

export const DashboardProlfile = styled.div`
  display: grid;
  grid-area: profile;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  justify-content: end;
  align-content: center;
  align-items: center;
  align-self: start;
  background: ${(props) => props.theme.color.white};
  min-height: 40px;
  padding: 10px 30px;
`;

export const Name = styled.div`
  color: ${(props) => props.theme.color.gray300};
  p {
    display: inline-block;
    font-weight: 600;
    color: ${(props) => props.theme.color.black};
  }
`;

export const ProfileImage = styled.div`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.red};
  margin-left: 0.5rem;

  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.theme.color.white};
  }
`;

export const Logout = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-self: center;
  margin-left: 2rem;
  color: ${(props) => props.theme.color.gray300};
  cursor: pointer;

  svg path:nth-child(2) {
    fill: ${(props) => props.theme.color.gray300};
  }
`;
