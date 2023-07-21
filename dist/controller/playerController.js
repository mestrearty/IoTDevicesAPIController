"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runnerActionsEngine_1 = require("../engine/runnerActionsEngine");
const runnerActionsEngine_2 = require("../engine/runnerActionsEngine");
const InteratorPSTInstanceModel_1 = require("../model/InteratorPSTInstanceModel");
class PlayerController {
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new PlayerController()[method](req, res);
    }
    async put(req, res) {
        try {
            const params = req.params;
            const action = params.action;
            const interatorId = params.interatorId;
            const pstInstanceId = params.pstInstance;
            const episodeId = params.episodeId;
            const elementId = params.elementId;
            const pstInstance = { ...InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel(interatorId, pstInstanceId) };
            const instance = { interatorId, pstInstanceId, episodeId, pstInstance };
            return res.json(runnerActionsEngine_1.default[action](elementId, { ...instance }));
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
    async get(req, res) {
        try {
            const params = req.params;
            const action = params.action;
            const interatorId = params.interatorId;
            const pstInstanceId = params.pstInstance;
            const episodeId = params.episodeId;
            const elementId = params.elementId;
            let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel(interatorId, pstInstanceId);
            const instance = { interatorId, pstInstanceId, episodeId, pstInstance };
            runnerActionsEngine_2.default.start(instance);
            return res.json({ action, interatorId, pstInstanceId, episodeId, pstInstance });
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
}
exports.PlayerController = PlayerController;
exports.default = new PlayerController();
//# sourceMappingURL=playerController.js.map