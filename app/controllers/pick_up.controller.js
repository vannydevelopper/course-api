const pick_upController = require("../models/pick_up.model");

const getPick = async (req, res) => {
  try {
    const { CORPORATE_ID } = req.params;
    const { offset, limit } = req.query;
    const rider_kcb = await pick_upController.getPick(
      CORPORATE_ID,
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
  getPick,
};
