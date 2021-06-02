import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { transparentize } from "polished";

export const NavbarSection = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  z-index: 100;
  position: absolute;
  background-color: ${(props) => props.theme.color.primary};
`;

export const NavbarWrapper = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  transform: translateX(-50%);
  grid-template-columns: auto 1fr auto;
  justify-content: center;
  justify-items: center;
  max-width: 1200px;
  padding: 20px 40px;
  width: 100%;
  left: 50%;
  top: 0;
`;

export const Logo = styled(NavLink)`
  font-size: 1.6rem;
  text-decoration: none;
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  span {
    display: inline-grid;
    justify-items: center;
    background-color: ${(props) => props.theme.color.white};
    padding: 3px 7px;
    color: ${(props) => props.theme.color.primary};
  }
`;

export const NavLinks = styled.div`
  justify-self: end;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;

  @media screen and (max-width: 1000px) {
    height: 100vh;
    width: 100vw;
    background: ${(props) => props.theme.color.primary};
    position: absolute;
    grid-template-columns: 1fr;
    grid-auto-columns: unset;
    grid-auto-flow: unset;
    align-content: center;
    justify-items: center;
  }
`;

export const NavbarLink = styled.div`
  position: relative;
  align-self: center;

  @media screen and (max-width: 1000px) {
    margin-bottom: 20px;
  }
`;

export const Link = styled(NavLink)`
  position: relative;
  margin: 0 clamp(5px, 0.8vw, 15px);
  text-decoration: none;
  color: ${(props) => props.theme.color.white};

  &.login {
    font-weight: 600;
    color: ${(props) => props.theme.color.white};
  }

  &.joinNow {
    font-weight: 600;
    color: ${(props) => props.theme.color.primary};
    padding: 2px 5px;
    border-radius: 2px;
    background: ${(props) => props.theme.color.white};
  }

  &::before {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -10px;
    background-color: ${(props) => props.theme.color.white};
    transition: width 200ms ease-in-out;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover,
  &.active {
    &::before {
      width: 100%;
    }
  }

  @media screen and (max-width: 1000px) {
    margin: 15px;
    color: ${(props) => props.theme.color.white};

    &::before {
      bottom: -5px;
      background: ${(props) => props.theme.color.white};
    }
  }
`;

export const LanguageDropdown = styled.div`
  position: relative;
`;

export const GlobalIcon = styled.div`
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
    path {
      fill: white;
    }
  }
`;

export const Languages = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: ${(props) => props.theme.color.white};
  border: 2px ${(props) => props.theme.color.gray300} solid;
  border-radius: 0.2rem;
`;
export const Language = styled.div`
  cursor: pointer;
  padding: 0.4rem 1rem;
  display: flex;
  .flag {
    width: 30px;
    margin-right: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.gray200};
  }
`;

export const Menu = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 50%;
  right: 40px;
  border-radius: 1000px;
  background: ${(props) =>
    props.open
      ? transparentize(0.5, props.theme.color.primary)
      : transparentize(0.85, props.theme.color.white)};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  cursor: pointer;
  .openNav {
    width: 30px;
    fill: ${(props) => props.theme.color.white};
    height: 30px;
  }

  .closeNav {
    width: 30px;
    height: 30px;
  }
`;
