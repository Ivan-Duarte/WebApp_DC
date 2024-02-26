const nodemailer = require('nodemailer');
require('dotenv').config(); // Certifique-se de requerer dotenv

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Usando variáveis de ambiente
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email enviado: ' + info.response);
  });
};

module.exports = sendEmail;