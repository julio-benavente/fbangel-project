import React from "react";
import { Link } from "react-router-dom";

// Styles
import {
  NoValid,
  NoValidSection,
  NoValidSectionWrapper,
  Message,
  Image,
} from "../../styles/NoValidPageStyles";

// Assets
import guy from "../../assets/svgs/guy-in-hole.svg";

const NoValidPage = () => {
  return (
    <NoValid>
      <NoValidSection>
        <NoValidSectionWrapper>
          <Message>
            <p>
              Lo sentimos. Su perfil de Facebook no es un candidato válido para
              nuestro programa de alquiler.
            </p>
            <p>
              Pero no se preocupe, todavía tiene la opción de ganar dinero con
              nostros. <Link to="/programa-referidos">Haga click aquí</Link> y
              empiece a ganar dinero por cada amigo que nos presente y se una.
            </p>
          </Message>
          <Image src={guy} />
        </NoValidSectionWrapper>
      </NoValidSection>
    </NoValid>
  );
};

export default NoValidPage;
