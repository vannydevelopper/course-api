const express = require("express");
const pick_upContorller = require("../controllers/pick_up.controller");

const pick_upRoutes = express.Router();

pick_upRoutes.get("/:CORPORATE_ID", pick_upContorller.getPick);

module.exports = pick_upRoutes;
