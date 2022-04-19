const corporateModel = require("../models/corporate.model");

const findAllCorporate = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    const corporate = await corporateModel.findAll(offset, limit);
    res.status(200).json(corporate);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  findAllCorporate,
};
