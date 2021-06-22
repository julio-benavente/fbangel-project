const router = require("express").Router();
const Action = require("../../models/Action");
const User = require("../../models/User");
const Payment = require("../../models/Payment");

const auth = require("../../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const actions = await Action.find({}).populate({
      path: "details.item",
      model: "user",
      select: "-payments -referrals",

      match: { userType: { $exists: true } },
    });

    res.json({ message: "Actions", actions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { action, details, createdBy } = req.body;
  try {
    const newAction = await new Action({
      action,
      details,
      createdBy,
    }).save();

    res.json({
      message: "Actions post",
      action: newAction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/change-user-status", auth, async (req, res) => {
  const { action, details, target, createdBy } = req.body;

  const errorList = [];

  try {
    const newAction = await new Action({
      action,
      details,
      target,
      createdBy,
    }).save();

    if (!newAction) {
      throw Error("Creation of the action failed");
    }

    await Promise.all(
      details.map(async ({ item, modification }) => {
        try {
          const { status, statusObservation } = modification;

          const user = await User.findByIdAndUpdate(item, {
            $set: { status, statusObservation: statusObservation || "" },
          }).exec();
        } catch (error) {
          errorList.push({
            itemId: item,
            error: error.message,
            where: "/change-user-status",
          });
        }
      })
    );

    newAction.errorList = errorList;
    newAction.save();
    res.json({
      action: newAction,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
