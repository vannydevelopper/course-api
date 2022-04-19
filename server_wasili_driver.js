const express = require("express");
const cors = require("cors");
const type_declarationRoutes = require("./app/routes/type_declaration.routes");
const corporateRoutes = require("./app/routes/corporate.routes");
const rider_kcbRoutes = require("./app/routes/rider_kcb.routes");
const pick_upRoutes = require("./app/routes/pick_up.routes");
const destinationRoutes = require("./app/routes/destination.routes");
const type_incidentRoutes = require("./app/routes/type_incident.routes");
const declarationRouter = require("./app/routes/declaration_course.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/type_declaration", type_declarationRoutes);
app.use("/corporate", corporateRoutes);
app.use("/rider_kcb", rider_kcbRoutes);
app.use("/pick_up", pick_upRoutes);
app.use("/destination", destinationRoutes);
app.use("/type_incident", type_incidentRoutes);
app.use("/declarations", declarationRouter);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log("server is running on port: " + port);
});
