import styled from "styled-components";
import { H2, breakpoint } from "../GlobalStyles";
import { lighten, transparentize } from "polished";

export const Profile = styled.div`
  display: grid;
  grid-template-columns: 7fr minmax(240px, 3fr);
  gap: 20px;
  min-height: 100%;

  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;
    align-content: start;
  }
`;

export const ProfileSection = styled.div`
  background: ${(props) => props.theme.color.white};
  padding: 10px;
  border-radius: 10px;

  @media screen and ${breakpoint.sm} {
    grid-row: 2/3;
  }
`;

export const ProfileTitle = styled(H2)`
  border-bottom: 1px ${(props) => props.theme.color.black} solid;
  padding-bottom: 10px;
`;

export const Information = styled.div`
  min-width: 100%;
`;

export const InformationItem = styled.div`
  display: grid;
  min-width: 100%;
  grid-template-columns: 4fr 6fr;
  padding: 5px 0;
  border-top: 1px ${(props) => props.theme.color.gray300} solid;

  &:last-of-type {
    border-bottom: 1px ${(props) => props.theme.color.gray300} solid;
  }
`;

export const InfoLabel = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const InfoValue = styled.div`
  font-size: 0.9rem;
  justify-self: start;
  &.status {
    padding: 3px 5px;
    font-size: 0.75rem;
    border-radius: 5px;
    &.approved {
      background: ${(props) => transparentize(0.5, props.theme.color.blue)};
    }
    &.pending {
      background: ${(props) => transparentize(0.85, props.theme.color.black)};
    }
    &.rejected {
      background: ${(props) => transparentize(0.5, props.theme.color.red)};
    }
  }
`;

export const ConfigurationSection = styled.div`
  background: ${(props) => props.theme.color.white};
  padding: 10px;
  border-radius: 10px;
`;

export const Configuration = styled.div``;

export const ConfigurationTitle = styled(H2)`
  border-bottom: 1px ${(props) => props.theme.color.black} solid;
  padding-bottom: 10px;
`;

export const ConfigurationItem = styled.div`
  margin-bottom: 10px;
  a,
  p {
    font-weight: 500;
    text-decoration: none;
    color: ${(props) => props.theme.color.link};
    cursor: pointer;
  }

  & ~ p.message {
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.secondary};
    margin-bottom: 10px;
    span {
      font-weight: 500;
    }
  }

  &.paypalEmailVerified {
    padding: 4px;
    background: ${(props) => lighten(0.28, props.theme.color.secondary)};
  }
`;

export const ConfigLabel = styled.div``;

export const ConfigValue = styled.div``;
