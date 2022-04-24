const rider_kcbController = require("../models/rider_kcb.model");

const getRider = async (req, res) => {
  try {
    const { CORPORATE_ID } = req.params;
    const { offset, limit, q } = req.query;
    const rider_kcb = await rider_kcbController.getAllRider(
      CORPORATE_ID,
      q,
      offset,
      limit
    );
    res.status(200).json(rider_kcb);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getRider,
};
