const enviarCorreo = async ({ to, subject, text, html }) => {
    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: 'e-commerse',
                    email: process.env.BREVO_SENDER_EMAIL,
                },
                to: [
                    {
                        email: to,
                    },
                ],
                subject,
                textContent: text,
                htmlContent: html || '',
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('❌ Error de Brevo:', error);
            return false;
        }

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
