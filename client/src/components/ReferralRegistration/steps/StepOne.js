import React, { useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useTranslation } from "react-i18next";

// Styles
import { StepOne } from "../../../styles/ReferralRegistrationPageStyles";
import { TextInput } from "../../../components/Global/Inputs";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
const Step = ({
  country,
  setCountry,
  region,
  setRegion,
  phone,
  setPhone,
  date,
  setDate,
}) => {
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
  }, []);

  const { t } = useTranslation();

  return (
    <StepOne>
      <TextInput
        className="firstName"
        question={t("referral_registration.step_one.first_name")}
        register={register("stepOne.firstName", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
          pattern: {
            value: /^[ a-zA-Z\-\’]+$/,
            message: t(
              "referral_registration.step_one.first_name_error_pattern"
            ),
          },
        })}
        error={
          errors.stepOne &&
          errors.stepOne.firstName &&
          errors.stepOne.firstName.message
        }
      />

      <TextInput
        className="lastName"
        question={t("referral_registration.step_one.last_name")}
        register={register("stepOne.lastName", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
          pattern: {
            value: /^[ a-zA-Z\-\’]+$/,
            message: t(
              "referral_registration.step_one.last_name_error_pattern"
            ),
          },
        })}
        error={
          errors.stepOne &&
          errors.stepOne.lastName &&
          errors.stepOne.lastName.message
        }
      />
      <TextInput
        className="address"
        question={t("referral_registration.step_one.address")}
        register={register("stepOne.address", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
        })}
        error={
          errors.stepOne &&
          errors.stepOne.address &&
          errors.stepOne.address.message
        }
      />

      <TextInput
        className="countryDropdown"
        question={t("referral_registration.step_one.country")}
        error={
          errors.stepOne &&
          errors.stepOne.country &&
          errors.stepOne.country.message
        }
        component={
          <Controller
            name="stepOne.country"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: t("referral_registration.step_one.required_field"),
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
                  onBlur={() => trigger("stepOne.country")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        question={t("referral_registration.step_one.city")}
        className="regionDropdown"
        error={
          errors.stepOne && errors.stepOne.city && errors.stepOne.city.message
        }
        component={
          <Controller
            control={control}
            name="stepOne.city"
            rules={{
              required: {
                value: true,
                message: t("referral_registration.step_one.required_field"),
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
                  onBlur={() => trigger("stepOne.city")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        className="zipCode"
        question={t("referral_registration.step_one.zip_code")}
        register={register("stepOne.zipCode", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
        })}
        error={
          errors.stepOne &&
          errors.stepOne.zipCode &&
          errors.stepOne.zipCode.message
        }
      />

      <TextInput
        className="birthday"
        question={t("referral_registration.step_one.birthday")}
        error={
          errors.stepOne &&
          errors.stepOne.birthday &&
          errors.stepOne.birthday.message
        }
        component={
          <Controller
            control={control}
            name="stepOne.birthday"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t("referral_registration.step_one.required_field"),
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
                    return t(
                      "referral_registration.step_one.birthday_error_old_enough"
                    );
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
                  onBlur={() => trigger("stepOne.birthday")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        className="phone"
        question={t("referral_registration.step_one.phone")}
        error={
          errors.stepOne && errors.stepOne.phone && errors.stepOne.phone.message
        }
        component={
          <Controller
            name="stepOne.phone"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t("referral_registration.step_one.required_field"),
              },
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: t(
                  "referral_registration.step_one.phone_error_pattern"
                ),
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
                  onBlur={() => trigger("stepOne.phone")}
                />
              );
            }}
          />
        }
      />

      <TextInput
        className="email"
        question={t("referral_registration.step_one.email")}
        error={
          errors.stepOne && errors.stepOne.email && errors.stepOne.email.message
        }
        register={register("stepOne.email", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
          pattern: {
            value:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: t("referral_registration.step_one.email_error_pattern"),
          },
        })}
      />

      <TextInput
        className="password"
        question={t("referral_registration.step_one.password")}
        type="password"
        error={
          errors.stepOne &&
          errors.stepOne.password &&
          errors.stepOne.password.message
        }
        register={register("stepOne.password", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
          validate: {
            min: (v) =>
              v.length < 8
                ? t("referral_registration.step_one.password_error_min")
                : true,
            max: (v) =>
              v.length >= 15
                ? t("referral_registration.step_one.password_error_max")
                : true,
          },
        })}
      />

      <TextInput
        className="passwordConfirmation"
        question={t("referral_registration.step_one.password_confirmation")}
        type="password"
        error={
          errors.stepOne &&
          errors.stepOne.passwordConfirmation &&
          errors.stepOne.passwordConfirmation.message
        }
        register={register("stepOne.passwordConfirmation", {
          required: {
            value: true,
            message: t("referral_registration.step_one.required_field"),
          },
          validate: {
            isTheSame: (v) =>
              !(v === getValues("stepOne.password"))
                ? t(
                    "referral_registration.step_one.password_confirmation_error_same"
                  )
                : true,
          },
        })}
      />
    </StepOne>
  );
};

export default Step;
