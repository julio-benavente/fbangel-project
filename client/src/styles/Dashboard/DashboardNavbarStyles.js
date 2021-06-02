import styled from "styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";
import { breakpoint } from "../GlobalStyles";

export const DashboardNavbar = styled.div`
  grid-area: navbar;
  z-index: 300;
  position: relative;
  @media screen and ${breakpoint.md} {
    position: absolute;
  }
`;

export const Logo = styled.div`
  a {
    display: block;
    font-weight: 600;
    font-size: 1.3rem;
    color: ${(props) => props.theme.color.white};
    margin-bottom: 6rem;
    text-decoration: none;
  }
  @media screen and ${breakpoint.md} {
    justify-self: center;
  }
`;
export const NavbarWrapper = styled.div`
  display: grid;
  position: relative;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  align-content: start;
  height: 100%;
  width: auto;
  background: ${(props) => props.theme.color.primary};
  padding: 20px 20px;
  justify-self: start;

  @media screen and ${breakpoint.md} {
    position: absolute;
  }
`;

export const NavbarItem = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 100ms ease-in-out;

  a {
    padding: 10px;
    display: grid;
    justify-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: ${(props) => transparentize(0.7, props.theme.color.white)};
    &.active {
      background: ${(props) => transparentize(0.9, props.theme.color.white)};
      p {
        color: ${(props) => props.theme.color.white};
      }
    }

    &:hover {
      background: ${(props) => transparentize(0.8, props.theme.color.white)};
    }

    svg {
      width: 50px;
      height: 50px;
      display: block;
      fill: ${(props) => props.theme.color.white};

      path {
        fill: ${(props) => props.theme.color.white};
      }
    }
  }
`;

export const Menu = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 6px;
  left: 6px;
  border-radius: 1000px;
  background: ${(props) =>
    props.open
      ? transparentize(0.5, props.theme.color.white)
      : transparentize(0.85, props.theme.color.primary)};
  /* transform: translateY(-50%); */
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 200;
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
