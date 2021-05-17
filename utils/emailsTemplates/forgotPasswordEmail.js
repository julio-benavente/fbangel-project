const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");

const forgotPasswordEmail = async (id, to, model) => {
  const token = createToken(id, "1d", process.env.FORGOT_PASSWORD_KEY);
  const url = `http://localhost:3000/password-reset/${token}`;
  try {
    const emailResponse = await transporter.sendMail({
      to,
      subject: "Reset password",
      html: `
      <p>
        Please, change your password in this link: 
        <b><a href="${url}" target="_blank">HERE</a></b>
      </p>`,
    });

    const user = await model.findOneAndUpdate(
      { _id: id },
      { $set: { resetPasswordToken: token } }
    );

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { forgotPasswordEmail };
