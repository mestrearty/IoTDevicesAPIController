"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interatorModel_1 = require("../model/interatorModel");
const properties_1 = require("./properties");
const device_1 = require("./device");
const mulsemidia_1 = require("./mulsemidia");
const collorTerminal_1 = require("./collorTerminal");
class Circunstance {
    constructor() {
        this.myDataBase = './myDataBase.json';
    }
    startWatching(currentInstance) {
        let instance = { ...currentInstance };
        if (instance.initialInstance) {
            delete instance.initialInstance;
        }
        //se for uma instancia de pst ela vira indefinida
        if (instance.currentInstance == undefined) {
            instance.currentInstance = instance.pstInstance.pst;
            instance.currentInstance[`$`].id = instance.pstInstance.pst[`$`].id;
            instance.currentInstance[`$`].fatherID = 'none';
        }
        //se não houver status definido, subentende-se que é enable
        if (instance.currentInstance[`$`].status == undefined)
            instance.currentInstance[`$`].status = "enable";
        //console.log({ id: instance.currentInstance[`$`].id })
        //exibindo quem está sendo executado, e o pai
        collorTerminal_1.default.initEngineColor("| Iniciando na engine: " + instance.currentInstance[`$`].id + " Meu Pai:" + instance.currentInstance[`$`].fatherID);
        new Circunstance().engineFileSistenWatcher(new Circunstance().tryToChangeStatus, { ...instance });
    }
    tryToChangeStatus({ ...instance }) {
        const circunstance = new Circunstance();
        //pegando status
        const currentElementID = instance.currentInstance[`$`].id;
        let atualStatus = properties_1.default.checkStatusByID(currentElementID, instance);
        if (atualStatus == undefined) {
            instance.currentInstance[`$`].status = 'enable';
        }
        console.log("\x1b[36m%s\x1b[0m", `| Sou: ${currentElementID} Status INICIAL:  ${atualStatus}`);
        properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', atualStatus);
        if (atualStatus == 'enable') {
            circunstance.tryToOccur({ ...instance }, currentElementID);
            circunstance.tryToFinnish({ ...instance }, currentElementID);
        }
        if (atualStatus == 'occurring') {
            // circunstance.tryToPause({ ...instance }, currentElementID)
            circunstance.tryToLock({ ...instance }, currentElementID);
            circunstance.tryToFinnish({ ...instance }, currentElementID);
        }
        if (atualStatus == 'locked') {
            //  circunstance.tryToUnlock({ ...instance }, currentElementID)
        }
        if (atualStatus == 'paused') {
            //  circunstance.tryToResume({ ...instance }, currentElementID, false)
        }
        if (atualStatus == 'toResume') {
            //  circunstance.tryToResume({ ...instance }, currentElementID, true)
        }
        atualStatus = properties_1.default.checkStatusByID(currentElementID, instance);
        console.log("\x1b[36m%s\x1b[0m", `| Sou: ${currentElementID} Status ATUAL:  ${atualStatus}`);
    }
    toLock({ ...instance }) {
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = device_1.default.check();
        function isFinished(id) {
            if (properties_1.default.checkStatusByID(id, { ...instance }) == 'finished')
                return true;
            else
                return false;
        }
        //evaluate 
        let isFatherRunning = false;
        let isEnableOrOccuring = false;
        const atualInstanceState = properties_1.default.checkStatusByID({ ...instance }.currentInstance[`$`].id, instance);
        if (fatherID === 'none' || properties_1.default.checkStatusByID(fatherID, instance) == 'occurring')
            isFatherRunning = true;
        if (atualInstanceState == 'enable' || atualInstanceState == 'occurring')
            isEnableOrOccuring = true;
        if (atualInstanceState == 'occurring' && properties_1.default.checkStatusByID(fatherID, instance) == 'locked')
            return true;
        //console.log({ circunstanceStringExpression, isFatherRunning, isEnableOrOccuring })
        if ({ ...instance }.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toOccur == undefined)
            instance.currentInstance[`$`].circunstances = { toOccur: "true" };
        let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toOccur.replace(/["`#]/g, "");
        return !(eval(circunstanceStringExpression) && isFatherRunning && isEnableOrOccuring);
    }
    toOccur({ ...instance }) {
        if ({ ...instance }.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toOccur == undefined)
            instance.currentInstance[`$`].circunstances = { toOccur: "true" };
        let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toOccur.replace(/["`#]/g, "");
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = device_1.default.check();
        function isFinished(id) {
            if (properties_1.default.checkStatusByID(id, { ...instance }) == 'finished')
                return true;
            else
                return false;
        }
        //evaluate 
        let isFatherRunning = false;
        let isEnableOrOccuring = false;
        const atualInstanceState = properties_1.default.checkStatusByID({ ...instance }.currentInstance[`$`].id, instance);
        if (fatherID === 'none' || properties_1.default.checkStatusByID(fatherID, instance) == 'occurring')
            isFatherRunning = true;
        if (atualInstanceState == 'enable' || atualInstanceState == 'occurring')
            isEnableOrOccuring = true;
        //console.log({ circunstanceStringExpression: eval(circunstanceStringExpression), isFatherRunning, isEnableOrOccuring })
        return eval(circunstanceStringExpression) && isFatherRunning && isEnableOrOccuring;
    }
    toResume({ ...instance }, interatorCalled) {
        let circunstanceStringExpression = '';
        if (instance.currentInstance[`$`].circunstances.toResume === true
            || instance.currentInstance[`$`].circunstances.toResume === false) {
            instance.currentInstance[`$`].circunstances.toResume =
                instance.currentInstance[`$`].circunstances.toResume.toString();
        }
        if (instance.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toResume == undefined) {
            instance.currentInstance[`$`].circunstances = { toResume: interatorCalled };
        }
        else {
            circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toResume.replace(/["`]/g, "");
        }
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = device_1.default.check();
        //evaluate 
        let isFatherRunning = false;
        let isPausedOrWaittingToResume = false;
        const atualInstanceState = properties_1.default.checkStatusByID({ ...instance }.currentInstance[`$`].id, instance);
        if (fatherID === 'none' || properties_1.default.checkStatusByID(fatherID, instance) == 'occurring')
            isFatherRunning = true;
        if (atualInstanceState == 'paused' || atualInstanceState == 'toResume')
            isPausedOrWaittingToResume = true;
        //console.log({ circunstanceStringExpression, interatorCalled, isFatherRunning, isPausedOrWaittingToResume })
        return (eval(circunstanceStringExpression) || interatorCalled) && isFatherRunning && isPausedOrWaittingToResume;
    }
    toUnlock({ ...instance }) {
        let circunstanceStringExpression = '';
        if (instance.currentInstance[`$`].circunstances.toOccur === true
            || instance.currentInstance[`$`].circunstances.toOccur === false) {
            instance.currentInstance[`$`].circunstances.toOccur =
                instance.currentInstance[`$`].circunstances.toOccur.toString();
        }
        if (instance.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toOccur == undefined) {
            instance.currentInstance[`$`].circunstances = { toOccur: "true" };
        }
        else {
            circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toOccur.replace(/["`]/g, "");
        }
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = device_1.default.check();
        function isFinished(id) {
            if (properties_1.default.checkStatusByID(id, { ...instance }) == 'finished')
                return true;
            else
                return false;
        }
        //evaluate 
        //evaluate 
        let isFatherRunning = false;
        let isLocked = false;
        const atualInstanceState = properties_1.default.checkStatusByID({ ...instance }.currentInstance[`$`].id, instance);
        if (fatherID === 'none' || properties_1.default.checkStatusByID(fatherID, instance) == 'occurring')
            isFatherRunning = true;
        if (atualInstanceState == 'locked')
            isLocked = true;
        //console.log({ circunstanceStringExpression, isFatherRunning, isLocked })
        return eval(circunstanceStringExpression) && isFatherRunning && isLocked;
    }
    toPause({ ...instance }) {
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = device_1.default.check();
        function isFinished(id) {
            if (properties_1.default.checkStatusByID(id, { ...instance }) == 'finished')
                return true;
            else
                return false;
        }
        //evaluate 
        let isFatherRunning = false;
        let isOccurring = false;
        let isFatherPaused = false;
        const atualInstanceState = properties_1.default.checkStatusByID({ ...instance }.currentInstance[`$`].id, instance);
        if (fatherID === 'none' || properties_1.default.checkStatusByID(fatherID, instance) == 'occurring')
            isFatherRunning = true;
        if (properties_1.default.checkStatusByID(fatherID, instance) == 'paused')
            isFatherPaused = true;
        if (atualInstanceState == 'occurring')
            isOccurring = true;
        // console.log({ isFatherPaused, isFatherRunning, isOccurring })
        if (isFatherPaused && isOccurring)
            return true;
        if ({ ...instance }.currentInstance[`$`].circunstances != undefined && instance.currentInstance[`$`].circunstances.toPause != undefined) {
            let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toPause.replace(/["`]/g, "");
            return eval(circunstanceStringExpression) && isFatherRunning && isOccurring;
        }
        return false;
    }
    toFinish({ ...instance }) {
        const fatherID = instance.currentInstance[`$`].fatherID;
        //get interator data
        const interator = interatorModel_1.default.get({ ...instance }.interatorId);
        //destruct interator data in variables to check
        const { aura, properties } = interator;
        const device = device_1.default.check();
        function isFinished(id) {
            if (properties_1.default.checkStatusByID(id, { ...instance }) == 'finished')
                return true;
            else
                return false;
        }
        //verifica se todos os filhos já foram finalizados ou estão desabilitados
        function haveAllSonEnds({ ...instance }) {
            //verifica se tem um filho, qual o tipo de filho e o chama
            let SonElementType = undefined;
            let status;
            if (instance.currentInstance == undefined)
                return undefined;
            if (instance.currentInstance.episode)
                SonElementType = 'episode';
            else if (instance.currentInstance.experience)
                SonElementType = 'experience';
            else if (instance.currentInstance.sequence)
                SonElementType = 'sequence';
            else if (instance.currentInstance.media)
                SonElementType = 'media';
            else if (instance.currentInstance.sensorialeffect)
                SonElementType = 'sensorialeffect';
            else if (instance.currentInstance.decisionpoint)
                SonElementType = 'decisionpoint';
            for (let i in instance.currentInstance[SonElementType]) {
                if (instance.currentInstance[SonElementType][i][`$`])
                    status = properties_1.default.checkStatusByID(instance.currentInstance[SonElementType][i][`$`].id, instance);
                if (status == 'occurring' || status == 'enable' || status == 'paused' || status == 'locked')
                    return false;
            }
            return true;
        }
        let allSonsFinishedOrDisabled = haveAllSonEnds({ ...instance });
        //evaluate 
        let fatherStatus = properties_1.default.checkStatusByID(fatherID, instance);
        const instanceCurrentStatus = properties_1.default.checkStatusByID(instance.currentInstance[`$`].id, instance);
        console.log({ allSonsFinishedOrDisabled, fatherStatus });
        if (fatherStatus == 'finished' && (instanceCurrentStatus == 'occurring' || instanceCurrentStatus == 'enable' || instanceCurrentStatus == 'paused' || instanceCurrentStatus == 'locked'))
            return true;
        if ({ ...instance }.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toFinish == undefined)
            instance.currentInstance[`$`].circunstances = { toFinish: "false" };
        let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toFinish.replace(/["`#]/g, "");
        //console.log({ circunstanceStringExpression: eval(circunstanceStringExpression), isFatherRunning, allSonsFinishedOrDisabled })
        return ((eval(circunstanceStringExpression) || allSonsFinishedOrDisabled));
    }
    tryToFinnish({ ...instance }, currentElementID) {
        let elementCanFinish = new Circunstance().toFinish({ ...instance });
        if (elementCanFinish) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'finished');
        }
    }
    tryToPause({ ...instance }, currentElementID) {
        let elementCanPause = new Circunstance().toPause({ ...instance });
        if (elementCanPause) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'paused');
            //Properties.changeSonsByFatherId(currentElementID, { ...instance }, 'status', 'paused')
        }
    }
    tryToResume({ ...instance }, currentElementID, engineCalled) {
        let elementCanResume = new Circunstance().toResume({ ...instance }, engineCalled);
        if (elementCanResume) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'occurring');
        }
    }
    tryToLock({ ...instance }, currentElementID) {
        let elementCanLock = new Circunstance().toLock({ ...instance });
        if (elementCanLock) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'locked');
        }
    }
    tryToUnlock({ ...instance }, currentElementID) {
        let elementCanUnlock = new Circunstance().toUnlock({ ...instance });
        if (elementCanUnlock) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'paused');
        }
    }
    tryToOccur({ ...instance }, currentElementID) {
        const circunstance = new Circunstance();
        let elementCanOccur = circunstance.toOccur({ ...instance });
        //console.log({ elementCanOccur })
        if (elementCanOccur) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'occurring');
            let tempExp = { ...instance };
            //if is an episode, have to set the right one
            if (instance.currentInstance.episode) {
                for (let i in instance.currentInstance.episode) {
                    if (instance.currentInstance.episode[i] && instance.currentInstance.episode[i][`$`].id == instance.episodeId) {
                        instance.currentInstance.episode[i][`$`].fatherID = instance.currentInstance[`$`].id;
                        tempExp.currentInstance = instance.currentInstance.episode[i];
                        new Circunstance().startWatching({ ...tempExp }); //problemas para rodar de forma assincrona
                        return;
                    }
                }
            }
            //verifica se tem um filho, qual o tipo de filho e o chama
            let elementType = undefined;
            if (instance.currentInstance.experience)
                elementType = 'experience';
            else if (instance.currentInstance.sequence)
                elementType = 'sequence';
            else if (instance.currentInstance.media)
                elementType = "media";
            else if (instance.currentInstance.sensorialeffect)
                elementType = "sensorialeffect";
            else if (instance.currentInstance.decisionpoint)
                elementType = "decisionpoint";
            else if (instance.currentInstance.option)
                return;
            else {
                const prevBrother = properties_1.default.checkStatusByID(instance.currentInstance[`$`].prev, { ...instance });
                if (prevBrother == "notFound" || prevBrother == 'disabled' || prevBrother == 'finished') {
                    mulsemidia_1.default.runMedia({ ...instance });
                }
            }
            for (let i in instance.currentInstance[elementType]) {
                instance.currentInstance[elementType][i][`$`].fatherID = instance.currentInstance[`$`].id;
                tempExp.currentInstance = { ...instance.currentInstance[elementType][i] };
                if (elementType == 'experience' || elementType == 'sequence') {
                    circunstance.startWatching({ ...tempExp });
                }
                else {
                    const prevBrother = instance.currentInstance[elementType][i][`$`].prev;
                    if (prevBrother == '' || prevBrother == "" || prevBrother == undefined || prevBrother == {} || /^\s*$/.test(prevBrother) || prevBrother.trim() || prevBrother.length === 0) {
                        circunstance.startWatching({ ...tempExp });
                    }
                }
            }
        }
    }
    async engineFileSistenWatcher(action, instance) {
        //console.log(`Watching for file changes on ${this.myDataBase}`);
        /*let fsWait: any = false;
        fs.watch(this.myDataBase, (event, filename) => {
            if (filename) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, 1000);
            }
            if (instance.currentInstance != undefined &&(instance.currentInstance[`$`].status == "finished" || instance.currentInstance[`$`].status == "disabled")) {
                fsWait.close()
                return
            }
            action({ ...instance })
        });*/
        let refreshIntervalId = setInterval(function () {
            //console.log("Check circunstances");
            if (instance.currentInstance != undefined && (instance.currentInstance[`$`].status == "finished" || instance.currentInstance[`$`].status == "disabled")) {
                clearInterval(refreshIntervalId);
                return;
            }
            action({ ...instance });
        }, 5000);
        refreshIntervalId;
    }
}
exports.Circunstance = Circunstance;
exports.default = new Circunstance();
/*
canKeepOccuring({...instance}) {

let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toOccur.replace(/["`]/g, "");

const fatherID = instance.currentInstance[`$`].fatherID

//get interator data
const interator = interatorModel.get({...instance}.interatorId)
//destruct interator data in variables to check
const { aura, properties } = interator
const device = Device.check()
const device = { type: { voiceRecognition: true } }

function isFinished(id) {
    return false
}

//evaluate
let imOkToRun = false
const atualInstanceState = StatusChanger.checkStatusByID({...instance}.currentInstance[`$`].id, instance)
const fatherState = StatusChanger.checkStatusByID(fatherID, instance)

if ((fatherState == 'occurring' || fatherID == 'none')
    && (atualInstanceState == 'occurring' || atualInstanceState == 'locked'))
    imOkToRun = true
console.log({ fatherID, fatherState })
console.log({ circunstanceStringExpression, imOkToRun })
return eval(circunstanceStringExpression) && imOkToRun
}
*/ 
//# sourceMappingURL=circunstance.js.map