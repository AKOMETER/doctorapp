const nodemailer = require("nodemailer");
// Configure email transport

const transportMail = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async (to, subject, html) => {
  await transportMail.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = { transportMail, sendMail };
