"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auraModel_1 = require("../model/auraModel");
const interatorModel_1 = require("../model/interatorModel");
const propertiesInteratorModel_1 = require("../model/propertiesInteratorModel");
class AuraController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new AuraController()[method](req, res);
    }
    async get(req, res) {
        try {
            let retorno = { error: 404, text: 'not found' };
            const interatorId = req.params.id;
            const instanceId = req.params.instanceId;
            if (interatorId) {
                if (instanceId != undefined) {
                    let auraInstance = "";
                    if (instanceId === "list")
                        auraInstance = auraModel_1.default.getInteratorPSTInstanceModel(interatorId, instanceId);
                    else
                        auraInstance = auraModel_1.default.getInteratorPSTInstanceListModel(interatorId);
                }
                else {
                    let aura = auraModel_1.default.get(interatorId);
                    retorno = (aura);
                }
            }
            if (interatorId && interatorModel_1.default.get(interatorId)) {
                if (req.params.info == "properties") {
                    retorno = (propertiesInteratorModel_1.default.get(interatorId));
                }
                else
                    retorno = (interatorModel_1.default.get(interatorId));
            }
            return res.json(retorno);
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
    async post(req, res) {
        try {
            const body = req.body;
            const params = req.params;
            let retorno = { error: 404, text: 'not found' };
            if (body && body.id) {
                interatorModel_1.default.set(body);
                retorno = interatorModel_1.default.get(body.id);
            }
            if (params.info == "properties" && body.properties && interatorModel_1.default.get(params.id)) {
                propertiesInteratorModel_1.default.set(params.id, body.properties);
                retorno = interatorModel_1.default.get(params.id);
            }
            return res.json(retorno);
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
}
exports.AuraController = AuraController;
exports.default = new AuraController();
//# sourceMappingURL=auraController.js.map