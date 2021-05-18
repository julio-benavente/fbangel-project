import { transparentize, lighten } from "polished";
import styled from "styled-components";

import { H2 } from "../GlobalStyles";

export const Users = styled.div``;

export const Title = styled(H2)``;

export const UsersTable = styled.div`
  min-width: 100%;

  .tr {
    display: grid;
    align-items: center;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    background: ${(props) => props.theme.color.white};
    height: 55px;
    margin-bottom: 10px;
    padding: 0px 20px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 3px 3px 7px ${(props) => props.theme.color.gray300};
    .td {
      font-size: 0.8rem;
    }

    .td.status {
      padding: 3px 5px;
      font-size: 0.75rem;
      border-radius: 5px;
      &::first-letter {
        text-transform: uppercase;
      }
      &.validated {
        background: ${(props) => transparentize(0.5, props.theme.color.blue)};
      }
      &.pending {
        background: ${(props) => transparentize(0.85, props.theme.color.black)};
      }
      &.rejected {
        background: ${(props) => transparentize(0.5, props.theme.color.red)};
      }
    }
    .td:nth-child(5) {
      font-weight: 700;
    }

    .td,
    .th {
      &.status,
      &.country,
      &.phone,
      &.userType,
      &.email {
        justify-self: center;
      }
    }

    .td,
    .th {
      &.payments {
        justify-self: start;
      }
    }

    .td,
    .th {
      &.moreInformation {
        justify-self: end;
      }
    }

    button {
      justify-self: center;
      outline: none;
      border-radius: 3px;
      padding: 2px 10px;
      cursor: pointer;

      &.payments {
        background: ${(props) => lighten(0.45, props.theme.color.green)};
        border: 2px ${(props) => props.theme.color.green} solid;
      }

      &.moreInformation {
        background: ${(props) => lighten(0.35, props.theme.color.blue)};
        border: 2px ${(props) => props.theme.color.blue} solid;
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
      background: ${(props) => transparentize(0.7, props.theme.color.purple)};
      height: 45px;

      .th {
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
`;

export const PaymentsTable = styled.div`
  > .PaymentsTable {
    min-width: 100%;
    .tr {
      display: grid;
      grid-auto-columns: auto;
      grid-auto-flow: column;
      background: ${(props) => props.theme.color.balck};
      height: 30px;
      margin: 0;
      border-radius: 0;
      padding: 0px 20px;
      align-items: center;
      .td {
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

export const UserRowWrapper = styled.div`
  margin-bottom: 10px;

  > div:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const MoreInformationWrapper = styled.div`
  background: ${(props) => props.theme.color.white};
  display: grid;
  box-shadow: 3px 3px 7px ${(props) => props.theme.color.gray300};
  .moreInformationTitle {
    padding: 5px 20px;
    grid-column: 1/-1;
    font-size: 0.85rem;
    font-weight: 600;
    background: ${(props) => lighten(0.3, props.theme.color.blue)};
  }
  .information {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 5px 20px;
    gap: 10px;

    p {
      font-size: 0.85rem;
      b {
        font-weight: 600;
      }
    }
  }
`;
