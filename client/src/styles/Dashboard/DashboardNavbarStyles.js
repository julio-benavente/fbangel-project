import styled from "styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";

export const DashboardNavbar = styled.div`
  grid-area: navbar;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  align-content: start;
  height: 100%;
  width: auto;
  background: ${(props) => props.theme.color.primary};
  padding: 20px 20px;
  justify-self: start;
`;

export const Logo = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  color: ${(props) => props.theme.color.white};
  margin-bottom: 6rem;
`;
export const NavbarWrapper = styled.div``;

export const NavbarItem = styled(NavLink)`
  display: grid;
  justify-items: center;
  margin-bottom: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  color: ${(props) => transparentize(0.7, props.theme.color.white)};
  padding: 10px;
  transition: all 100ms ease-in-out;
  svg {
    width: 50px;
    height: 50px;
    display: block;
    fill: ${(props) => props.theme.color.white};
  }

  &.active {
    background: ${(props) => transparentize(0.9, props.theme.color.white)};
  }

  &:hover {
    background: ${(props) => transparentize(0.8, props.theme.color.white)};
  }
`;
