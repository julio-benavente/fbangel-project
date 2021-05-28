import React from "react";

import { InputWraper, Question } from "../../styles/JoinNowPageStyles";

const FileInput = ({ className, register, question, error }) => {
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

export default FileInput;
