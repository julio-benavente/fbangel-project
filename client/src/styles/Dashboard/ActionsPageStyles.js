import { transparentize } from "polished";
import styled from "styled-components";

import { H2, breakpoint } from "../GlobalStyles";

export const Actions = styled.div`
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
      word-break: break-word;
    }

    .td,
    .th {
      &.creationDate,
      &.payments,
      &.target,
      &.details {
        justify-self: center;

        @media screen and ${breakpoint.sm} {
          justify-self: start;
        }
      }
    }
    .td.details {
      button {
        font-size: 0.85rem;
        align-self: start;
        outline: none;
        background: ${(props) => props.theme.color.blue};
        border: none;
        border-radius: 0.4rem;
        padding: 4px 10px;
        color: ${(props) => props.theme.color.white};
        cursor: pointer;
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

export const DetailsUserTable = styled.div`
  &.DetailsUserTable {
    min-width: 100%;
    margin-bottom: 1rem;
    .tr {
      display: grid;
      grid-auto-columns: auto;
      grid-auto-flow: column;
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
        }
        &:nth-child(5) {
          font-weight: 700;
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
        background: ${(props) => transparentize(0.9, props.theme.color.purple)};
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
