import React from "react";
import { useForm } from "react-hook-form";

// Styles
import {
  Contact,
  ContactSection,
  ContactSectionWrapper,
  FormSideWrapper,
  ContactSide,
  ContactSideTitle,
  ContactSideInformation,
  TelegramButton,
  Form,
  FormTitle,
  InputWrapper,
  Label,
  TextInput,
  TextArea,
  SendButton,
} from "../../styles/ContactPageStyles";

// Assets
import { ReactComponent as Telegram } from "../../assets/svgs/telegram.svg";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Contact>
      <ContactSection>
        <ContactSectionWrapper>
          <FormSideWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormTitle>Déjanos un mensaje</FormTitle>
              <InputWrapper>
                <Label>
                  Tu nombre <span>*</span>
                </Label>
                <TextInput
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Por favor, coloque su nombre",
                    },
                  })}
                />
                <p className="error">{errors.name && errors.name.message}</p>
              </InputWrapper>
              <InputWrapper>
                <Label>
                  Tu email <span>*</span>
                </Label>
                <TextInput
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Por favor, coloque su email",
                    },
                    pattern: {
                      value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      message: "Por favor, registre un email valido",
                    },
                  })}
                />
                <p className="error">{errors.email && errors.email.message}</p>
              </InputWrapper>
              <InputWrapper>
                <Label>
                  Tu mensaje <span>*</span>
                </Label>
                <TextArea
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Por favor, escriba un mensaje",
                    },
                  })}
                />
                <p className="error">
                  {errors.message && errors.message.message}
                </p>
              </InputWrapper>
              <SendButton type="submit" value="Enviar" />
            </Form>
            <ContactSide>
              <ContactSideTitle>Contáctanos</ContactSideTitle>
              <ContactSideInformation>
                <p>¿Cómo podemos ayudarte? ¿Necesitas ayuda con tus pagos?</p>
                <p>
                  Para cualquier consulta relacionada con pagos o su cuenta, por
                  favor contacte con el gestor local de su zona.
                </p>
                <p>
                  También puedes consultar dudas en nuestro grupo de Telegram
                </p>
              </ContactSideInformation>
              <TelegramButton
                href="https://t.me/joinchat/T0g1FDrJeRxuiAt8"
                target="_blank"
              >
                Únete al grupo <Telegram />
              </TelegramButton>
            </ContactSide>
          </FormSideWrapper>
        </ContactSectionWrapper>
      </ContactSection>
    </Contact>
  );
};

export default ContactPage;
