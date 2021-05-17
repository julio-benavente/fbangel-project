import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
// Styles
import { FormFive } from "../../../styles/JoinUsPageStyles";

const StepFive = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const values = getValues();
  console.log(values);
  return (
    <FormFive>
      <p>
        Felicitaciones por el registro. El proceso de registro no está
        completamente finalizado. Se le ha enviado un correo de confirmación a{" "}
      </p>
      <p>{t("join_us.step_five.p_1")}</p>
      <p>{t("join_us.step_five.p_2")}</p>
    </FormFive>
  );
};

export default StepFive;
