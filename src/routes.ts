import { Router } from "express";
import AlexaController from "./controller/alexaController";
import DevicesController from "./controller/DevicesController";
import InputsController from "./controller/InputsController";
const routes = Router();

routes.get("/", (req, res) => {
  console.log("entrei");
  res.json({ status: "Server ok!" });
});
routes.use("/alexa", AlexaController.redirect);
routes.use("/devices", DevicesController.redirect);
routes.use("/inputs/:id?", InputsController.redirect);
//%20 - espaço

export default routes;
