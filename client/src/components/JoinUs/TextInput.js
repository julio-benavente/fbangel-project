import React from "react";

import { InputWraper, Question } from "../../styles/JoinUsPageStyles";

const TextInput = ({
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
        {question} {noRequired ? null : <span>*</span>}
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

export default TextInput;
