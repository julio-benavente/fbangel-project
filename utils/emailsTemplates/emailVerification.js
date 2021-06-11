const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");

const emailVerification = async (userId, to, hostname) => {
  const token = createToken(userId, "1d", process.env.EMAIL_VERIFICATION_KEY);

  const url = `${
    hostname === "localhost" ? "http://localhost:3000" : "//" + hostname
  }/confirm-email/${token}`;

  try {
    const emailResponse = await transporter.sendMail({
      to,
      subject: "Email confirmation",
      html: `
      <p>
        Please, confirm your email here: 
        <b><a href="${url}" target="_blank">HERE</a></b>
      </p>`,
    });

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { emailVerification };
