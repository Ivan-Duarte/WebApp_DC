import React from 'react';
import './Summary.css'; 

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
            <h3 className='resultado'>Seu Perfil de Dominância Cerebral:</h3>
            <p className='profile'>{profileResult.profile}</p>
            <p className='points'>Pontuação total: {profileResult.totalScore}</p>
            </>
        )}
        </div>
    );
};

export default Summary;
