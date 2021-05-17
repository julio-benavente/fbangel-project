import React, { useEffect, memo } from "react";
import { useFormContext, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

// Components
import OptionInput from "../OptionInput";

// Styles
import { FormOne } from "../../../styles/JoinUsPageStyles";

const StepOne = () => {
  const { t } = useTranslation();
  const methods = useFormContext();

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormOne>
      <OptionInput
        className="isAdult"
        type="radio"
        width="short"
        options={[
          [t("join_us.step_one.isAdult.option_1"), "yes"],
          [t("join_us.step_one.isAdult.option_2"), "no"],
        ]}
        question={t("join_us.step_one.isAdult.question")}
        error={
          errors.stepOne &&
          errors.stepOne.isAdult &&
          errors.stepOne.isAdult.message
        }
        register={register("stepOne.isAdult", {
          required: {
            value: true,
            message: t("join_us.step_one.isAdult.error_1"),
          },
        })}
      />

      <OptionInput
        width="short"
        className="accountIsReal"
        type="radio"
        options={[
          [t("join_us.step_one.accountIsReal.option_1"), "yes"],
          [t("join_us.step_one.accountIsReal.option_2"), "no"],
        ]}
        error={
          errors.stepOne &&
          errors.stepOne.accountIsReal &&
          errors.stepOne.accountIsReal.message
        }
        question={t("join_us.step_one.accountIsReal.question")}
        register={register("stepOne.accountIsReal", {
          required: {
            value: true,
            message: t("join_us.step_one.accountIsReal.error_1"),
          },
        })}
      />
      <OptionInput
        width="short"
        className="isFirstTime"
        type="radio"
        options={[
          [t("join_us.step_one.isFirstTime.option_1"), "yes"],
          [t("join_us.step_one.isFirstTime.option_2"), "no"],
        ]}
        question={t("join_us.step_one.isFirstTime.question")}
        error={
          errors.stepOne &&
          errors.stepOne.isFirstTime &&
          errors.stepOne.isFirstTime.message
        }
        register={register("stepOne.isFirstTime", {
          required: {
            value: true,
            message: t("join_us.step_one.isFirstTime.error_1"),
          },
        })}
      />
      <OptionInput
        width="short"
        className="isOneYear"
        type="radio"
        options={[
          [t("join_us.step_one.isOneYear.option_1"), "yes"],
          [t("join_us.step_one.isOneYear.option_2"), "no"],
        ]}
        question={t("join_us.step_one.isOneYear.question")}
        error={
          errors.stepOne &&
          errors.stepOne.isOneYear &&
          errors.stepOne.isOneYear.message
        }
        register={register("stepOne.isOneYear", {
          required: {
            value: true,
            message: t("join_us.step_one.isOneYear.error_1"),
          },
        })}
      />
      <OptionInput
        width="short"
        className="haveFriends"
        type="radio"
        options={[
          [t("join_us.step_one.haveFriends.option_1"), "yes"],
          [t("join_us.step_one.haveFriends.option_2"), "no"],
        ]}
        question={t("join_us.step_one.haveFriends.question")}
        error={
          errors.stepOne &&
          errors.stepOne.haveFriends &&
          errors.stepOne.haveFriends.message
        }
        register={register("stepOne.haveFriends", {
          required: {
            value: true,
            message: t("join_us.step_one.haveFriends.error_1"),
          },
        })}
      />
    </FormOne>
  );
};

export default StepOne;
