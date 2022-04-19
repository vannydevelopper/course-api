const express = require("express");
const declaratioController = require("../controllers/declaration_course.controller");

const declarationRoutes = express.Router();

declarationRoutes.post("/", declaratioController.createDeclaration);
declarationRoutes.post("/driver/login", declaratioController.login);
declarationRoutes.get("/agences", declaratioController.getAgences);

module.exports = declarationRoutes;
