const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");
const { resetPasswordTemplate } = require("../../utils/emailsTemplates/templates");

const forgotPasswordEmail = async (id, to, model, hostname) => {
  const token = createToken(id, "1d", process.env.FORGOT_PASSWORD_KEY);
  const url = `${hostname === "localhost" ? "http://localhost:3000" : "//" + hostname}/reset-password/${token}`;

  const html = resetPasswordTemplate(url);

  try {
    const emailResponse = await transporter.sendMail({
      from: `fb4angel  <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset password",
      html: html,
    });

    const user = await model.findOneAndUpdate({ _id: id }, { $set: { resetPasswordToken: token } });

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { forgotPasswordEmail };
