import React, { useState } from 'react';
import './IntroScreen.css';

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
      console.log(` Nome = ${fullName}, Email = ${email} `)
      onStartQuiz({ fullName, email });
    }
  };

  return (
    <div className='intro-screen'>
      <h1>Bem-vindo ao Quiz!</h1>
      <div className='user-terms'>
        <h3>Termo de Uso para Teste de Dominância Cerebral de Herrmann</h3>
        <p>Bem-vindo ao nosso WebApp para o Teste de Dominância Cerebral de Herrmann. Antes de prosseguir, é importante que você leia e concorde com os termos a seguir:</p>
        <ul>
          <li>
            <strong>Privacidade e Proteção de Dados:</strong> Garantimos que nenhum dos seus dados pessoais será salvo ou compartilhado com terceiros sem o seu consentimento explícito. Respeitamos sua privacidade e nos comprometemos a proteger suas informações pessoais de acordo com as leis aplicáveis, incluindo a <a target='_blank' href='https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'>Lei Geral de Proteção de Dados (LGPD)</a>.
          </li>
          <li>
            <strong>Coleta de Informações:</strong> Para receber o resultado do seu teste de forma prática, solicitamos que você forneça seu endereço de e-mail. Este endereço será utilizado exclusivamente para enviar o resultado do teste para você e para a equipe responsável pelo WebApp. 
          </li>
          <li>
            <strong>Segurança dos Dados:</strong> Implementamos medidas de segurança para proteger as informações que você compartilha conosco. Utilizamos tecnologias padrão do setor para garantir a segurança dos seus dados contra acesso não autorizado, uso indevido ou divulgação.
          </li>
          <li>
            <strong>Uso dos Resultados do Teste:</strong> Os resultados do seu teste serão utilizados exclusivamente para fornecer a você insights sobre sua dominância cerebral de acordo com a teoria de Herrmann. Não iremos utilizar esses resultados para outros fins sem o seu consentimento prévio.
          </li>
          <li>
            <strong>Acesso aos Seus Dados:</strong> Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos ou se tiver quaisquer dúvidas ou preocupações sobre a privacidade e proteção de dados, entre em contato conosco através dos canais fornecidos neste WebApp.
          </li>
        </ul>
        <p>Se tiver alguma dúvida ou precisar de esclarecimentos adicionais, não hesite em entrar em contato conosco. Obrigado por confiar em nós para realizar o seu teste de dominância cerebral de Herrmann.</p>
      </div>
      <div className='user-form'>
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
          <p>
            Ao prosseguir com o teste, você concorda com os termos e condições descritos acima. Se você não concorda com estes termos, por favor, não utilize este WebApp.
          </p>       
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
    </div>
  );
};

export default IntroScreen;