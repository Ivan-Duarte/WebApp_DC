const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const sendEmail = require('./services/emailService');

app.use(cors());
// Middleware para parsear o corpo das requisições POST em JSON
app.use(express.json());

app.post('/api/calculate-profile', (req, res) => {
  // Assume que o corpo da requisição inclui nome, e-mail e respostas
  const { name, email, answers } = req.body; // Agora inclui o nome do usuário

  // Calcula a pontuação total somando os valores das respostas
  const totalScore = Object.values(answers).reduce((total, answer) => total + answer, 0);

  let profile;
  // Determina o perfil com base na pontuação total
  if (totalScore >= 6 && totalScore <= 11) {
    profile = 'Quadrante A (Lógico-Matemático)';
  } else if (totalScore >= 12 && totalScore <= 17) {
    profile = 'Quadrante B (Organizado-Analista)';
  } else if (totalScore >= 18 && totalScore <= 23) {
    profile = 'Quadrante C (Emocional-Sensitivo)';
  } else if (totalScore >= 24) {
    profile = 'Quadrante D (Intuitivo-Imaginativo)';
  } else {
    // Caso a pontuação não se enquadre em nenhuma categoria conhecida
    profile = 'Indeterminado';
  }
  
  const resultText = `Seu perfil é: ${profile}. Pontuação total: ${totalScore}.`;
  res.json({ totalScore, profile });

  // Enviar e-mail para o usuário
  sendEmail(email, 'Seu Resultado do Questionário', resultText);

  // Enviar e-mail para o administrador com detalhes adicionais
  const adminEmailContent = `Um novo usuário completou o questionário. \nNome: ${name}\nE-mail: ${email}\nResultado: ${resultText}`;
  sendEmail('dute.test@gmail.com', 'Novo Resultado de Questionário', adminEmailContent);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});