
import './App.css';
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import IntroScreen from './components/IntroScreen';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const startQuiz = (userData) => {
    setUserInfo(userData);
    setQuizStarted(true);
  };

  return (
    <div className="app">
      {!quizStarted ? (
        <IntroScreen onStartQuiz={startQuiz} />
      ) : (
        <Quiz userInfo={userInfo} />
      )}
    </div>
  );
};

export default App;