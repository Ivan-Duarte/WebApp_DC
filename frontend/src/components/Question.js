import React from 'react';
import './Question.css';

const Question = ({ questionText, options, onOptionSelect, questionId, answers }) => {

  return (
    <div className="question-container">
      <h2>{questionText}</h2>
      {options.map((option, index) => (
        <div
          key={index}
          className={`option ${answers[questionId] === index + 1 ? 'selected' : ''}`}
          onClick={() => onOptionSelect(questionId, index + 1)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Question;