import React, { useState } from 'react';

const IntroScreen = ({ onStartQuiz }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Função para validar o formato do e-mail
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Verifica se os campos estão preenchidos corretamente
  const isFormValid = fullName && validateEmail(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (termsAccepted && isFormValid) {
      onStartQuiz({ fullName, email });
    }
  };

  return (
    <div>
      <h2>Bem-vindo ao Quiz!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            id="terms"
            disabled={!isFormValid} // Desabilita o checkbox se o formulário não for válido
          />
          <label htmlFor="terms">Concordo com os termos de uso</label>
        </div>
        <button type="submit" disabled={!termsAccepted || !isFormValid}>
          Começar Quiz
        </button>
      </form>
    </div>
  );
};

export default IntroScreen;