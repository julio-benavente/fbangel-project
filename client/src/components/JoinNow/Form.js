import React, { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { emailDuplicatedSet } from "../../store/global/global";
import { useDispatch } from "react-redux";

// Components
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";

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
} from "../../styles/JoinNowPageStyles";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

// Assets
import { ReactComponent as LoadingSvg } from "../../assets/svgs/loading.svg";

const Form = () => {
  const { t } = useTranslation();
  const [formStep, setFormStep] = useState(4);
  const formData = useRef();

  const defaultValues = {
    stepOne: {
      isAdult: "yes",
      accountIsReal: "yes",
      isFirstTime: "no",
      isOneYear: "yes",
      haveFriends: "yes",
    },
    stepTwo: {
      firstName: "emanuel",
      lastName: "emanuel",
      email: "cosotel740@jmpant.com",
      country: "Peru",
      city: "Lima",
      password: "emanuel132",
      passwordConfirmation: "emanuel132",
      // birthday: "1982-10-06T05:00:00.000Z",
      phone: "51934988135",
    },
    stepThree: {
      frecuency: "2-3_a_week",
      devices: ["tablet", "movil"],
      os: ["windows", "other"],
      fbUsername: "cosotel740@jmpant.com",
      fbPassword: "julio1234",
      code2FA: "43211234432112344321123443211234",
    },
    stepFour: {
      paymentMethod: "paypal",
      paypalEmail: "cosotel740@jmpant.com",
      paypalEmailConfirmation: "cosotel740@jmpant.com",
      referral: "",
      termsAndConditions: "yes",
      gdprAgreement: "yes",
    },
  };

  const { token } = useParams();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      stepFour: {
        referral: token,
      },
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (!isSubmitting) {
      const response = await fetchCandidateInformation(data);

      console.log("response", response);

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
      console.log("response", response);

      const { status } = response;

      if (status && status === 200) {
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
        ? "/api/users/registration/rental"
        : "/api/users/registration/incompleteRental";

    const { stepOne, stepTwo, stepThree, stepFour } = data;

    const preInfo = {
      ...stepOne,
      ...stepTwo,
      ...stepThree,
      ...stepFour,
    };

    const candidateInformation = new FormData();

    Object.keys(preInfo).map((key) => {
      candidateInformation.append(`${key}`, preInfo[key]);
    });

    candidateInformation.append("documentImage", stepFour.documentImage[0]);
    candidateInformation.append("fbEmailImage", stepThree.fbEmailImage[0]);
    candidateInformation.append("bmIdImage", stepThree.bmIdImage[0]);

    console.log("candidateInformation", candidateInformation);

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
        return <StepOne />;
      case 2:
        return (
          <StepTwo
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
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return "No more steps";
    }
  };

  //
  const handleFormStep = async (direction, formStep) => {
    const steps = ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"];
    var step = steps[formStep - 1];

    // Verify if the qualification form is positive
    const qualificationVerification = async () => {
      await trigger();

      if ((formStep === 1) & !errors.stepOne) {
        const values = Object.values(getValues("stepOne"));
        const valuesToCompare = ["yes", "yes", "no", "yes", "yes"];
        const some = values.some((value, i) => value !== valuesToCompare[i]);

        if (some) history.push("/no-valid");
      }
    };

    await qualificationVerification();

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
    const submitPage = 4;
    switch (true) {
      case formStep > submitPage:
        return null;
      case formStep == submitPage:
        return (
          <Buttons>
            <Button onClick={() => handleFormStep(-1, formStep)}>
              {t("join_now.button.previous")}
            </Button>
            <SubmitButton type="submit">
              {isSubmitting ? <LoadingSvg /> : t("join_now.button.send")}
            </SubmitButton>
          </Buttons>
        );

      case formStep < submitPage && 1 < formStep:
        return (
          <Buttons>
            <Buttons>
              <Button onClick={() => handleFormStep(-1, formStep)}>
                {t("join_now.button.previous")}
              </Button>
            </Buttons>

            <Button onClick={() => handleFormStep(1, formStep)}>
              {t("join_now.button.next")}
            </Button>
          </Buttons>
        );

      case formStep === 1:
        return (
          <Buttons one>
            <Button onClick={() => handleFormStep(1, formStep)}>
              {t("join_now.button.next")}
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
          {t("join_now.form_location.title")}
        </FormLocationTitle>
        <Location className={`${formStep === 1 && "active"}`}>
          <p className="number">1</p>
          <p className="location">{t("join_now.form_location.p_1")}</p>
        </Location>
        <Location className={`${formStep === 2 && "active"}`}>
          <p className="number">2</p>
          <p className="location">{t("join_now.form_location.p_2")}</p>
        </Location>
        <Location className={`${formStep === 3 && "active"}`}>
          <p className="number">3</p>
          <p className="location">{t("join_now.form_location.p_3")}</p>
        </Location>
        <Location className={`${formStep === 4 && "active"}`}>
          <p className="number">4</p>
          <p className="location">{t("join_now.form_location.p_4")}</p>
        </Location>
        {formStep === 5 && (
          <Location className={`${formStep === 5 && "active"}`}>
            <p className="number">5</p>
            <p className="location">{t("join_now.form_location.p_5")}</p>
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
