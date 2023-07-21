"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const uuid_1 = require("uuid");
const pervasiveStoryTellingModel_1 = require("./pervasiveStoryTellingModel");
class InteratorPSTInstanceModel {
    constructor() {
    }
    setInteratorPSTInstanceModel(interatorId, instanceId, elementToSave) {
        const interatorIndex = database_1.default.getArrayIndex('interators', interatorId);
        const instanceIndex = database_1.default.getArrayIndex(`interators[${interatorIndex}]/aura/instances`, instanceId);
        const atualInstance = database_1.default.getData(`interators[${interatorIndex}]/aura/instances[${instanceIndex}]`);
        atualInstance.pst = { ...atualInstance.pst, ...elementToSave };
        elementToSave = { ...atualInstance };
        database_1.default.setData(`interators[${interatorIndex}]/aura/instances[${instanceIndex}]`, { ...elementToSave });
        return this.getInteratorPSTInstanceModel(interatorId, instanceId);
    }
    setNEWInteratorPSTInstanceModel(interatorId, pstId) {
        const pst = pervasiveStoryTellingModel_1.default.get(pstId);
        const instanceId = uuid_1.v4();
        const newInstance = {
            id: instanceId,
            pst: pst,
            initialInstance: pst
        };
        const interatorIndex = database_1.default.getArrayIndex('interators', interatorId);
        database_1.default.setDataArray(`interators[${interatorIndex}]/aura/instances[]`, newInstance);
        return instanceId;
    }
    getInteratorPSTInstanceListModel(interatorId) {
        const interatorIndex = database_1.default.getArrayIndex('interators', interatorId);
        return database_1.default.getData(`interators[${interatorIndex}]/aura/instances`);
    }
    getInteratorPSTInstanceModel(interatorId, instanceId) {
        const interatorIndex = database_1.default.getArrayIndex('interators', interatorId);
        const instanceIndex = database_1.default.getArrayIndex(`interators[${interatorIndex}]/aura/instances`, instanceId);
        return database_1.default.getData(`interators[${interatorIndex}]/aura/instances[${instanceIndex}]`);
    }
    getElementById(interatorId, instanceId, elementId) {
        const data = database_1.default.getData("interators")[interatorId]["aura"]["instance"][instanceId];
    }
}
exports.InteratorPSTInstanceModel = InteratorPSTInstanceModel;
exports.default = new InteratorPSTInstanceModel();
//# sourceMappingURL=InteratorPSTInstanceModel.js.map