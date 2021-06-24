import styled from "styled-components";
import { H2, breakpoint } from "../GlobalStyles";
import { transparentize } from "polished";

// Create order page

export const CreateOrder = styled.div`
  display: grid;
  align-content: start;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.white};
  outline: 10px ${(props) => props.theme.color.gray200} solid;
  padding: 10px;
  border-radius: 6px;
  overflow-y: auto;
  position: relative;
  z-index: 10;
`;
export const Title = styled(H2)``;

export const OrderConcept = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const OrderConfirmation = styled.div`
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  background: ${(props) => props.theme.color.white};
  padding: 10px;
  display: grid;
  justify-items: center;
  align-items: center;
  button {
    outline: none;
    background: ${(props) => props.theme.color.secondary};
    border: none;
    border-radius: 0.4rem;
    text-transform: uppercase;
    padding: 0.4rem 0.5rem;
    color: ${(props) => props.theme.color.white};
    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
      background: ${(props) => props.theme.color.gray300};
    }
  }
`;

export const CreateOrderButton = styled.button`
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

export const CreateOrderWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  margin-bottom: 2rem;

  .ordersOptions {
    margin-right: 2rem;
    min-width: 150px;
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

export const OrderWrapper = styled.div`
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
