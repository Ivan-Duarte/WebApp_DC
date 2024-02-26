import React from 'react';

const Question = ({ questionText, options, onOptionSelect, questionId, answers }) => {
  // E então usa 'answers' para determinar qual opção deve ser marcada como checked
  return (
    <div className="question">
      <h2>{questionText}</h2>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question-${questionId}`}
            value={index + 1}
            checked={answers[questionId] === index + 1}
            onChange={(e) => onOptionSelect(questionId, parseInt(e.target.value))}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;