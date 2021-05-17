const Counter = require("../models/Counter");

const getNextSequence = async (name) => {
  try {
    var ret = await Counter.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } }
    );
    return ret.seq;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getNextSequence;
