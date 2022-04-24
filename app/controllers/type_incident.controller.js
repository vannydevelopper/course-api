const type_incidentModel = require("../models/type_incident.model");

const findAllTypeIncident = async (req, res) => {
          const { offset, q, limit } = req.query;
          try {
                    const type_declaration = await type_incidentModel.findAll(q, offset, limit);
                    res.status(200).json(type_declaration);
          } catch (error) {
                    console.log(error);
                    res.status(500).send("Server error");
          }
};

module.exports = {
          findAllTypeIncident,
};
