"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const properties_1 = require("./modules/properties");
const mulsemidia_1 = require("./modules/mulsemidia");
const colorTerminal_1 = require("../utils/colorTerminal");
const circunstances_1 = require("./modules/circunstances");
const mulsemidia_2 = require("./modules/mulsemidia");
class CircunstanceEngine extends circunstances_1.circunstances {
    constructor() {
        super(...arguments);
        this.myDataBase = './myDataBase.json';
    }
    super() {
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
        const atualStatus = properties_1.default.checkStatusByID(instance.currentInstance[`$`].id, instance);
        if (atualStatus == 'disabled')
            return;
        colorTerminal_1.default.initEngineColor("Iniciando na engine: " + instance.currentInstance[`$`].id + " Meu Pai:" + instance.currentInstance[`$`].fatherID);
        new CircunstanceEngine().engineFileSistenWatcher(new CircunstanceEngine().tryToChangeStatus, { ...instance });
    }
    tryToChangeStatus({ ...instance }) {
        const circunstance = new CircunstanceEngine();
        //pegando status
        const currentElementID = instance.currentInstance[`$`].id;
        let atualStatus = properties_1.default.checkStatusByID(currentElementID, instance);
        if (atualStatus == undefined) {
            instance.currentInstance[`$`].status = 'enable';
        }
        properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', atualStatus);
        switch (atualStatus) {
            case 'enable':
                circunstance.tryToOccur({ ...instance }, currentElementID);
                break;
            case 'occurring':
                circunstance.tryToPause({ ...instance }, currentElementID);
                break;
            case 'locked':
                circunstance.tryToUnlock({ ...instance }, currentElementID);
                break;
            case 'paused':
                circunstance.tryToResume({ ...instance }, currentElementID);
                break;
        }
        //atualizando e tentando travar
        atualStatus = properties_1.default.checkStatusByID(currentElementID, instance);
        if (atualStatus == 'occurring')
            circunstance.tryToLock({ ...instance }, currentElementID);
        //atualizando e tentando finalizar
        atualStatus = properties_1.default.checkStatusByID(currentElementID, instance);
        switch (atualStatus) {
            case 'enable':
                circunstance.tryToFinnish({ ...instance }, currentElementID);
                break;
            case 'occurring':
                circunstance.tryToFinnish({ ...instance }, currentElementID);
                break;
        }
    }
    tryToOccur({ ...instance }, currentElementID) {
        const circunstance = new CircunstanceEngine();
        let elementCanOccur = circunstance.toOccur({ ...instance });
        //console.log({ elementCanOccur })
        if (elementCanOccur) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'occurring');
            colorTerminal_1.default.consoleMsgStatus(currentElementID, 'occurring');
            let tempExp = { ...instance };
            //if is an episode, have to set the right one
            if (instance.currentInstance.episode) {
                for (let i in instance.currentInstance.episode) {
                    if (instance.currentInstance.episode[i] && instance.currentInstance.episode[i][`$`].id == instance.episodeId) {
                        instance.currentInstance.episode[i][`$`].fatherID = instance.currentInstance[`$`].id;
                        tempExp.currentInstance = instance.currentInstance.episode[i];
                        new CircunstanceEngine().startWatching({ ...tempExp }); //problemas para rodar de forma assincrona
                        return;
                    }
                }
            }
            function runInstance(instance, elementType) {
                for (let i in instance.currentInstance[elementType]) {
                    instance.currentInstance[elementType][i][`$`].fatherID = instance.currentInstance[`$`].id;
                    tempExp.currentInstance = { ...instance.currentInstance[elementType][i] };
                    if (elementType == 'experience' || elementType == 'sequence') {
                        circunstance.startWatching({ ...tempExp });
                    }
                    else {
                        const prevBrother = instance.currentInstance[elementType][i][`$`].prev;
                        if (prevBrother == '' || prevBrother == "" || prevBrother == undefined) {
                            mulsemidia_2.default.runMulsemidiaObject({ ...tempExp });
                        }
                    }
                }
            }
            //verifica se tem um filho, qual o tipo de filho e o chama
            if (instance.currentInstance.experience)
                runInstance({ ...instance }, "experience");
            else if (instance.currentInstance.sequence)
                runInstance({ ...instance }, "sequence");
            else if (instance.currentInstance.sensorialeffect || instance.currentInstance.decisionpoint || instance.currentInstance.media || instance.currentInstance.option) {
                if (instance.currentInstance.media)
                    runInstance({ ...instance }, "media");
                if (instance.currentInstance.sensorialeffect)
                    runInstance({ ...instance }, "sensorialeffect");
                if (instance.currentInstance.decisionpoint) {
                    runInstance({ ...instance }, "decisionpoint");
                }
                if (instance.currentInstance.option)
                    return;
            }
            else {
                const prevBrother = properties_1.default.checkStatusByID(instance.currentInstance[`$`].prev, { ...instance });
                if (prevBrother == "notFound" || prevBrother == 'disabled' || prevBrother == 'finished') {
                    mulsemidia_1.default.runMulsemidiaObject({ ...instance });
                }
                return;
            }
        }
    }
    tryToFinnish({ ...instance }, currentElementID) {
        let elementCanFinish = new CircunstanceEngine().toFinish({ ...instance });
        if (elementCanFinish) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'finished');
            colorTerminal_1.default.consoleMsgStatus(currentElementID, 'finished');
        }
    }
    tryToPause({ ...instance }, currentElementID) {
        let elementCanPause = new CircunstanceEngine().toPause({ ...instance });
        if (elementCanPause) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'paused');
            colorTerminal_1.default.consoleMsgStatus(currentElementID, 'paused');
            //Properties.changeSonsByFatherId(currentElementID, { ...instance }, 'status', 'paused')
        }
    }
    tryToResume({ ...instance }, currentElementID) {
        let elementCanResume = new CircunstanceEngine().toResume({ ...instance });
        if (elementCanResume) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'occurring');
            colorTerminal_1.default.consoleMsgStatus(currentElementID, 'resumed');
        }
    }
    tryToLock({ ...instance }, currentElementID) {
        let elementCanLock = new CircunstanceEngine().toLock({ ...instance });
        if (elementCanLock) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'locked');
            colorTerminal_1.default.consoleMsgStatus(currentElementID, 'locked');
        }
    }
    tryToUnlock({ ...instance }, currentElementID) {
        let elementCanUnlock = new CircunstanceEngine().toUnlock({ ...instance });
        if (elementCanUnlock) {
            properties_1.default.changePropetieByID(currentElementID, { ...instance }, 'status', 'paused');
            colorTerminal_1.default.consoleMsgStatus(currentElementID, 'unlocked');
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
        }, 1000);
        refreshIntervalId;
    }
}
exports.CircunstanceEngine = CircunstanceEngine;
exports.default = new CircunstanceEngine();
//# sourceMappingURL=circunstanceEngine.js.map