import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              <FormTitle>{t("contact.form.title")}</FormTitle>
              <InputWrapper>
                <Label>
                  {t("contact.form.name")} <span>*</span>
                </Label>
                <TextInput
                  {...register("name", {
                    required: {
                      value: true,
                      message: t("contact.form.name_error_required"),
                    },
                  })}
                />
                <p className="error">{errors.name && errors.name.message}</p>
              </InputWrapper>
              <InputWrapper>
                <Label>
                  {t("contact.form.email")} <span>*</span>
                </Label>
                <TextInput
                  {...register("email", {
                    required: {
                      value: true,
                      message: t("contact.form.email_error_required"),
                    },
                    pattern: {
                      value:
                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      message: t("contact.form.email_error_pattern"),
                    },
                  })}
                />
                <p className="error">{errors.email && errors.email.message}</p>
              </InputWrapper>
              <InputWrapper>
                <Label>
                  {t("contact.form.message")} <span>*</span>
                </Label>
                <TextArea
                  {...register("message", {
                    required: {
                      value: true,
                      message: t("contact.form.message_error_required"),
                    },
                  })}
                />
                <p className="error">
                  {errors.message && errors.message.message}
                </p>
              </InputWrapper>
              <SendButton type="submit" value={t("contact.form.send_button")} />
            </Form>
            <ContactSide>
              <ContactSideTitle>{t("contact.side.title")}</ContactSideTitle>
              <ContactSideInformation>
                {t("contact.side.info", { returnObjects: true }).map(
                  (item, i) => (
                    <p key={i}>{item}</p>
                  )
                )}
              </ContactSideInformation>
              <TelegramButton
                href="https://t.me/joinchat/T0g1FDrJeRxuiAt8"
                target="_blank"
              >
                {t("contact.side.join_button")} <Telegram />
              </TelegramButton>
            </ContactSide>
          </FormSideWrapper>
        </ContactSectionWrapper>
      </ContactSection>
    </Contact>
  );
};

export default ContactPage;
