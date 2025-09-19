import nodemailer from "nodemailer";

const resetPasswordMail = async (toMail, link) => {
  try {
    const transport = await nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const message = {
      from: process.env.SMTP_MAIL,
      to: toMail,
      subject: `Reset password link for ${toMail}`,
      text: `Your reset password link is ${link}`,
    };
    await transport.sendMail(message);
  } catch (error) {
    console.log(`Error in resetPasswordMail controller : ${error}`);
  }
};
export default resetPasswordMail;
