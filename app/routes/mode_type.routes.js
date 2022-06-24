const express = require("express");
const mode_typeController = require("../controllers/mode_typeController");

const modeRouter = express.Router();

modeRouter.get("/", mode_typeController.findAllmodeType);

module.exports = modeRouter;
