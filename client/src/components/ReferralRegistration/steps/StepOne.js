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
    <StepOne>
      <TextInput
        className="name"
        question="Tu nombre"
        register={register("stepOne.name", {
          required: {
            value: true,
            message: "Por favor, registre su nombre",
          },
          pattern: {
            value: /^[ a-zA-Z\-\’]+$/,
            message: "El nombre contiene caracteres no permitidos",
          },
        })}
        error={
          errors.stepOne && errors.stepOne.name && errors.stepOne.name.message
        }
      />

      <TextInput
        className="lastname"
        question="Tus apellidos"
        register={register("stepOne.lastname", {
          required: {
            value: true,
            message: "Por favor, registre su apellido",
          },
          pattern: {
            value: /^[ a-zA-Z\-\’]+$/,
            message: "El apellido contiene caracteres no permitidos",
          },
        })}
        error={
          errors.stepOne &&
          errors.stepOne.lastname &&
          errors.stepOne.lastname.message
        }
      />
      <TextInput
        className="address"
        question="Su direción"
        register={register("stepOne.address", {
          required: {
            value: true,
            message: "Por favor, registre su direccion",
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
        question="Tu país de residencia"
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
                message: "Este campo es obligatorio",
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
        question="Tu ciudad de residencia"
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
                message: "Este campo es obligatorio",
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
        question="Código postal"
        register={register("stepOne.zipCode", {
          required: {
            value: true,
            message: "Por favor, registre su código postal",
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
        question="Fecha de nacimiento"
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
                message: "Por favor, ingrese la fecha de su nacimiento",
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
                    return "Debes ser mayor de 18 años";
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
        question="Tu celular"
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
                message: "Este campo es obligatorio",
              },
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: "Ingrese un numero de celular válido",
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
        question="Registre su email"
        error={
          errors.stepOne && errors.stepOne.email && errors.stepOne.email.message
        }
        register={register("stepOne.email", {
          required: {
            value: true,
            message: "Por favor, ingrese su email",
          },
          pattern: {
            value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: "Ingrese un email valido",
          },
        })}
      />

      <TextInput
        className="password"
        question="Registre una contraseña"
        type="password"
        error={
          errors.stepOne &&
          errors.stepOne.password &&
          errors.stepOne.password.message
        }
        register={register("stepOne.password", {
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
          errors.stepOne &&
          errors.stepOne.passwordConfirmation &&
          errors.stepOne.passwordConfirmation.message
        }
        register={register("stepOne.passwordConfirmation", {
          required: {
            value: true,
            message: "Por favor, registre este campo",
          },
          validate: {
            isTheSame: (v) =>
              !(v === getValues("stepOne.password"))
                ? "Las contraseñas no coinciden"
                : true,
          },
        })}
      />
    </StepOne>
  );
};

export default Step;
