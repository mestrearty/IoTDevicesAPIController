"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alexaModel_1 = require("../model/alexaModel");
const alexaModel_2 = require("../model/alexaModel");
class AlexaController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new AlexaController()[method](req, res);
    }
    async get(req, res) {
        try {
            const params = req.params;
            //testando a alexa
            console.log("entrei");
            const alexaDBData = alexaModel_1.default.get();
            console.log(alexaDBData);
            if (alexaDBData)
                return res.json(alexaDBData);
            return res.json({ error: 404, text: 'not found' });
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
            //body
            const body = req.body;
            const type = body.type;
            const answer = body.answer;
            const atualAlexaStatus = alexaModel_1.default.get().status;
            if (type == 'alexaResponse' && answer && atualAlexaStatus == "awaiting") {
                alexaModel_1.default.setAnswer(answer);
                return res.json({ "code": 201, "msg": "saved" });
            }
            //default return
            let retorno = { error: 404, msg: 'Bad Request or Not Awaiting' };
            console.log(body);
            return res.json(retorno);
        }
        catch (e) {
            console.log(e);
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
    async put(req, res) {
        try {
            //body
            const body = req.body;
            const status = body.status;
            const msgToTalk = body.msgToTalk;
            //Try to find aura in db
            const alexaGetted = alexaModel_2.default.get();
            if (status && msgToTalk) {
                alexaModel_2.default.setStatus(status);
                alexaModel_2.default.setmsgToTalk(msgToTalk);
                return res.json({ "code": 201, "msg": "saved" });
            }
            //default return
            let retorno = { error: 422, msg: 'Unprocessable entity' };
            console.log(body);
            retorno = alexaModel_2.default.get();
            return res.json(retorno);
        }
        catch (e) {
            console.log(e);
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
}
exports.AlexaController = AlexaController;
exports.default = new AlexaController();
//# sourceMappingURL=alexaAPI.js.map