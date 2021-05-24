import styled from "styled-components";
import { H2 } from "../GlobalStyles";
import { transparentize } from "polished";

// Create order page

export const CreateOrder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.white};
  outline: 10px ${(props) => props.theme.color.gray200} solid;
  padding: 10px;
  border-radius: 6px;
`;
export const Title = styled(H2)``;

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

export const OrderWrapper = styled.div`
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

    .td,
    .th {
      font-size: 0.9rem;

      &.email,
      &.paymentMethod {
        justify-self: center;
      }

      &.amount {
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
