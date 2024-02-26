// components/Quiz.js

import React, { useState } from 'react';
import Question from './Question';
import Summary from './Summary';

const questionsData = [
  {
    questionText: "Quando um bom amigo, parceiro ou familiar vem até mim porque tem um problema...",
    options: [
      "Não me preocupo se o problema não é consideravelmente grave",
      "Escrevo uma lista com as possíveis soluções",
      "Abraço essa pessoa e sinto muito por ela",
      "Crio um plano para ajudá-la"
    ],
  },
  {
    questionText: "No momento de estudar antes de fazer um exame...",
    options: [
        "Eu realmente tenho gostado muito de fazer exercícios para me preparar para o exame",
        "Elaboro um plano de estudo, conciliando descanso com horas de concentração",
        "Fico muito nervoso/a e sinto muita ansiedade, sobretudo no dia anterior",
        "Procuro notas divertidas, faço desenhos para me lembrar e elaboro técnicas para lembrar nomes e datas"
    ],
  },
  {
    questionText: "O que busco em um parceiro é...",
    options: [
        "Uma pessoa com quem compartilhar conhecimentos e sabedoria",
        "Procuro alguém compatível com minha personalidade, agradável e que eu considere atrativo/a",
        "Amor e paixão, gosto de sentir muitas emoções no meu relacionamento",
        "Alguém com quem compartilhar aventura e novas experiências"
    ],
  },
  {
    questionText: "Quando tenho uma discussão familiar...",
    options: [
        "Não me envolvo demais, apenas observo como os outros se comportam",
        "Analiso como cada membro da família se comporta e tento agir de acordo.",
        "Começo a chorar, não suporto ver como minha família brigam, são pessoas que eu amo muito",
        "Procuro a melhor maneira de acalmar o ambiente e invento alguma dinâmica ou jogo, se necessário"
    ],
  },
  {
    questionText: "Quando tenho um pressentimento ou um palpite...",
    options: [
        "Não costumo ter esse tipo de sentimentos",
        "Penso porque lamento e tento encontrar a explicação mais razoável de tal pressentimento",
        "Fico muito feliz, adoro sentir como minha mente tenta me dizer algo",
        "Sigo esse palpite, não costumo estar enganado nunca"
    ],
  },
  {
    questionText: "Meu trabalho ideal seria...",
    options: [
        "Professor/a de matemática, física ou empresário/a",
        "Administrador/a, contador ou gerente",
        "Psicólogo/a, jornalista ou assistente social",
        "Arquiteto/a, compositor/a, escritor/a, poeta ou designer"
    ],
  }
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [profileResult, setProfileResult] = useState(null);
  
    const onOptionSelect = (questionId, optionValue) => {
      setAnswers({ ...answers, [questionId]: optionValue });
    };
  
    const goToNext = () => {
      if (answers[currentQuestion] !== undefined) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert('Por favor, selecione uma opção antes de prosseguir.');
      }
    };
  
    const goToPrevious = () => {
      setCurrentQuestion(currentQuestion - 1);
    };
  
    const handleSubmit = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/calculate-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
          });
      
          const result = await response.json();
          if (response.ok) {
            setSubmitted(true);
            setProfileResult(result); // Aqui você atualiza o estado com o resultado do perfil
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error('Erro ao enviar respostas:', error);
        }
      };
  
      return (
        <div className="quiz">
            {!submitted ? (
                <>
                    {questionsData.map((question, index) => (
                        currentQuestion === index && (
                            <Question
                                key={index}
                                questionText={question.questionText}
                                options={question.options}
                                onOptionSelect={onOptionSelect}
                                questionId={index}
                                answers={answers} // Esta linha permanece inalterada
                            />
                        )
                    ))}
                    {currentQuestion > 0 && (
                        <button onClick={goToPrevious}>Anterior</button>
                    )}
                    {currentQuestion < questionsData.length - 1 ? (
                        <button onClick={goToNext}>Próxima</button>
                    ) : (
                        <button onClick={handleSubmit}>Enviar Respostas</button>
                    )}
                </>
            ) : (
                // Aqui é onde você precisa passar 'profileResult' junto com 'answers' e 'questionsData'
                <Summary answers={answers} questions={questionsData} profileResult={profileResult} />
            )}
        </div>
    );
};

export default Quiz;