const express = require("express");
const type_declarationController = require("../controllers/type_declaration.controller");

const type_declarationRoutes = express.Router();

type_declarationRoutes.get(
  "/",
  type_declarationController.findAllTypeDeclaration
);

module.exports = type_declarationRoutes;
