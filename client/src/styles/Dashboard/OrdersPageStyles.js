import { transparentize } from "polished";
import styled from "styled-components";

import { H2 } from "../GlobalStyles";

export const Orders = styled.div`
  position: relative;
  height: 100%;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const Title = styled(H2)``;

export const CreateOrderButton = styled.button`
  align-self: start;
  outline: none;
  background: ${(props) => props.theme.color.purple};
  border: none;
  border-radius: 0.4rem;
  padding: 4px 10px;
  color: ${(props) => props.theme.color.white};
`;

export const Table = styled.div`
  min-width: 100%;

  .tr {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    background: ${(props) => props.theme.color.white};
    height: 30px;
    margin-bottom: 5px;
    padding: 0px 20px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 2px 2px 4px ${(props) => props.theme.color.gray300};
    .td {
      font-size: 0.8rem;
      &:nth-child(4) {
        padding: 3px 5px;
        font-size: 0.75rem;
        border-radius: 5px;

        &.Approved {
          background: ${(props) => transparentize(0.5, props.theme.color.blue)};
        }
        &.Pending {
          background: ${(props) =>
            transparentize(0.85, props.theme.color.black)};
        }
        &.Rejected {
          background: ${(props) => transparentize(0.5, props.theme.color.red)};
        }
      }
      &:nth-child(5) {
        font-weight: 700;
      }
    }

    .td,
    .th {
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        justify-self: center;
      }
    }
  }

  .tbody {
    .tr:nth-child(2n) {
      background: ${(props) => props.theme.color.gray200};
    }
  }

  .thead {
    .tr {
      background: ${(props) => transparentize(0.7, props.theme.color.green)};
      height: 45px;

      .th {
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
`;

export const PaypalEmailMessage = styled.div`
  padding: 10px;
  border: ${(props) =>
    props.bg === false
      ? `2px ${props.theme.color.secondary} solid`
      : `2px ${props.theme.color.green} solid`};

  background: ${(props) =>
    props.bg === false
      ? transparentize(0.9, props.theme.color.secondary)
      : transparentize(0.9, props.theme.color.green)};

  span {
    font-weight: 700;
    color: ${(props) => props.theme.color.secondary};
    cursor: pointer;
  }
`;
