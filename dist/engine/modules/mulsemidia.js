"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circunstanceEngine_1 = require("../circunstanceEngine");
const colorTerminal_1 = require("../../utils/colorTerminal");
const properties_1 = require("./properties");
const properties_2 = require("../modules/properties");
const request = require("request-promise");
const alexa_1 = require("../../devicesAPI/alexa");
const device_1 = require("./device");
class Mulsemidia {
    constructor() {
        this.options = {
            'method': 'GET',
            'url': 'https://b4ae4eaf-d935-4993-9f27-349c0e7555e8.mock.pstmn.io',
            'headers': {
                'Content-Type': 'application/json'
            }
        };
    }
    runMulsemidiaObject(mediaElementInstance) {
        const nextElementId = mediaElementInstance.currentInstance[`$`].next;
        const mediaInstanceId = mediaElementInstance.currentInstance[`$`].id;
        colorTerminal_1.default.mulsemidiaColor(`Iniciando ${mediaInstanceId}`);
        this.runElement(mediaElementInstance, nextElementId, mediaInstanceId, mediaElementInstance.currentInstance[`$`].fatherID);
    }
    next(mediaElementInstance, nextElementId, mediaInstanceId) {
        properties_1.default.changePropetieByID(mediaInstanceId, mediaElementInstance, 'status', 'finished');
        if (nextElementId && nextElementId != "") {
            let nextElementInstance = properties_1.default.getInstanceByID(nextElementId, mediaElementInstance);
            mediaElementInstance.currentInstance[`$`] = nextElementInstance;
            colorTerminal_1.default.mulsemidiaColor(`Encerrando ${mediaInstanceId} - Next: ${nextElementId}`);
            circunstanceEngine_1.default.startWatching(mediaElementInstance);
        }
    }
    runElement(mediaElementInstance, nextElementId, mediaInstanceId, fatherID) {
        const currentMediaProperties = mediaElementInstance.currentInstance[`$`].properties;
        const currentMediaType = mediaElementInstance.currentInstance[`$`].type;
        let dur = 5000;
        if (currentMediaProperties && currentMediaProperties.dur)
            dur = currentMediaProperties.dur * 1000;
        //o setTimout é feito para simular a duração do elemento ocorrer até que chame o próximo
        setTimeout(() => {
            if (properties_2.default.checkStatusByID(fatherID, mediaElementInstance) == 'occurring') {
                if (mediaElementInstance.currentInstance['$'].option) {
                    new Mulsemidia().optionResolver(mediaElementInstance.currentInstance, mediaElementInstance);
                }
                else if (currentMediaType && currentMediaProperties) {
                    this.mulsemidiaResolver(currentMediaType, currentMediaProperties);
                }
                new Mulsemidia().next(mediaElementInstance, nextElementId, mediaInstanceId);
            }
            else {
                if (properties_2.default.checkStatusByID(fatherID, mediaElementInstance) == 'disabled') {
                    properties_2.default.changePropetieByID(mediaInstanceId, mediaElementInstance, 'status', 'disabled');
                }
                else if (properties_2.default.checkStatusByID(fatherID, mediaElementInstance) == 'finished') {
                    properties_2.default.changePropetieByID(mediaInstanceId, mediaElementInstance, 'status', 'finished');
                }
                else {
                    if (properties_2.default.checkStatusByID(fatherID, mediaElementInstance) == 'paused') {
                        properties_2.default.changePropetieByID(mediaInstanceId, mediaElementInstance, 'status', 'paused');
                    }
                    else if (properties_2.default.checkStatusByID(fatherID, mediaElementInstance) == 'locked') {
                        properties_2.default.changePropetieByID(mediaInstanceId, mediaElementInstance, 'status', 'locked');
                    }
                    new Mulsemidia().runElement(mediaElementInstance, nextElementId, mediaInstanceId, fatherID);
                }
            }
        }, dur);
    }
    optionResolver(decisionPoint, mediaElementInstance) {
        decisionPoint.option = decisionPoint['$'].option;
        this.checkOptionsRequests(decisionPoint, mediaElementInstance);
    }
    async checkOptionsRequests(decisionPoint, mediaElementInstance) {
        let voiceRequest = false;
        for (let option in decisionPoint.option) {
            const condition = decisionPoint.option[option][`$`].condition;
            const hasVoiceRecognition = /voiceRecognition/.test(condition);
            if (hasVoiceRecognition) {
                alexa_1.default.openRequest("Lux ou Ferrer?");
                voiceRequest = true;
            }
        }
        let voiceRequestResult;
        function voiceRecognition(listOfPossibleResponses) {
            return listOfPossibleResponses.includes(voiceRequestResult);
        }
        function resolve(voiceRequestResultF) {
            for (let option in decisionPoint.option) {
                const condition = decisionPoint.option[option];
                const action = decisionPoint.option[option][`$`].action;
                const isConditionOk = eval(condition);
                if (isConditionOk) {
                    if (voiceRequest) {
                        voiceRequestResult = voiceRequestResultF;
                        alexa_1.default.setStatus("answered");
                    }
                    this.makeActions(action, mediaElementInstance);
                }
            }
        }
        if (voiceRequest) {
            //voiceRequestResult = JSON.parse(await this.makeARequest('/voice/voicerecognition')).resp
            //await alexaModel.verifyAnswer().then(resolve(voiceRequestResult));
            colorTerminal_1.default.alertMsg({ voiceRequestResult });
        }
        else {
            resolve();
        }
    }
    async makeARequest(rote) {
        let req = { ...this.options };
        req.url += rote;
        return await request(req, function (error, response, body) {
            const voiceResp = JSON.parse(body);
            return voiceResp.resp;
        });
    }
    makeActions(actionString, mediaElementInstance) {
        const actionObject = JSON.parse(actionString.replace(/[#]/g, "").replace(/'/g, "\""));
        colorTerminal_1.default.alertMsg({ actionObject, enable: actionObject.enable });
        if (actionObject.enable) {
            properties_1.default.changePropetieByID(actionObject.enable, mediaElementInstance, "status", "enable");
            //colorTerminal.testColor({mediaElementInstance})
        }
        if (actionObject.disable)
            properties_1.default.changePropetieByID(actionObject.disable, mediaElementInstance, "status", "disable");
    }
    mulsemidiaResolver(type, params) {
        switch (type) {
            case "light":
                device_1.default.light(params);
                break;
        }
    }
}
exports.Mulsemidia = Mulsemidia;
exports.default = new Mulsemidia();
//# sourceMappingURL=mulsemidia.js.map