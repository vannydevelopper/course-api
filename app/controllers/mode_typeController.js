const mode_typemodel = require("../models/mode_typemodel");

const findAllmodeType = async (req, res) => {
//   const { offset, limit } = req.query;
  try {
    const mode_type = await mode_typemodel.findAll();
    res.status(200).json(mode_type);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
     findAllmodeType,
};