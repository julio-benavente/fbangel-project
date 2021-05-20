const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");
const AdminUser = require("../../models/AdminUser");

// Middlewares and utils
const { createToken } = require("../../utils/createToken");
const checkAuthLevel = require("../../middlewares/checkAuthLevel");
const {
  emailVerification,
} = require("../../utils/emailsTemplates/emailVerification");
const {
  forgotPasswordEmail,
} = require("../../utils/emailsTemplates/forgotPasswordEmail");

const handleError = (err) => {
  const errorMessage = {};
  // If the email has already been used

  if (err.code == 11000) {
    errorMessage.email = "The email has already been used";
  }

  // Valadation error
  if (err.errors && err.message.includes("user validation failed")) {
    Object.keys(err.errors).forEach((i) => {
      errorMessage[i] = err.errors[i].properties.message;
    });
  }

  // If the password is wrong
  if (err.message == "Invalid password") {
    errorMessage.password = "The email or password is incorrect";
  }

  // if the email is wrong
  if (err.message == "Invalid email") {
    errorMessage.email = "The email or password is incorrect";
  }

  // if the email is wrong
  if (err.message == "User doesn't exist") {
    errorMessage.email = "The email or password is incorrect";
  }

  return errorMessage;
};

// @route GET /auth
// @desc Verifies authorization (cookie)
// @access Public
router.get("/", (req, res) => {
  const tokenApi = process.env.JWT_KEY;
  const token = req.cookies.fbangelJWT;

  try {
    if (token) {
      jwt.verify(token, tokenApi, async (err, decodedToken) => {
        if (err) {
          throw Error("The user is not authenticated");
        }

        var user = null;
        user = await User.findById(decodedToken.data, {
          firstName: 1,
          lastName: 1,
          id: 1,
          email: 1,
          authLevel: 1,
          paypalEmailVerified: 1,
        });

        if (!user) {
          user = await AdminUser.findById(decodedToken.data, {
            firstName: 1,
            lastName: 1,
            id: 1,
            email: 1,
            authLevel: 1,
          });
        }

        if (!user) {
          throw Error("The user doesn't exist");
        }

        res.json({ user });
      });
    } else {
      throw Error("The user is not authenticated");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@route GET /auth/logout
//@desc Logout user
//@access Pulbic
router.get("/logout", (req, res) => {
  try {
    const token = req.cookies.fbangelJWT;
    if (token) {
      res.cookie("fbangelJWT", "token", { maxAge: 1 });
      res.json({ message: "User logged out" });
    } else {
      throw Error("There is no user logged in");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route GET /auth/login
// @desc Users login
// @access Public
router.post("/login", checkAuthLevel, async (req, res) => {
  const model = req.userAuthLevel === "admin" ? AdminUser : User;
  const { email, password } = req.body;

  try {
    const { emailVerified, ...user } = await model.login(email, password);

    if (!emailVerified) {
      const error = new Error("User has not been verfied");
      error.emailVerified = "The email has not been verified";

      res.status(400).json({ error });
      return;
    }

    const token = createToken(user._id, "1d");

    res.cookie("fbangelJWT", token, { httpOnly: true });
    res.json({ user });
  } catch (e) {
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

// @route GET /auth/send-confirmation-email
// @desc Users login
// @access Public
router.post("/send-confirmation-email", checkAuthLevel, async (req, res) => {
  const model = req.userAuthLevel === "admin" ? AdminUser : User;
  const { email } = req.body;

  try {
    const user = await model.findOne({ email }, { emailVerified: 1 });
    if (user.emailVerified) {
      return res.json({ message: "The email has already been verified" });
    }

    if (!user) {
      throw Error("User doesn't exist");
    }

    emailVerification(user._id, email, req.hostname);

    res.json({
      message:
        "The confirmation email has already been sent. Check your email.",
    });
  } catch (e) {
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

// @route PUT /auth/confirmation/:token
// @desc Users login
// @access Public
router.get("/confirmation/:token", async (req, res) => {
  const model = req.userAuthLevel === "admin" ? AdminUser : User;

  const tokenKey = process.env.EMAIL_VERIFICATION_KEY;
  const { token } = req.params;

  try {
    await jwt.verify(token, tokenKey, async (error, decodedToken) => {
      if (error) throw Error(error);

      const user = await model.findById(decodedToken.data);

      if (user) {
        // Validate is users is already been verified
        if (user.emailVerified) {
          res.json({ message: "Account it's been already verified" });
          return;
        }

        // Set verification True
        await user.update({ $set: { emailVerified: true } });
        res.json({ message: "Account verified" });
      } else {
        throw Error("User doesn't exist");
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route PUT /auth/forgot-password/
// @desc Users login
// @access Public
router.post("/forgotten-password", async (req, res) => {
  const model = req.userAuthLevel === "admin" ? AdminUser : User;
  const { email } = req.body;

  try {
    const user = await model.findOne({ email });

    if (!user) {
      throw Error("User doesn't exist");
    }

    forgotPasswordEmail(user._id, email, model, req.hostname);

    res.json({
      message:
        "The link to reset your password has already ben sent. Check your email.",
    });
  } catch (e) {
    const error = handleError(e);
    res.status(400).json({ error });
  }
});

router.put("/reset-password/:token", async (req, res) => {
  const { password } = req.body;

  const tokenKey = process.env.FORGOT_PASSWORD_KEY;
  const { token } = req.params;

  try {
    await jwt.verify(token, tokenKey, async (error, decodedToken) => {
      if (error) {
        throw Error("The reset password url is incorrect or has expired");
      }

      var user = null;
      user = await User.findById(decodedToken.data);

      if (!user) {
        user = await AdminUser.findById(decodedToken.data);
      }

      if (user) {
        if (user.resetPasswordToken !== token) {
          throw Error("The reset password url is incorrect or has expired");
        }

        // Set verification True
        user.password = password;
        user.resetPasswordToken = "";
        user.save();

        res.json({ message: "The password has already been changed" });
      } else {
        throw Error("User doesn't exist");
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
