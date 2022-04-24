const destinationModel = require("../models/destination.model");

const getDestination = async (req, res) => {
  try {
    const { CORPORATE_ID } = req.params;
    const { offset, limit, q } = req.query;
    const destinatoion = await destinationModel.getDestination(
      CORPORATE_ID,
      q,
      offset,
      limit
    );
    res.status(200).json(destinatoion);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getDestination,
};
