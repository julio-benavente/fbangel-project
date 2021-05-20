import styled from "styled-components";
import { page } from "./GlobalStyles";

export const Confirmation = styled.div`
  ${page}
  min-height: calc(100vh - 174px);
  display: grid;
  justify-content: center;
  align-content: center;
`;
export const Message = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.primary};
  text-align: center;
`;
export const ConfirmationMessage = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.primary};
  text-align: center;
`;
export const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.secondary};
  text-align: center;
`;
