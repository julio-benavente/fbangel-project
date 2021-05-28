import React, { useState, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

// Components
import TextInput from "../TextInput";

// Styles
import { FormTwo } from "../../../styles/JoinNowPageStyles";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

const StepTwo = ({
  country,
  setCountry,
  region,
  setRegion,
  phone,
  setPhone,
  date,
  setDate,
}) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const datePicker = useRef();

  useEffect(() => {
    datePicker.current.input.readOnly = true;
    // readOnly = true;
    // console.log(readOnly);
  }, []);

  return (
    <FormTwo>
      <TextInput
        className="name"
        question={t("join_now.step_two.name.question")}
        register={register("stepTwo.firstName", {
          required: {
            value: true,
            message: t("join_now.step_two.name.error_1"),
          },
          pattern: {
            value: /^[ a-zA-Z\-\’]+$/,
            message: t("join_now.step_two.name.error_2"),
          },
        })}
        error={
          errors.stepTwo &&
          errors.stepTwo.firstName &&
          errors.stepTwo.firstName.message
        }
      />

      <TextInput
        className="lastname"
        question={t("join_now.step_two.lastname.question")}
        register={register("stepTwo.lastName", {
          required: {
            value: true,
            message: t("join_now.step_two.lastname.error_1"),
          },
          pattern: {
            value: /^[ a-zA-Z\-\’]+$/,
            message: t("join_now.step_two.lastname.error_2"),
          },
        })}
        error={
          errors.stepTwo &&
          errors.stepTwo.lastName &&
          errors.stepTwo.lastName.message
        }
      />

      <TextInput
        className="countryDropdown"
        question={t("join_now.step_two.country.question")}
        error={
          errors.stepTwo &&
          errors.stepTwo.country &&
          errors.stepTwo.country.message
        }
        component={
          <Controller
            name="stepTwo.country"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: t("join_now.step_two.country.error_1"),
              },
            }}
            render={({ name, field: { onChange, onBlur } }) => {
              return (
                <CountryDropdown
                  name={name}
                  value={country}
                  onChange={(countryName) => {
                    setCountry(countryName);
                    onChange(countryName);
                  }}
                  onBlur={() => trigger("stepTwo.country")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        question={t("join_now.step_two.city.question")}
        className="regionDropdown"
        error={
          errors.stepTwo && errors.stepTwo.city && errors.stepTwo.city.message
        }
        component={
          <Controller
            control={control}
            name="stepTwo.city"
            rules={{
              required: {
                value: true,
                message: t("join_now.step_two.city.error_1"),
              },
            }}
            defaultValue=""
            render={({ name, field: { onChange, onBlur } }) => {
              return (
                <RegionDropdown
                  name={name}
                  country={country}
                  value={region}
                  onChange={(regionName) => {
                    setRegion(regionName);
                    onChange(regionName);
                  }}
                  onBlur={() => trigger("stepTwo.city")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        className="birthday"
        question={t("join_now.step_two.birthday.question")}
        error={
          errors.stepTwo &&
          errors.stepTwo.birthday &&
          errors.stepTwo.birthday.message
        }
        component={
          <Controller
            control={control}
            name="stepTwo.birthday"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t("join_now.step_two.birthday.error_1"),
              },
              validate: {
                isNotOldEnough: (v) => {
                  function getAge(dob) {
                    var diff_ms = Date.now() - dob.getTime();
                    var age_dt = new Date(diff_ms);

                    return Math.abs(age_dt.getUTCFullYear() - 1970);
                  }

                  const age = getAge(v);
                  if (!(age >= 18)) {
                    return t("join_now.step_two.birthday.error_2");
                  }
                  return true;
                },
              },
            }}
            render={({ name, field: { onChange, onBlur } }) => {
              return (
                <DatePicker
                  ref={datePicker}
                  name={name}
                  selected={date}
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  maxDate={new Date()}
                  dropdownMode="select"
                  onChange={(date) => {
                    setDate(date);
                    onChange(date);
                  }}
                  onBlur={() => trigger("stepTwo.birthday")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        className="phone"
        question={t("join_now.step_two.phone.question")}
        error={
          errors.stepTwo && errors.stepTwo.phone && errors.stepTwo.phone.message
        }
        component={
          <Controller
            name="stepTwo.phone"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t("join_now.step_two.phone.error_1"),
              },
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: t("join_now.step_two.phone.error_2"),
              },
            }}
            render={({ name, field: { onChange, onBlur } }) => {
              return (
                <PhoneInput
                  name={name}
                  country={"pe"}
                  value={phone}
                  countryCodeEditable={false}
                  onChange={(phone) => {
                    setPhone(phone);
                    onChange(phone);
                  }}
                  onBlur={() => trigger("stepTwo.phone")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        className="email"
        question={t("join_now.step_two.email.question")}
        error={
          errors.stepTwo && errors.stepTwo.email && errors.stepTwo.email.message
        }
        register={register("stepTwo.email", {
          required: {
            value: true,
            message: t("join_now.step_two.email.error_1"),
          },
          pattern: {
            value:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: t("join_now.step_two.email.error_2"),
          },
        })}
      />

      <TextInput
        className="password"
        question="Registre una contraseña"
        type="password"
        error={
          errors.stepTwo &&
          errors.stepTwo.password &&
          errors.stepTwo.password.message
        }
        register={register("stepTwo.password", {
          required: {
            value: true,
            message: "Por favor, registre este campo",
          },
          validate: {
            min: (v) => (v.length < 8 ? "Mínimo 8 caracteres" : true),
          },
        })}
      />

      <TextInput
        className="passwordConfirmation"
        question="Confirme su contraseña"
        type="password"
        error={
          errors.stepTwo &&
          errors.stepTwo.passwordConfirmation &&
          errors.stepTwo.passwordConfirmation.message
        }
        register={register("stepTwo.passwordConfirmation", {
          required: {
            value: true,
            message: "Por favor, registre este campo",
          },
          validate: {
            isTheSame: (v) =>
              !(v === getValues("stepTwo.password"))
                ? "Las contraseñas no coinciden"
                : true,
          },
        })}
      />
    </FormTwo>
  );
};

export default StepTwo;
