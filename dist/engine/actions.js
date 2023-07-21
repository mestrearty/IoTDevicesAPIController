"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circunstanceEngine_1 = require("./circunstanceEngine");
const properties_1 = require("./properties");
const colorTerminal_1 = require("./colorTerminal");
class Runner {
    constructor() { }
    start(instance) {
        //let episodeInstances = instance.pstInstance.pst[`episode`]
        // const episode = this.getEpisodeToRun(episodeInstances, instance.episodeId)
        try {
            colorTerminal_1.default.actionColor("Starting... " + instance.pstInstanceId);
            circunstanceEngine_1.default.startWatching(instance);
        }
        catch (e) {
            console.log(e);
        }
    }
    stop(id, instance) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, instance);
            if (atualStatus == 'enable' || atualStatus == 'locked' || atualStatus == 'paused' || atualStatus == 'occurring') {
                properties_1.default.changePropetieByID(id, { ...instance }, 'status', 'finished');
                colorTerminal_1.default.actionColor("Stoped -> ID: " + id + " - " + instance.pstInstanceId);
                //Properties.changeSonsByFatherId(id, { ...instance }, 'status', 'finished')
                return { action: "stoped" };
            }
            return { action: "cannot stop", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    lock(id, instance) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, instance);
            if (atualStatus == 'occurring') {
                properties_1.default.changePropetieByID(id, instance, 'status', 'locked');
                colorTerminal_1.default.actionColor("Locked -> ID: " + id + " - " + instance.pstInstanceId);
                return { action: "locked" };
            }
            return { action: "cannot stop", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    pause(id, instance) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, instance);
            if (atualStatus == 'occurring') {
                properties_1.default.changePropetieByID(id, instance, 'status', 'paused');
                colorTerminal_1.default.actionColor("Paused -> ID: " + id + " - " + instance.pstInstanceId);
                return { action: "paused" };
            }
            return { action: "cannot pause", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    abort(id, { ...instance }) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, { ...instance });
            if (atualStatus == 'occurring' || atualStatus == 'locked' || atualStatus == 'paused') {
                properties_1.default.resetFatherAndSonsByFatherId(id, instance.interatorId, instance.pstInstanceId);
                colorTerminal_1.default.actionColor("Aborted -> ID: " + id + " - " + instance.pstInstanceId);
                return { action: "aborted" };
            }
            return { action: "cannot abort", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    enable(id, { ...instance }) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, { ...instance });
            if (atualStatus == 'disabled' || atualStatus == 'finished') {
                properties_1.default.resetFatherAndSonsByFatherId(id, instance.interatorId, instance.pstInstanceId);
                properties_1.default.changePropetieByID(id, { ...instance }, 'status', 'enable');
                colorTerminal_1.default.actionColor("Enabled -> ID: " + id + " - " + instance.pstInstanceId);
                return { action: "enabled" };
            }
            return { action: "cannot enable", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    disable(id, instance) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, instance);
            if (atualStatus == 'occurring' || atualStatus == 'locked' || atualStatus == 'paused' || atualStatus == 'enable') {
                properties_1.default.changeSonsByFatherId(id, { ...instance }, 'status', 'disabled');
                colorTerminal_1.default.actionColor("Disabled -> ID: " + id + " - " + instance.pstInstanceId);
                return { action: "disabled" };
            }
            return { action: "cannot disable", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    resume(id, instance) {
        try {
            const atualStatus = properties_1.default.checkStatusByID(id, instance);
            if (atualStatus == 'paused') {
                properties_1.default.changePropetieByID(id, instance, 'status', 'toResume');
                colorTerminal_1.default.actionColor("Resumed -> ID: " + id + " - " + instance.pstInstanceId);
                return { action: "resumed" };
            }
            return { action: "cannot resume", atualStatus };
        }
        catch (e) {
            console.log(e);
        }
    }
    getEpisodeToRun(episodeInstances, episodeId) {
        let episodeToReturn;
        for (let key in episodeInstances) {
            const episode = episodeInstances[key];
            const episodeParams = episode[`$`];
            if (episodeParams.id == episodeId)
                episodeToReturn = episode;
        }
        return episodeToReturn;
    }
}
exports.Runner = Runner;
exports.default = new Runner();
//# sourceMappingURL=actions.js.map