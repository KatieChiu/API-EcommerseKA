// src/services/mail.service.js
const nodemailer = require('nodemailer');

const transporte = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreo = async ({ to, subject, text, html }) => {
  try {
    await transporte.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || '',
    });
    return true;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return false;
  }
};

module.exports = { enviarCorreo };