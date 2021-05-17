import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { transparentize } from "polished";

export const NavbarSection = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  z-index: 10;
`;

export const NavbarWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: center;
  justify-items: center;
  max-width: 1200px;
  padding: 20px 40px;
  position: absolute;
  width: 100%;
  transform: translateX(-50%);
  left: 50%;
  top: 0;
`;

export const Logo = styled(NavLink)`
  font-size: 1.6rem;
  text-decoration: none;
  font-weight: 700;
  color: ${(props) => props.theme.color.primary};
  span {
    display: inline-grid;
    justify-items: center;
    background-color: ${(props) => props.theme.color.primary};
    padding: 3px 7px;
    color: ${(props) => props.theme.color.white};
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
  color: ${(props) => props.theme.color.black};

  &::before {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -10px;
    background-color: ${(props) => props.theme.color.primary};
    transition: width 200ms ease-in-out;
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
      ? transparentize(0.5, props.theme.color.white)
      : transparentize(0.85, props.theme.color.primary)};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  cursor: pointer;
  .openNav {
    width: 30px;
    fill: ${(props) => props.theme.color.primary};
    height: 30px;
  }

  .closeNav {
    width: 30px;
    height: 30px;
  }
`;
