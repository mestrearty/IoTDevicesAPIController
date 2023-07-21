"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alexaController_1 = require("./controller/alexaController");
const DevicesController_1 = require("./controller/DevicesController");
const InputsController_1 = require("./controller/InputsController");
const routes = express_1.Router();
routes.get("/", (req, res) => {
    console.log("entrei");
    res.json({ status: "Server ok!" });
});
routes.use("/alexa", alexaController_1.default.redirect);
routes.use("/devices", DevicesController_1.default.redirect);
routes.use("/inputs/:id?", InputsController_1.default.redirect);
//%20 - espaço
exports.default = routes;
//# sourceMappingURL=routes.js.map