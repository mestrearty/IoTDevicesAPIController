"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const InteratorPSTInstanceModel_1 = require("./InteratorPSTInstanceModel");
class AlexaModel extends InteratorPSTInstanceModel_1.InteratorPSTInstanceModel {
    constructor() {
        super();
    }
    setStatus(status) {
        database_1.default.setData(`alexa/status`, { status });
    }
    setmsgToTalk(msgToTalk) {
        database_1.default.setData(`alexa/msgToTalk`, { msgToTalk });
    }
    setAnswer(answer) {
        database_1.default.setData(`alexa/status`, { "status": "answered" });
        database_1.default.setData(`alexa/answer`, { answer });
    }
    get() {
        const status = database_1.default.getData("alexa/status");
        const msgToTalk = database_1.default.getData("alexa/msgToTalk");
        const answer = database_1.default.getData("alexa/answer");
        return { status: status.status, msgToTalk: msgToTalk.msgToTalk, answer: answer.answer };
    }
    openRequest(msg) {
        new AlexaModel().setStatus("awaiting");
        new AlexaModel().setmsgToTalk(msg);
    }
    async verifyAnswer() {
        const awaitAnswer = new AlexaModel().get().status;
        const alexaData = new AlexaModel().get();
        if (alexaData.status == 'answered') {
            return alexaData.answer;
        }
        else {
            setTimeout(() => {
                console.log({ alexaData });
            }, 2000);
            return this.verifyAnswer();
        }
        /*
            let refreshIntervalId = setInterval(function () {
                const alexaData = new AlexaModel().get()
                if (alexaData.status == 'answered') {
                    clearInterval(refreshIntervalId)
                    return alexaData.answer
                }
            }, 5000);
            refreshIntervalId
    
           //return new AlexaModel().get().answer
           */
    }
}
exports.AlexaModel = AlexaModel;
exports.default = new AlexaModel();
//# sourceMappingURL=alexaModel.js.map