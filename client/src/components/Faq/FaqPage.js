import React, { useState } from "react";
import { motion } from "framer-motion";
// Styles
import {
  Faq,
  // Question Section
  QuestionsSection,
  QuestionsSectionWrapper,
  QuestionsSectionTitle,
  QuestionsWrapper,
  QuestionCard,
  Question,
  Answer,
  QuestionsSectionImage,
  Arrow,
  // Account is secure section
  AccountSecureSection,
  AccountSecureSectionWrapper,
  AccountSecureSectionTitle,
  AccountSecureSectionList,
} from "../../styles/FaqPageStyles";

// Assets
import guyImage from "../../assets/svgs/guy-in-squar-box.svg";
import { ReactComponent as ArrowSvg } from "../../assets/svgs/arrow.svg";

const questions = [
  {
    number: "1",
    question: "¿Por qué no creamos nuestros propios perfiles?",
    answer: [
      "Solo estamos usando tu cuenta publicitaria de FB, que tiene un inicio de sesión independiente de tu perfil normal de FB.",
    ],
  },
  {
    number: "2",
    question:
      "¿Cómo sé que no se realizarán publicaciones en mi perfil y que mi información no se compartirá?",
    answer: [
      "Solo estamos usando tu cuenta publicitaria de FB, que tiene un inicio de sesión independiente de tu perfil normal de FB.",
      "Facebook es una entidad corporativa protegida, que protege la actividad y los derechos de sus usuarios. Por lo tanto, hay una clara separación entre tu cuenta personal, y la de empresa (publicidad).",
      "Asi que puedes estar seguro de que tus amigos no recibirán spam ni veran tus anuncios o actividad publicitaria.",
    ],
  },
  {
    number: "3",
    question: "¿Es esto una estafa? ¿Me timarán?",
    answer: [
      "No, esto no es una estafa y no te timaremos. Somos publicistas online que utilizan cuentas de Facebook para configurar anuncios de pago. Facebook limita el número de cuentas publicitarias que recibe cada usuario. Como esta es nuestra principal actividad comercial, estamos buscando adquirir el mayor número de cuentas para poder publicar más anuncios. Conectamos la tarjeta de crédito de nuestra propia empresa a la cuenta y todos los pagos de la publicidad de Facebook pasarán por ella. No corres ningún riesgo.",
    ],
  },
  {
    number: "4",
    question: "¿Estamos rompiendo las reglas?",
    answer: [
      "No. Vender tu perfil va en contra de la política de Facebook. Nosotros no compramos perfiles, simplemente los alquilamos para acceder y utilizar las cuentas publicitarias que no se utilizan.",
    ],
  },
];

const questionVariants = {
  close: {
    transitionEnd: {
      display: "none",
    },
    height: "0",
    opacity: 0,
    transition: {
      esae: "easeInOut",
      height: {
        delay: 0.2,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },

  open: {
    display: "block",
    height: "100%",
    opacity: 1,
    transition: {
      esae: "easeInOut",
      height: {
        duration: 0.2,
      },
      opacity: {
        delay: 0.2,
      },
    },
  },
};

const arrowVariants = {
  close: {
    rotate: 0,
    transition: {
      ease: "easeInOut",
    },
  },
  open: {
    rotate: 180,
    transition: {
      ease: "easeInOut",
    },
  },
};

const questionCardWrapperVariants = {
  end: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const questionCardVariants = {
  start: {
    x: -30,
    opacity: 0,
  },
  end: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
    },
  },
};

const FaqPage = () => {
  const [questionIsOpen, setQuestionIsOpen] = useState(null);
  const handleQuestionIsOpen = (number) => {
    if (questionIsOpen === number) return setQuestionIsOpen(null);

    setQuestionIsOpen(number);
  };
  return (
    <Faq>
      <QuestionsSection>
        <QuestionsSectionWrapper as={motion.div}>
          <QuestionsSectionTitle>Preguntas frecuentes</QuestionsSectionTitle>
          <QuestionsWrapper
            as={motion.div}
            initial="start"
            animate="end"
            variants={questionCardWrapperVariants}
            // animate={{}}
          >
            {questions.map(({ number, question, answer }, i) => {
              return (
                <QuestionCard
                  as={motion.div}
                  key={i}
                  onClick={() => handleQuestionIsOpen(number)}
                  variants={questionCardVariants}
                >
                  <Question color={questionIsOpen == number}>
                    {question}
                  </Question>
                  <Arrow
                    as={motion.div}
                    color={questionIsOpen == number}
                    initial={questionIsOpen == number ? "open" : "close"}
                    animate={questionIsOpen == number ? "open" : "close"}
                    variants={arrowVariants}
                  >
                    <ArrowSvg />
                  </Arrow>
                  <Answer
                    as={motion.div}
                    initial={questionIsOpen == number ? "open" : "close"}
                    animate={questionIsOpen == number ? "open" : "close"}
                    variants={questionVariants}
                  >
                    {answer.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </Answer>
                </QuestionCard>
              );
            })}
          </QuestionsWrapper>
        </QuestionsSectionWrapper>
      </QuestionsSection>
      <AccountSecureSection>
        <AccountSecureSectionWrapper>
          <AccountSecureSectionTitle>
            Su cuenta está segura, por favor sepa que:
          </AccountSecureSectionTitle>
          <AccountSecureSectionList>
            <p>
              Usamos tu perfil solo para iniciar sesión en Facebook Business
              Manager, (https://business.facebook.com/) que es completamente
              independiente de su perfil. La mayoría de los usuarios ni siquiera
              saben que existe.
            </p>
            <p>
              Puedes seguir usando tu cuenta mientras probamos y publicamos
              anuncios.
            </p>
            <p>
              Nadie sabrá que los anuncios se están publicando y tus amigos
              nunca verán nada (a menos que tu se lo cuentes y les muestres tus
              nuevas ganancias )
            </p>
            <p>Nada se publicará jamás en tu muro.</p>
            <p>
              Nunca miramos tu perfil personal, mensajes o cualquiera otra
              actividad, solo usamos la cuenta comercial que creamos.
            </p>
            <p>
              Nunca venderemos, transferiremos ni publicaremos tu información
              personal.
            </p>
          </AccountSecureSectionList>
          <QuestionsSectionImage src={guyImage} />
        </AccountSecureSectionWrapper>
      </AccountSecureSection>
    </Faq>
  );
};

export default FaqPage;
