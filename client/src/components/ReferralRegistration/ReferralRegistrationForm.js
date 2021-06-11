import React, { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { emailDuplicatedSet } from "../../store/global/global";
import { useDispatch } from "react-redux";
// Components
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";

// Styles
import {
  FormsWrapper,
  FormLocation,
  Forms,
  Location,
  FormLocationTitle,
  Buttons,
  Button,
  SubmitButton,
} from "../../styles/ReferralRegistrationPageStyles";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

// Utils
import sendDataToBoard from "../../utils/sendDataToBoard";

const Form = () => {
  const { t } = useTranslation();

  const [formStep, setFormStep] = useState(2);
  const formData = useRef();
  const defaultValues = {
    stepOne: {
      firstName: "Lixeb",
      lastName: "Loco",
      address: "Calle La loca vecindad 46",
      email: "latabe5672@0ranges.com",
      country: "Peru",
      city: "Lima",
      zipCode: "16351",
      // birthday: "1982-10-06T05:00:00.000Z",
      phone: "51934988135",
      password: "123456789",
      passwordConfirmation: "123456789",
    },
    stepTwo: {
      paymentMethod: "paypal",
      paypalEmail: "latabe5672@0ranges.com",
      paypalEmailConfirmation: "latabe5672@0ranges.com",
      holderName: "Eloy",
      bankAngency: "El banco de Eloy",
      bankAccountCode: "13254132541325413254",
      // documentImage: {},
      referral: "5asd665",
      termsAndConditions: "yes",
      captcha: "true",
    },
  };
  const methods = useForm({
    mode: "all",
    defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (!isSubmitting) {
      const response = await fetchCandidateInformation(data);
      const { status } = response;

      if (
        response &&
        response.response &&
        response.response.data &&
        response.response.data.error &&
        response.response.data.error.email &&
        response.response.data.error.email.includes("been registered")
      ) {
        dispatch(emailDuplicatedSet(true));
      }

      if (status && status === 200) {
        sendDataToBoard(response.data.user);
        handleFormStep(1, formStep);
      } else {
        const incompleteCandidate = await fetchCandidateInformation(
          data,
          "incomplete"
        );
      }
      return null;
    }
  };

  const fetchCandidateInformation = async (data, type = "complete") => {
    const url =
      type === "complete"
        ? "/api/users/registration/referral"
        : "/api/users/registration/incompleteReferral";

    const { stepOne, stepTwo } = data;

    const preInfo = {
      ...stepOne,
      ...stepTwo,
    };

    const candidateInformation = new FormData();

    Object.keys(preInfo).map((key) => {
      candidateInformation.append(`${key}`, preInfo[key]);
    });

    candidateInformation.append("documentImage", stepTwo.documentImage[0]);

    try {
      const response = await axios.post(url, candidateInformation);
      return response;
    } catch (error) {
      return { error: error.message, response: error.response };
    }
  };

  // Step two state
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState(null);
  const [date, setDate] = useState(null);

  const showStep = (step) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            country={country}
            setCountry={setCountry}
            region={region}
            setRegion={setRegion}
            phone={phone}
            setPhone={setPhone}
            date={date}
            setDate={setDate}
          />
        );
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return t("referral_registration.no_more_steps");
    }
  };

  //
  const handleFormStep = async (direction, formStep) => {
    const steps = ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"];
    var step = steps[formStep - 1];

    // Validate if isValid the step
    if (direction === 1) {
      const fieldsToValidate = Object.keys(getValues(step)).map(
        (value) => `${step}.${value}`
      );

      await trigger(fieldsToValidate);

      // next
      !errors[step] && setFormStep(formStep + direction);
    }

    // previous
    direction === -1 && setFormStep(formStep + direction);
  };

  const renderButton = () => {
    const submitPage = 2;
    switch (true) {
      case formStep > submitPage:
        return null;
      case formStep == submitPage:
        return (
          <Buttons>
            <Button onClick={() => handleFormStep(-1, formStep)}>
              {t("referral_registration.buttons.previous")}
            </Button>
            <SubmitButton type="submit">
              {isSubmitting
                ? t("referral_registration.buttons.sending")
                : t("referral_registration.buttons.send")}
            </SubmitButton>
          </Buttons>
        );

      case formStep < submitPage && 1 < formStep:
        return (
          <Buttons>
            <Buttons>
              <Button onClick={() => handleFormStep(-1, formStep)}>
                {t("referral_registration.buttons.previous")}
              </Button>
            </Buttons>

            <Button onClick={() => handleFormStep(1, formStep)}>
              {t("referral_registration.buttons.next")}
            </Button>
          </Buttons>
        );

      case formStep === 1:
        return (
          <Buttons one>
            <Button onClick={() => handleFormStep(1, formStep)}>
              {t("referral_registration.buttons.next")}
            </Button>
          </Buttons>
        );
      default:
        return null;
    }
  };

  return (
    <FormsWrapper>
      <FormLocation>
        <FormLocationTitle>
          {t("referral_registration.locations.title")}
        </FormLocationTitle>
        <Location className={`${formStep === 1 && "active"}`}>
          <p className="number">1</p>
          <p className="location">
            {t("referral_registration.locations.personal_information")}
          </p>
        </Location>
        <Location className={`${formStep === 2 && "active"}`}>
          <p className="number">2</p>
          <p className="location">
            {t("referral_registration.locations.confirmation_payment_method")}
          </p>
        </Location>

        {formStep === 3 && (
          <Location className={`${formStep === 5 && "active"}`}>
            <p className="number">3</p>
            <p className="location">
              {t("referral_registration.locations.congratulations")}
            </p>
          </Location>
        )}
      </FormLocation>
      <FormProvider {...methods}>
        <Forms onSubmit={handleSubmit(onSubmit)} ref={formData}>
          {showStep(formStep)}
          {renderButton()}
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        </Forms>
      </FormProvider>
    </FormsWrapper>
  );
};

export default Form;
