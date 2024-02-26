import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Quiz from './components/Quiz';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [user, setUser] = useState({
    fullName: '',
    email: '',
  });

  const onStartQuiz = (userInfo) => {
    setUser(userInfo);
    setQuizStarted(true);
  };

  return (
    <div className="App">
      {!quizStarted ? (
        <IntroScreen onStartQuiz={onStartQuiz} />
      ) : (
        <Quiz fullName={user.fullName} email={user.email} />
      )}
    </div>
  );
}

export default App;