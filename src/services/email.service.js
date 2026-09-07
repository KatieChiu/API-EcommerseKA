const nodemailer = require('nodemailer');

const transporte = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const enviarCorreo = async ({ to, subject, text, html }) => {
    try {
        await transporte.sendMail({
            from: `"eKAT" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            html: html || '',
        });

        console.log(`📧 Correo enviado a: ${to}`);

        return true;
    } catch (error) {
        console.error('❌ Error al enviar correo:', error);

        return false;
    }
};

module.exports = {
    enviarCorreo,
};