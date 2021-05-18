const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function rentalType() {
  return this.userType === "rental";
}

function referralType() {
  return this.userType === "referral";
}

function rentalReferralType() {
  return this.userType === "rental" || this.userType === "referral";
}

const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["rental", "referral"],
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
    required: rentalType,
  },
  isAdult: {
    type: String,
    enum: ["yes", "no"],
    required: rentalType,
  },
  accountIsReal: {
    type: String,
    enum: ["yes", "no"],
    required: rentalType,
  },
  isFirstTime: {
    type: String,

    enum: ["yes", "no"],
    required: rentalType,
  },
  isOneYear: {
    type: String,
    enum: ["yes", "no"],
    required: rentalType,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "validated", "rejected"],
    required: rentalType,
  },
  frecuency: {
    type: String,
    required: rentalType,
  },
  devices: {
    type: [String],
    required: rentalType,
  },
  os: {
    type: [String],
    required: rentalType,
  },
  fbUsername: {
    type: String,
    required: rentalType,
  },
  fbPassword: {
    type: String,
    required: rentalType,
  },
  code2FA: {
    type: Number,
    required: rentalType,
  },
  referral: {
    type: String,
  },
  gdprAgreement: {
    type: String,
    required: rentalType,
    enum: ["yes", "no"],
  },
  bmIdImage: {
    type: String,
    required: rentalType,
  },
  documentImage: {
    type: String,
    required: rentalType,
  },
  fbEmailImage: {
    type: String,
    required: rentalType,
  },
  // rental and referral properties
  firstName: {
    type: String,
    required: rentalReferralType,
  },
  lastName: {
    type: String,
    required: rentalReferralType,
  },
  address: {
    type: String,
    required: referralType,
  },
  email: {
    type: String,
    unique: rentalType,
    lowercase: true,
    required: rentalReferralType,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  country: {
    type: String,
    required: rentalReferralType,
  },
  city: {
    type: String,
    required: rentalReferralType,
  },
  zipCode: {
    type: String,
    required: referralType,
  },
  birthday: {
    type: Date,
    required: rentalReferralType,
  },
  phone: {
    type: Number,
    required: rentalReferralType,
  },
  password: {
    type: String,
    required: rentalReferralType,
  },
  paymentMethod: {
    type: String,
    required: rentalReferralType,
  },
  paypalEmail: {
    type: String,
    required: function () {
      return rentalReferralType() && this.paymentMethod === "paypal";
    },
  },
  paypalEmailHistory: {
    type: [String],
  },
  paypalEmailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  holderName: {
    type: String,
    required: function () {
      return rentalReferralType() && this.paymentMethod === "bank-peru";
    },
  },
  bankAngency: {
    type: String,
    required: function () {
      return rentalReferralType() && this.paymentMethod === "bank-peru";
    },
  },
  bankAccountCode: {
    type: Number,
    required: function () {
      return rentalReferralType() && this.paymentMethod === "bank-peru";
    },
  },
  oldReferralCode: {
    type: String,
    default: "",
  },
  referralCode: {
    type: String,
    unique: rentalType,
    required: rentalType,
  },
  termsAndConditions: {
    type: String,
    required: true,
    enum: ["yes", "no"],
  },
  ip: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  payments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "payment",
  },
  resetPasswordToken: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne(
    { email },
    "firstName lastName password email authLevel emailVerified"
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

module.exports = User = mongoose.model("user", UserSchema);
