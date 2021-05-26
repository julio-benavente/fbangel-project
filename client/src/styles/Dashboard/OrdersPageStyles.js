import { transparentize } from "polished";
import styled from "styled-components";

import { H2, breakpoint } from "../GlobalStyles";

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
  cursor: pointer;
`;

export const Table = styled.div`
  min-width: 100%;

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
    word-break: break-all;

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
    }

    .td,
    .th {
      &.status,
      &.date,
      &.payments,
      &.update {
        justify-self: center;

        @media screen and ${breakpoint.sm} {
          justify-self: start;
        }
      }
    }

    .td.status {
      border: none;
      border-radius: 0.2rem;
      padding: 0.2rem 0.4rem;

      &.payed {
        background: ${(props) => transparentize(0.7, props.theme.color.green)};
      }

      &.pending {
        background: ${(props) =>
          transparentize(0.7, props.theme.color.gray300)};
      }

      &.canceled {
        background: ${(props) => transparentize(0.7, props.theme.color.red)};
      }
    }

    .td.payments {
      button {
        border: none;
        border-radius: 0.2rem;
        padding: 0.2rem 0.4rem;
        outline: none;
        cursor: pointer;
        background: ${(props) => transparentize(0.7, props.theme.color.green)};
      }
    }

    .td.update {
      display: grid;
      justify-content: center;
      grid-auto-columns: auto;
      grid-auto-flow: column;
      button {
        border: none;
        border-radius: 0.2rem;
        padding: 0.2rem 0.4rem;
        margin-left: 0.4rem;
        outline: none;
        cursor: pointer;

        &.updateBtn {
          background: ${(props) =>
            transparentize(0.5, props.theme.color.purple)};
        }

        &.approveBtn {
          background: ${(props) =>
            transparentize(0.5, props.theme.color.green)};
        }

        &.rejectBtn {
          background: ${(props) => transparentize(0.5, props.theme.color.red)};
        }

        &.cancelBtn {
          background: ${(props) =>
            transparentize(0.5, props.theme.color.yellow)};
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

      @media screen and (max-width: 700px) {
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

export const PaymentsTable = styled.div`
  > .PaymentsTable {
    min-width: 100%;
    margin-bottom: 1rem;
    .tr {
      display: grid;
      grid-auto-columns: auto;
      grid-auto-flow: column;
      background: ${(props) => props.theme.color.balck};
      height: 40px;
      margin: 0;
      border-radius: 0;
      padding: 0px 20px;
      align-items: center;
      .td {
        border-radius: 0;
        font-size: 0.8rem;
        &:nth-child(4) {
          padding: 3px 5px;
          font-size: 0.75rem;
          border-radius: 4px;
          &.approved {
            background: ${(props) =>
              transparentize(0.5, props.theme.color.blue)};
          }
          &.pending {
            background: ${(props) =>
              transparentize(0.85, props.theme.color.black)};
          }
          &.rejected {
            background: ${(props) =>
              transparentize(0.5, props.theme.color.red)};
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
      border-radius: 0;
      margin: 0;
      .tr {
        background: ${(props) => transparentize(0.9, props.theme.color.green)};
        .th {
          font-size: 0.9rem;
          font-weight: 600;
        }
      }
      .PaymentsTable {
        max-width: 40%;
      }
    }
  }
`;
