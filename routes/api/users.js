const router = require("express").Router();

// Models
const User = require("../../models/User");
const IncompleteUser = require("../../models/IncompleteUser");

// Middlewares and utils
const auth = require("../../middlewares/auth");
const { uploadImageAndGetUrl } = require("../../utils/cloudinary");
const getNextSequence = require("../../utils/getNextSequence");

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
    userInformation.referralCode = `FBA-${number}`;

    const newUser = await new Model({ ...userInformation }).save();

    Model.modelName === "user" &&
      emailVerification(newUser._id, req.body.email);

    if (Model.modelName !== "user") {
      throw Error("Incomplete registration");
    }

    res.json({ message: "Succesful user registration" });
  } catch (e) {
    console.log(e);
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

//@route /api/referrals/testing
//@desc
//@access Public
router.get("/testing", async (req, res) => {
  const { modelName } = User;
  console.log(modelName);
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

module.exports = router;
