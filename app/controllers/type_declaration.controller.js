const type_declarationModel = require("../models/type_declaration.model");

const findAllTypeDeclaration = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    const type_declaration = await type_declarationModel.findAll(offset, limit);
    res.status(200).json(type_declaration);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  findAllTypeDeclaration,
};
