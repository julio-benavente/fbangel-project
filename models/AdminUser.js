const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const AdminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  emailVerified: {
    type: Boolean,
    require: true,
    default: false,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    require: true,
  },
  authLevel: {
    type: String,
    required: true,
    default: "admin",
  },
  resetPasswordToken: {
    type: String,
  },
});

AdminUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminUserSchema.statics.login = async function (email, password) {
  const user = await this.findOne(
    { email },
    "name lastname password email authLevel emailVerified"
  );

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const { password, ...send } = user._doc;
      return send;
    }

    throw Error("Invalid password");
  }
  throw Error("Invalid email");
};

module.exports = AdminUser = mongoose.model("adminUser", AdminUserSchema);
