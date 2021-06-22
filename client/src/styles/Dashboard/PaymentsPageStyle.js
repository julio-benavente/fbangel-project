import { transparentize } from "polished";
import styled from "styled-components";

import { H2, breakpoint } from "../GlobalStyles";

export const Payments = styled.div``;

export const Title = styled(H2)``;

export const Table = styled.div`
  min-width: 100%;
  max-width: 100%;
  .tr {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    background: ${(props) => props.theme.color.white};
    height: 40px;
    margin-bottom: 5px;
    padding: 0px 20px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 2px 2px 4px ${(props) => props.theme.color.gray300};

    @media screen and ${breakpoint.sm} {
      grid-auto-flow: row;
      grid-auto-row: auto;
      height: auto;
      grid-template-columns: 1fr;
      justify-items: start;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .td {
      font-size: 0.8rem;
      word-break: break-word;
      &.status {
        padding: 3px 5px;
        font-size: 0.75rem;
        border-radius: 5px;

        &.paid {
          background: ${(props) => transparentize(0.5, props.theme.color.blue)};
        }
        &.pending {
          background: ${(props) => transparentize(0.85, props.theme.color.black)};
        }
        &.rejected,
        &.canceled {
          background: ${(props) => transparentize(0.5, props.theme.color.red)};
        }
      }
      &.amount {
        font-weight: 700;
      }
    }

    .td,
    .th {
      &.paymentDate,
      &.status,
      &.amount {
        justify-self: center;

        @media screen and ${breakpoint.sm} {
          justify-self: start;
        }
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

      @media screen and ${breakpoint.sm} {
        height: auto;
      }

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
    props.bg === false ? `2px ${props.theme.color.secondary} solid` : `2px ${props.theme.color.green} solid`};

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
