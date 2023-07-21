"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const inputObjectModel_1 = require("../model/inputObjectModel");
class InputsController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new InputsController()[method](req, res);
    }
    async get(req, res) {
        try {
            const id = req.params.id;
            const inputsToResolve = inputObjectModel_1.default.get(id);
            if (inputsToResolve) {
                if (id)
                    res.json(inputsToResolve);
                else
                    res.json(inputsToResolve[Object.keys(inputsToResolve)[0]]);
                return;
            }
            res.json({ error: 404, text: "Not Found" });
        }
        catch (e) {
            return res.json({
                error: "500",
                description: "Params not Accaptable",
            });
        }
    }
    async put(req, res) {
        try {
            //body
            const bodyResponse = req.body.body;
            console.log("Request Recived: ", {
                id: bodyResponse.id,
                type: bodyResponse.type,
                data: bodyResponse.data,
            });
            if (bodyResponse.id && bodyResponse.type && bodyResponse.data) {
                bodyResponse.resolved = true;
                const response = inputObjectModel_1.default.setResolved(bodyResponse);
                res.json(response);
                return;
            }
            res.status(404);
            res.json({ error: 404, text: "Not Found" });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            return res.json({
                error: "500",
                description: "Device or Params not exist",
            });
        }
    }
    async post(req, res) {
        try {
            console.log("--------------------------------------------------------");
            const body = req.body;
            if (body.inputType) {
                let inputObject = {};
                inputObject.id = uuid.v1();
                inputObject.type = body.inputType;
                inputObject.params = body.params;
                inputObject.resolved = false;
                console.log({ inputObject });
                const response = inputObjectModel_1.default.set(inputObject);
                console.log({ RequestedObject: response });
                console.log("--------------------------------------------------------");
                res.json({ response });
                return;
            }
            res.status(400);
            res.json({ error: 400, text: "Missing Parameter" });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            return res.json({
                error: "500",
                description: "Device or Params not exist",
            });
        }
    }
}
exports.InputsController = InputsController;
exports.default = new InputsController();
//# sourceMappingURL=InputsController.js.map