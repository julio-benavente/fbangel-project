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

const obfuscate = (email) => {
  const separatorIndex = email.indexOf("@");
  if (separatorIndex < 3) {
    // 'ab@gmail.com' -> '**@gmail.com'
    return (
      email.slice(0, separatorIndex).replace(/./g, "*") +
      email.slice(separatorIndex)
    );
  }
  // 'test42@gmail.com' -> 'te****@gmail.com'
  return (
    email.slice(0, 2) +
    email.slice(2, separatorIndex).replace(/./g, "*") +
    email.slice(separatorIndex)
  );
};

const UserSchema = new mongoose.Schema(
  {
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
      enum: ["pending", "active", "rejected"],
      required: rentalType,
    },
    statusObservation: {
      type: String,
      default: "",
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
    referralHasBeenPayed: {
      type: Boolean,
      default: false,
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
      lowercase: true,
      get: (v) => v[0].toUpperCase() + v.slice(1),
    },
    lastName: {
      type: String,
      lowercase: true,
      get: (v) => v[0].toUpperCase() + v.slice(1),
      required: rentalReferralType,
    },
    address: {
      type: String,
      required: referralType,
    },
    email: {
      type: String,
      get: obfuscate,
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
      unique: rentalReferralType,
      required: rentalReferralType,
    },
    referralCodeLink: {
      type: String,
      unique: rentalReferralType,
      required: rentalReferralType,
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
    fortnight: {
      type: Number,
      default: () => {
        const day = new Date().getDate();
        const fortnight = day <= 15 ? 1 : 2;
        return fortnight;
      },
    },
    payments: {
      tier: {
        type: String,
        default: "tierOne",
      },
      firstRentPayed: {
        type: Boolean,
        default: false,
      },
      list: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "payment",
      },
    },
    referrals: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    resetPasswordToken: {
      type: String,
    },
  },
  { toJSON: { getters: true } }
);

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
