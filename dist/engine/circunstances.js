"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const properties_1 = require("./properties");
const device_1 = require("./device");
const interatorModel_1 = require("../model/interatorModel");
class circunstances {
    constructor() {
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
        //console.log({ allSonsFinishedOrDisabled, fatherStatus })
        if (fatherStatus == 'finished' && (instanceCurrentStatus == 'occurring' || instanceCurrentStatus == 'enable' || instanceCurrentStatus == 'paused' || instanceCurrentStatus == 'locked'))
            return true;
        if ({ ...instance }.currentInstance[`$`].circunstances == undefined || instance.currentInstance[`$`].circunstances.toFinish == undefined)
            instance.currentInstance[`$`].circunstances = { toFinish: "false" };
        let circunstanceStringExpression = instance.currentInstance[`$`].circunstances.toFinish.replace(/["`#]/g, "");
        //console.log({ circunstanceStringExpression: eval(circunstanceStringExpression), isFatherRunning, allSonsFinishedOrDisabled })
        return ((eval(circunstanceStringExpression) || allSonsFinishedOrDisabled));
    }
}
exports.circunstances = circunstances;
//# sourceMappingURL=circunstances.js.map