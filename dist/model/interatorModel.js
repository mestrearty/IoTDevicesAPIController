"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
class InteratorModel {
    constructor() {
    }
    set(elementToSave) {
        const interator = this.get(elementToSave.id);
        console.log(interator);
        if (interator.error)
            database_1.default.setData(`interators[]`, elementToSave);
        else {
            const index = database_1.default.getArrayIndex('interators', interator.id);
            database_1.default.setData(`interators[${index}]`, elementToSave);
        }
    }
    get(interatorId) {
        const dataBase = database_1.default.getData("interators");
        let retorno = { error: 404, msg: "Id Not found" };
        dataBase.forEach(element => {
            if (element.id == interatorId)
                retorno = element;
        });
        return retorno;
    }
    getList() {
        return database_1.default.getData("interators");
    }
}
exports.default = new InteratorModel();
//# sourceMappingURL=interatorModel.js.map