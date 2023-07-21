"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const InteratorPSTInstanceModel_1 = require("./InteratorPSTInstanceModel");
class AuraModel extends InteratorPSTInstanceModel_1.InteratorPSTInstanceModel {
    constructor() {
        super();
    }
    set(interatorId, elementToSave) {
        const index = database_1.default.getArrayIndex('interators', interatorId);
        elementToSave = { ...this.get(interatorId), ...elementToSave };
        console.log(elementToSave);
        database_1.default.setData(`interators[${index}]/aura`, elementToSave);
    }
    get(interatorId) {
        const dataBase = database_1.default.getData("interators");
        let retorno = { error: 404, msg: "Id Not found" };
        dataBase.forEach(element => {
            if (element.id == interatorId)
                retorno = element.aura;
        });
        return retorno;
    }
}
exports.AuraModel = AuraModel;
exports.default = new AuraModel();
//# sourceMappingURL=auraModel.js.map