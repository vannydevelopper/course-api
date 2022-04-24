const express = require("express");
const corporateController = require("../controllers/corporate.controller");

const corporateRoutes = express.Router();

corporateRoutes.get("/", corporateController.findAllCorporate);

module.exports = corporateRoutes;
