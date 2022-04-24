const express = require("express");
const rider_kcbContorller = require("../controllers/rider_kcb.controller");

const rider_kcbRoutes = express.Router();

rider_kcbRoutes.get("/:CORPORATE_ID", rider_kcbContorller.getRider);

module.exports = rider_kcbRoutes;
