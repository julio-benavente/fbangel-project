import React from "react";

// Styles
import {
  InputWraper,
  Question,
  Options,
  Option,
} from "../../styles/JoinUsPageStyles";

const OptionInput = ({
  className,
  type,
  options,
  question,
  register,
  error,
  width,
}) => {
  return (
    <InputWraper className={className}>
      {question && (
        <Question>
          {question} <span>*</span>
        </Question>
      )}

      <Options width={width}>
        {options.map((option, index) => {
          return (
            <Option key={index}>
              <input
                style={{ opacity: 0 }}
                type={type}
                value={option[1]}
                // {register}
                {...register}
              />

              {option[0]}
              <span className={`box ${type}`}></span>
            </Option>
          );
        })}
      </Options>
      <p className="error">{error}</p>
    </InputWraper>
  );
};

export default OptionInput;
