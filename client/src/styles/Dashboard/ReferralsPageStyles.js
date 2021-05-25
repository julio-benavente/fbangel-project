import { transparentize } from "polished";
import styled from "styled-components";

import { H2 } from "../GlobalStyles";

export const Referrals = styled.div``;

export const Title = styled(H2)``;

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
      &.status {
        padding: 1px 5px;
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