
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transport = nodeMailer.createTransport({

        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:
        {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
    });

    const mailOptions = {
        form: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transport.sendMail(mailOptions);
};

module.exports = sendEmail;