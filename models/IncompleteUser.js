const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const IncompleteUserSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["incompleteRental", "incompleteReferral"],
    required: true,
  },
  authLevel: {
    type: String,
    required: true,
    default: "user",
  },
  // rental properties
  haveFriends: {
    type: String,
    enum: ["yes", "no"],
  },
  isAdult: {
    type: String,
    enum: ["yes", "no"],
  },
  accountIsReal: {
    type: String,
    enum: ["yes", "no"],
  },
  isFirstTime: {
    type: String,

    enum: ["yes", "no"],
  },
  isOneYear: {
    type: String,
    enum: ["yes", "no"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "validated", "rejected"],
  },
  frecuency: {
    type: String,
  },
  devices: {
    type: [String],
  },
  os: {
    type: [String],
  },
  fbUsername: {
    type: String,
  },
  fbPassword: {
    type: String,
  },
  code2FA: {
    type: Number,
  },
  referral: {
    type: String,
  },
  termsAndConditions: {
    type: String,
    enum: ["yes", "no"],
  },
  gdprAgreement: {
    type: String,
    enum: ["yes", "no"],
  },
  // bmIdImage: {
  //   type: String,
  //
  // },
  // documentImage: {
  //   type: String,
  //
  // },
  // fbEmailImage: {
  //   type: String,
  //
  // },
  // rental and referral properties
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  paypalEmail: {
    type: String,
  },
  paypalEmailHistory: {
    type: [String],
  },
  paypalEmailVerified: {
    type: Boolean,
    default: false,
  },
  holderName: {
    type: String,
  },
  bankAngency: {
    type: String,
  },
  bankAccountCode: {
    type: Number,
  },
  oldReferralCode: {
    type: String,
    default: "",
  },
  referralCode: {
    type: String,
  },
  termsAndConditions: {
    type: String,
    enum: ["yes", "no"],
  },
  ip: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  documentImage: {
    type: String,
  },
});

IncompleteUserSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

IncompleteUserSchema.statics.login = async function (email, password) {
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

module.exports = IncompleteUser = mongoose.model(
  "incompleteUser",
  IncompleteUserSchema
);
