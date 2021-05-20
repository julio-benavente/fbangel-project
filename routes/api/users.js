const router = require("express").Router();
const jwt = require("jsonwebtoken");
// Models
const User = require("../../models/User");
const IncompleteUser = require("../../models/IncompleteUser");

// Middlewares and utils
const auth = require("../../middlewares/auth");
const { uploadImageAndGetUrl } = require("../../utils/cloudinary");
const getNextSequence = require("../../utils/getNextSequence");
const {
  paypalEmailVerification,
} = require("../../utils/emailsTemplates/paypalEmailVerification");

const {
  emailVerification,
} = require("../../utils/emailsTemplates/emailVerification");

const handleError = (error) => {
  const errorMessage = {};

  if (error.code && error.code === 11000 && error.keyValue.email) {
    errorMessage.email = "The email has already been registered";
  }

  if (error.code && error.code === 11000 && error.keyValue.referralCode) {
    errorMessage.referralCode = "The referral code has already been registered";
  }

  if (error.message === "Incomplete registration") {
    error.incomplete = error.message;
  }
  errorMessage.other = error.message;
  return errorMessage;
};

//@route /api/referrals/
//@desc Returns all the referrals
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        password: 0,
        haveFriends: 0,
        isFirstTime: 0,
        isOneYear: 0,
        isAdult: 0,
        accountIsReal: 0,
      }
    );
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json(error);
  }
});

//@route /api/referrals/registration
//@desc Here users get registered
//@access Public
router.post("/registration/:userType", async (req, res) => {
  const { userType } = req.params;

  const userTypeValidation = {
    rental: "rental",
    incompleteRental: "incompleteRental",
    referral: "referral",
    incompleteReferral: "incompleteReferral",
  };

  if (!userTypeValidation[userType]) {
    res.status(400).json({ error: "The user type is wrong" });
    return;
  }

  const modelValidation = {
    rental: User,
    incompleteRental: IncompleteUser,
    referral: User,
    incompleteReferral: IncompleteUser,
  };

  const Model = modelValidation[userType];

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const userInformation = {
    userType,
    ...req.body,
    ip,
  };

  try {
    // Upload all images
    if (req.body.documentImage) {
      userInformation.documentImage = await uploadImageAndGetUrl(
        req.body.documentImage,
        "documentImages"
      );
    }

    if (req.body.fbEmailImage) {
      userInformation.fbEmailImage = await uploadImageAndGetUrl(
        req.body.fbEmailImage,
        "fbEmailImages"
      );
    }

    if (req.body.bmIdImage) {
      userInformation.bmIdImage = await uploadImageAndGetUrl(
        req.body.bmIdImage,
        "bmIdImages"
      );
    }

    // Create a auto incrementing referral code

    const number = `0000000${await getNextSequence("referralid")}`.slice(-6);
    const referralCode = `FBA-${number}`;
    userInformation.referralCode = referralCode;
    userInformation.referralCodeLink = `${
      req.hostname === "localhost" ? "http://localhost:3000/#/" : req.hostname
    }/${referralCode}`;

    const newUser = await new Model({ ...userInformation }).save();

    // Add user is to user who referred him
    // Model.findOneAndUpdate({ referral: referral }, { $push });

    // Just send email confirmation when is rental or referral user
    Model.modelName === "user" &&
      emailVerification(newUser._id, req.body.email);

    if (Model.modelName !== "user") {
      throw Error("Incomplete registration");
    }

    res.json({ message: "Succesful user registration" });
  } catch (e) {
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

router.post("/get-referrals", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ _id: id }).populate({
      path: "referrals",
      select: "firstName lastName status email creationDate statusObservation",
    });

    if (!user) {
      throw Error("User doens't exist");
    }

    res.json({ referrals: user.referrals });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/get-user-information/:id", async (req, res) => {
  const { id } = req.params;

  try {
    user = await User.findById(id, {
      password: 0,
      haveFriends: 0,
      isFirstTime: 0,
      isOneYear: 0,
      isAdult: 0,
      accountIsReal: 0,
    });

    if (!user) {
      throw Error("The user doesn't exist");
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//@route /api/referrals/testing
//@desc
//@access Public
const os = require("os");
router.get("/testing", async (req, res) => {
  const { modelName } = User;
  res.json({
    hostname: req.hostname,
    osHostname: os.hostname(),
    hostnameHost: req.header("host"),
  });
});

//@route /api/referrals/testing
//@desc
//@access Public
router.post("/testing", async (req, res) => {
  try {
    const response = referralEmailConfirmation(
      "julio",
      "woricev854@dghetian.com"
    );
    res.json({ message: response });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/send-paypal-email-confirmation", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne(
      { _id: id },
      { paypalEmailVerification: 1, paypalEmail: 1 }
    );

    if (!user) {
      throw Error("User doesn't exist");
    }

    if (paypalEmailVerification === true) {
      res.json({
        message: "Your paypal email has already been confirmed",
      });
      return;
    }

    paypalEmailVerification(user, user.paypalEmail, req.hostname);

    res.json({
      message:
        "The link to confirm your paypal email has already been sent. Check your email.",
    });
  } catch (e) {
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

router.get("/confirm-paypal-email/:token", async (req, res) => {
  const tokenKey = process.env.PAYPAL_EMAIL_CONFIRMATION;
  const { token } = req.params;

  try {
    await jwt.verify(token, tokenKey, async (error, decodedToken) => {
      if (error) {
        throw Error("The url token is incorrect or has expired");
        return;
      }

      const user = await User.findById(decodedToken.data);

      if (user) {
        // Set verification True
        await user.updateOne({
          $set: { paypalEmailVerified: true },
        });
        res.json({ message: "Your paypal account has been verified" });
      } else {
        throw Error("User doesn't exist");
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
