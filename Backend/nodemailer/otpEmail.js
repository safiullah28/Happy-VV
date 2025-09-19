import nodemailer from "nodemailer";

const generateOtp = async (toMail, otp) => {
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
      subject: `OTP for ${toMail}`,
      text: `Your One-Time Password (OTP) for email verification is: ${otp}. This OTP is valid for a limited time.`,
    };
    await transport.sendMail(message);
  } catch (error) {
    console.log(`Error in resetPasswordMail controller : ${error}`);
  }
};
export default generateOtp;
