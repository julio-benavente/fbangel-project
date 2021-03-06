const router = require("express").Router();
const jwt = require("jsonwebtoken");
// Models
const User = require("../../models/User");
const IncompleteUser = require("../../models/IncompleteUser");

// Middlewares and utils
const auth = require("../../middlewares/auth");
const checkAuthLevel = require("../../middlewares/checkAuthLevel");
const { uploadImageAndGetUrl } = require("../../utils/cloudinary");
const getNextSequence = require("../../utils/getNextSequence");
const { paypalEmailVerification } = require("../../utils/emailsTemplates/paypalEmailVerification");
const { emailVerification } = require("../../utils/emailsTemplates/emailVerification");
const { upload } = require("../../middlewares/upload");
const { imageLink } = require("../../utils/helperFunctions");

// Erros
const handleError = (error) => {
  const errorMessage = {};

  if (error.code && error.code === 11000) {
    errorMessage.email = "The email has already been registered";
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
    ).populate("payments.list");

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json(error);
  }
});

//@route /api/referrals/registration
//@desc Here users get registered
//@access Public
router.post("/registration/:userType", upload, async (req, res) => {
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
    if (req.files && req.files.documentImage) {
      userInformation["documentImage"] = imageLink(req.hostname, req.files && req.files.documentImage[0]);
    }

    if (req.files && req.files.fbEmailImage) {
      userInformation["fbEmailImage"] = imageLink(req.hostname, req.files && req.files.fbEmailImage[0]);
    }

    if (req.files && req.files.bmIdImage) {
      userInformation["bmIdImage"] = imageLink(req.hostname, req.files && req.files.bmIdImage[0]);
    }

    // Create a auto incrementing referral code

    const number = `0000000${await getNextSequence("referralid")}`.slice(-6);
    const referralCode = `FBA-${number}`;
    userInformation.referralCode = referralCode;
    userInformation.referralCodeLink = `${
      req.hostname === "localhost" ? "http://localhost:3000" : req.hostname
    }/join-now/${referralCode}`;

    const newUser = await new Model({ ...userInformation }).save();

    // Add user is to user who referred him
    // Just send email confirmation when is rental or referral user

    const { password, _id, ...dataToSendBoard } = newUser.toObject();

    if (newUser.paymentMethod === "paypal") {
      paypalEmailVerification(newUser, newUser.paypalEmail, req.hostname);
    }

    if (Model.modelName === "user") {
      emailVerification(newUser, req.hostname);

      // Prepering  data to sending to board
      if (req.files.documentImage) {
        dataToSendBoard["documentImage"] = {
          link: newUser.documentImage,
          type: req.files.documentImage[0].mimetype.replace("image/", ""),
          name: req.files.documentImage[0].originalname,
        };
      }
      if (req.files.fbEmailImage) {
        dataToSendBoard["fbEmailImage"] = {
          link: newUser.fbEmailImage,
          type: req.files.fbEmailImage[0].mimetype.replace("image/", ""),
          name: req.files.fbEmailImage[0].originalname,
        };
      }
      if (req.files.bmIdImage) {
        dataToSendBoard["bmIdImage"] = {
          link: newUser.bmIdImage,
          type: req.files.bmIdImage[0].mimetype.replace("image/", ""),
          name: req.files.bmIdImage[0].originalname,
        };
      }
    }

    if (Model.modelName !== "user") {
      throw Error("Incomplete registration");
    }

    res.json({ message: "Succesful user registration", user: dataToSendBoard });
  } catch (e) {
    // console.log(e);
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

router.post("/get-referrals", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw Error("User doens't exist");
    }

    const { referralCode } = user;
    const referrals = await User.find({ userType: "rental", referral: referralCode });

    res.json({ referrals });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/get-user-information/:id", async (req, res) => {
  const { id } = req.params;
  var user;
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
      user = await AdminUser.findById(id, {
        password: 0,
      });
    }

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
  // console.log("files", req.files);
});

router.put("/send-paypal-email-confirmation", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id }, { paypalEmailVerification: 1, paypalEmail: 1 });

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
      message: "The link to confirm your paypal email has already been sent. Check your email.",
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
