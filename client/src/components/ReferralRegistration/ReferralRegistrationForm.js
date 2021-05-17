import React, { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";

// Components
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
// import StepThree from "./Steps/StepThree";
// import StepFour from "./Steps/StepFour";
// import StepFive from "./Steps/StepFive";

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

const Form = () => {
  const [formStep, setFormStep] = useState(2);
  const formData = useRef();
  const defaultValues = {
    stepOne: {
      name: "julio",
      lastname: "julio",
      address: "Calle La loca vecindad 46",
      email: "julio@julio.com",
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
      paypalEmail: "elot@eloy.com",
      paypalEmailConfirmation: "elot@eloy.com",
      holderName: "Eloy",
      bankAngency: "El banco de Eloy",
      bankAccountCode: "13254132541325413254",
      // documentImage: {},
      referral: "5asd665",
      termsAndConditions: true,
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
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data) => {
    console.log("onSubmit", data);
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
      default:
        return "No more steps";
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
              Anterior
            </Button>
            <SubmitButton type="submit">Enviar</SubmitButton>
          </Buttons>
        );

      case formStep < submitPage && 1 < formStep:
        return (
          <Buttons>
            <Buttons>
              <Button onClick={() => handleFormStep(-1, formStep)}>
                Anterior
              </Button>
            </Buttons>

            <Button onClick={() => handleFormStep(1, formStep)}>
              Siguiente
            </Button>
          </Buttons>
        );

      case formStep === 1:
        return (
          <Buttons one>
            <Button onClick={() => handleFormStep(1, formStep)}>
              Siguiente
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
        <FormLocationTitle>Formulario de registro</FormLocationTitle>
        <Location className={`${formStep === 1 && "active"}`}>
          <p className="number">1</p>
          <p className="location">Datos personales</p>
        </Location>
        <Location className={`${formStep === 2 && "active"}`}>
          <p className="number">2</p>
          <p className="location">Confirmación y Método de pago</p>
        </Location>

        {formStep === 3 && (
          <Location className={`${formStep === 5 && "active"}`}>
            <p className="number">3</p>
            <p className="location">Felicitaciones</p>
          </Location>
        )}
      </FormLocation>
      <FormProvider {...methods}>
        <Forms onSubmit={handleSubmit(onSubmit)} ref={formData}>
          {showStep(formStep)}
          {renderButton()}
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </Forms>
      </FormProvider>
    </FormsWrapper>
  );
};

export default Form;
