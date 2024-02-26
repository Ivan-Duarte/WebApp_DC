import React from 'react';

const Summary = ({ answers, questions, profileResult }) => {
    console.log(profileResult);
    return (
        <div className="summary">
        <h2>Resumo das Respostas e Perfil de Dominância Cerebral</h2>
        <ul>
            {questions.map((question, index) => (
            <li key={index}>
                <h3>{question.questionText}</h3>
                <p>Resposta escolhida: {question.options[answers[index] - 1]}</p>
            </li>
            ))}
        </ul>
        {profileResult && (
            <>
            <h3>Seu Perfil de Dominância Cerebral:</h3>
            <p>{profileResult.profile}</p>
            <p>Pontuação total: {profileResult.totalScore}</p>
            </>
        )}
        </div>
    );
};

export default Summary;
