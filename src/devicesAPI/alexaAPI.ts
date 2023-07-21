import DataBase from "../utils/database"

export class AlexaModel {
    constructor() {
    }

    setStatus(status) {
        DataBase.setData(`alexa/status`, { status })
    }

    setmsgToTalk(msgToTalk) {
        DataBase.setData(`alexa/msgToTalk`, { msgToTalk })
    }

    setAnswer(answer) {
        DataBase.setData(`alexa/status`, { "status": "answered" })
        DataBase.setData(`alexa/answer`, { answer })
    }

    get() {
        const status = DataBase.getData("alexa/status")
        const msgToTalk = DataBase.getData("alexa/msgToTalk")
        const answer = DataBase.getData("alexa/answer")
        return { status: status.status, msgToTalk: msgToTalk.msgToTalk, answer: answer.answer }
    }

    openRequest(msg) {
        new AlexaModel().setStatus("awaiting")
        new AlexaModel().setmsgToTalk(msg)
    }

    async verifyAnswer() {
        const awaitAnswer = new AlexaModel().get().status
        const alexaData = new AlexaModel().get()
        if (alexaData.status == 'answered') {
            return alexaData.answer
        }
        else {
            setTimeout(() => {
                console.log({ alexaData })
            }, 2000);
            return this.verifyAnswer()
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

export default new AlexaModel()