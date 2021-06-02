import styled from "styled-components";
import { H2, breakpoint } from "../GlobalStyles";
import { transparentize } from "polished";

export const CreateAction = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.white};
  outline: 10px ${(props) => props.theme.color.gray200} solid;
  padding: 10px;
  border-radius: 6px;
  overflow-y: auto;
`;

export const Title = styled(H2)``;

export const CreateActionButton = styled.button`
  outline: none;
  background: ${(props) => props.theme.color.purple};
  border: none;
  border-radius: 0.4rem;
  padding: 4px 10px;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
  &[disabled] {
    cursor: not-allowed;
    background: ${(props) => props.theme.color.gray300};
  }
`;

export const CreateActionWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  margin-bottom: 2rem;

  .ordersOptions {
    margin-right: 2rem;
    min-width: 150px;
  }

  .select {
    width: clamp(140px, 10rem, 250px);
    margin-right: 2rem;
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const Close = styled.div`
  width: 30px;
  height: 30px;
  padding: 2px;
  border-radius: 100px;
  background: ${(props) => props.theme.color.gray200};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.gray300};
  }

  svg {
    width: 100%;
  }
`;

export const Table = styled.div`
  min-width: 100%;
  max-height: 600px;
  overflow: auto;
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

    .td,
    .th {
      font-size: 0.9rem;

      &.email,
      &.paymentMethod {
        justify-self: center;
      }

      @media screen and ${breakpoint.sm} {
        margin-bottom: 2px;
        &.email,
        &.paymentMethod {
          justify-self: start;
        }
      }

      &.amount {
        font-weight: 700;
      }
    }

    .td.select {
      justify-self: center;

      .box-select,
      .box-selected {
        width: 15px;
        height: 15px;
        border-radius: 2px;
        cursor: pointer;
      }

      .box-select {
        background: ${(props) => props.theme.color.white};
        border: 2px ${(props) => props.theme.color.secondary} solid;
      }

      .box-selected {
        background: ${(props) => props.theme.color.secondary};
        border: 2px ${(props) => props.theme.color.secondary} solid;
      }
    }
  }

  .tbody {
    max-height: 100%;
    overflow-x: auto;

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

export const Filter = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: auto 1fr auto;
  margin: 10px 0;
  p {
    align-self: center;
    font-weight: 600;
  }

  .selectWrapper {
    width: clamp(150px, 12rem, 250px);
  }

  .filterData {
  }
`;

export const ChangeUserStatusTable = styled(Table)``;

export const UsersSelected = styled(Table)`
  max-height: none;
  overflow-y: initial;
  .tr {
    .td.status {
      .select {
        width: 130px;
      }

      .select.error {
        .css-yk16xz-control {
          border: 2px ${(props) => props.theme.color.secondary} solid;
        }
      }
    }
  }

  .tbody {
    height: auto;
    padding-bottom: 8rem;
  }
`;

export const UsersSelectedSummary = styled.div`
  display: grid;
  gap: 20px;
  align-items: center;
  grid-template-columns: 1fr auto auto;
  margin-bottom: 10px;
  button[type="button"] {
    justify-self: start;
    outline: none;
    background: ${(props) => props.theme.color.blue};
    border: none;
    border-radius: 0.4rem;
    padding: 4px 10px;
    color: ${(props) => props.theme.color.white};
    cursor: pointer;
  }

  button[type="submit"] {
    outline: none;
    background: ${(props) => props.theme.color.secondary};
    border: none;
    border-radius: 0.4rem;
    padding: 0.3rem 1rem;
    color: ${(props) => props.theme.color.white};
    cursor: pointer;
  }
`;
