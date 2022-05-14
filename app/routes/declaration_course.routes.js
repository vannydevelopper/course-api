const express = require("express");
const declaratioController = require("../controllers/declaration_course.controller");

const declarationRoutes = express.Router();

declarationRoutes.post("/", declaratioController.createDeclaration);
declarationRoutes.post("/driver/login", declaratioController.login);
declarationRoutes.get("/agences", declaratioController.getAgences);
declarationRoutes.get("/raisons", declaratioController.getRaisons);
declarationRoutes.get("/:chauffeurId", declaratioController.getHistory);
declarationRoutes.get("/last_course/:chauffeurId", declaratioController.getLastCourse);

module.exports = declarationRoutes;
