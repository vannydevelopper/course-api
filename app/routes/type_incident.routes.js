const express = require("express");
const type_incidentController = require("../controllers/type_incident.controller");

const type_incidentRoutes = express.Router();

type_incidentRoutes.get("/", type_incidentController.findAllTypeIncident);

module.exports = type_incidentRoutes;
