const express = require("express");
const destinationController = require("../controllers/destination.controller");

const destinationRoutes = express.Router();

destinationRoutes.get("/:CORPORATE_ID", destinationController.getDestination);

module.exports = destinationRoutes;
