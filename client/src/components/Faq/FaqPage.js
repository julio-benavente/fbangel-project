import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [questionIsOpen, setQuestionIsOpen] = useState(null);
  const handleQuestionIsOpen = (number) => {
    if (questionIsOpen === number) return setQuestionIsOpen(null);

    setQuestionIsOpen(number);
  };

  const questions = t("faq.questions", { returnObjects: true });

  return (
    <Faq>
      <QuestionsSection>
        <QuestionsSectionWrapper as={motion.div}>
          <QuestionsSectionTitle>{t("faq.title")}</QuestionsSectionTitle>
          <QuestionsWrapper
            as={motion.div}
            initial="start"
            animate="end"
            variants={questionCardWrapperVariants}
          >
            {questions.map(({ question, answer }, i) => {
              return (
                <QuestionCard
                  as={motion.div}
                  key={i}
                  onClick={() => handleQuestionIsOpen(i)}
                  variants={questionCardVariants}
                >
                  <Question color={questionIsOpen == i}>{question}</Question>
                  <Arrow
                    as={motion.div}
                    color={questionIsOpen == i}
                    initial={questionIsOpen == i ? "open" : "close"}
                    animate={questionIsOpen == i ? "open" : "close"}
                    variants={arrowVariants}
                  >
                    <ArrowSvg />
                  </Arrow>
                  <Answer
                    as={motion.div}
                    initial={questionIsOpen == i ? "open" : "close"}
                    animate={questionIsOpen == i ? "open" : "close"}
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
            {t("faq.account_secure.title")}
          </AccountSecureSectionTitle>
          <AccountSecureSectionList>
            {t("faq.account_secure.list", { returnObjects: true }).map(
              (item, i) => (
                <p key={i}>{item}</p>
              )
            )}
          </AccountSecureSectionList>
          <QuestionsSectionImage src={guyImage} />
        </AccountSecureSectionWrapper>
      </AccountSecureSection>
    </Faq>
  );
};

export default FaqPage;
