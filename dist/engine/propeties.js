"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interatorModel_1 = require("../model/interatorModel");
const InteratorPSTInstanceModel_1 = require("../model/InteratorPSTInstanceModel");
class Properties {
    constructor() {
        this.myDataBase = './myDataBase.json';
    }
    tryToResume({ ...instance }, currentElementID, run) {
        let elementCanOccur = run.toOccur({ ...instance });
        if (elementCanOccur) {
            run.changePropetieByID(currentElementID, { ...instance }, 'status', 'occurring');
        }
    }
    tryToPause({ ...instance }, currentElementID, run) {
        if ({ ...instance }.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toPause == undefined)
            instance.currentInstance[`$`].circunstances = { toPause: "false" };
        let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toPause.replace(/["`]/g, "");
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = { type: { voiceRecognition: true } };
        function isFinished(id) {
            return false;
        }
        //evaluate 
        let isFatherRunning = false;
        let isEnableOrOccuring = false;
        const atualInstanceState = this.checkStatusByID({ ...instance }.currentInstance[`$`].id, instance);
        if (fatherID === 'none' || this.checkStatusByID(fatherID, instance) == 'occurring')
            isFatherRunning = true;
        if (atualInstanceState == 'enable' || atualInstanceState == 'occurring')
            isEnableOrOccuring = true;
        console.log({ circunstanceStringExpression, isFatherRunning, isEnableOrOccuring });
        return eval(circunstanceStringExpression) && isFatherRunning && isEnableOrOccuring;
    }
    tryToFinnish({ ...instance }, currentElementID, run) {
    }
    tryToLock({ ...instance }, currentElementID, run) {
        let elementCanOccur = run.toOccur({ ...instance });
        if (elementCanOccur == false) {
            run.changePropetieByID(currentElementID, { ...instance }, 'status', 'locked');
        }
    }
    tryToUnlock({ ...instance }, currentElementID, run) {
        let elementCanOccur = run.toOccur({ ...instance });
        if (elementCanOccur) {
            run.changePropetieByID(currentElementID, { ...instance }, 'status', 'paused');
        }
    }
    tryToOccur({ ...instance }, currentElementID, run) {
        let elementCanOccur = run.toOccur({ ...instance });
        if (elementCanOccur) {
            run.changePropetieByID(currentElementID, { ...instance }, 'status', 'occurring');
            run.engineFileSistenWatcher(run.startWatching, { ...instance });
            let tempExp = { ...instance };
            //if is an episode, have to set the right one
            if ({ ...instance }.currentInstance.episode) {
                for (let i in instance.currentInstance.episode) {
                    //tava aqui dando um jeito de iniciar os eps. Preciso salvar o novo status do ep
                    if ({ ...instance }.currentInstance.episode[i] && instance.currentInstance.episode[i][`$`].id == instance.episodeId) {
                        instance.currentInstance.episode[i][`$`].fatherID = instance.currentInstance[`$`].id;
                        tempExp.currentInstance = instance.currentInstance.episode[i];
                        run.startWatching(tempExp); //problemas para rodar de forma assincrona
                        return;
                    }
                }
            }
            //verifica se tem um filho, qual o tipo de filho e o chama
            let elementType = undefined;
            if ({ ...instance }.currentInstance.experience)
                elementType = 'experience';
            else if ({ ...instance }.currentInstance.sequence)
                elementType = 'sequence';
            else if ({ ...instance }.currentInstance.media)
                elementType = "media";
            else if ({ ...instance }.currentInstance.sensorialeffect)
                elementType = "sensorialeffect";
            else if ({ ...instance }.currentInstance.decisionpoint)
                elementType = "decisionpoint";
            if ({ ...instance }.currentInstance[elementType]) {
                for (let i in instance.currentInstance[elementType]) {
                    instance.currentInstance[elementType][i][`$`].fatherID = instance.currentInstance[`$`].id;
                    tempExp.currentInstance = instance.currentInstance[elementType][i];
                    run.startWatching(tempExp);
                }
            }
        }
    }
    checkStatusByID(id, instance) {
        let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId);
        let status = 'notFound';
        //Find if has the id on pst and if is ocurring
        if (pstInstance.pst[`$`].id == id)
            status = pstInstance.pst[`$`].status;
        for (let i in pstInstance.pst.episode) {
            if (pstInstance.pst.episode[i][`$`].id == id)
                status = pstInstance.pst.episode[i][`$`].status;
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstInstance.pst.episode[i].experience[j][`$`].id == id)
                    status = pstInstance.pst.episode[i].experience[j][`$`].status;
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == id)
                        status = pstInstance.pst.episode[i].experience[j].sequence[k][`$`].status;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].id == id)
                            status = pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].status;
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id == id)
                            status = pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].status;
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].id == id)
                            status = pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].status;
                    }
                }
            }
        }
        if (status == 'none')
            status = 'enable';
        return status;
    }
    changePropetieByID(id, recivedInstance, propertie, value) {
        let instance = { ...recivedInstance };
        let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId);
        //Find if has the id on pst and if is ocurring
        if (pstInstance.pst[`$`].id == id)
            pstInstance.pst[`$`][propertie] = value;
        for (let i in pstInstance.pst.episode) {
            if (pstInstance.pst.episode[i][`$`].id == id)
                pstInstance.pst.episode[i][`$`][propertie] = value;
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstInstance.pst.episode[i].experience[j][`$`].id == id)
                    pstInstance.pst.episode[i].experience[j][`$`][propertie] = value;
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == id)
                        pstInstance.pst.episode[i].experience[j].sequence[k][`$`][propertie] = value;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media)
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].id == id)
                            pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`][propertie] = value;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint)
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id == id)
                            pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`][propertie] = value;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect)
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].id == id)
                            pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`][propertie] = value;
                }
            }
        }
        console.log("Alterando propriedade", { propertie, value });
        InteratorPSTInstanceModel_1.default.setInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId, instance.pstInstance.pst);
    }
}
exports.Properties = Properties;
exports.default = new Properties();
//# sourceMappingURL=propeties.js.map