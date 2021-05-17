import React from "react";

// Styles
import {
  InputWraper,
  Question,
  Options,
  Option,
} from "../../styles/global/InputStyles";

export const TextInput = ({
  type,
  className,
  register,
  question,
  error,
  component,
  noRequired,
}) => {
  return (
    <InputWraper className={className}>
      <Question>
        {question}
        {noRequired ? null : <span>*</span>}
      </Question>
      {!component ? (
        <input type={type ? type : "text"} {...register} />
      ) : (
        component
      )}
      <p className="error">{error}</p>
    </InputWraper>
  );
};

export const OptionInput = ({
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
        {options.map((option) => {
          return (
            <>
              <Option>
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
            </>
          );
        })}
      </Options>
      <p className="error">{error}</p>
    </InputWraper>
  );
};

export const FileInput = ({ className, register, question, error }) => {
  return (
    <InputWraper className={className}>
      <Question>
        {question}
        <span>*</span>
      </Question>
      <input type="file" {...register} />
      <p className="error">{error}</p>
    </InputWraper>
  );
};
