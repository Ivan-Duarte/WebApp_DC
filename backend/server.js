const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
// Middleware para parsear o corpo das requisições POST em JSON
app.use(express.json());

app.post('/api/calculate-profile', (req, res) => {
  const { answers } = req.body; // Recebe as respostas do front-end

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

  // Envia a pontuação e o perfil como resposta
  res.json({ totalScore, profile });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});