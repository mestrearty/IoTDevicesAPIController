"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
class PropertiesInteratorModel {
    constructor() {
    }
    set(interatorId, elementToSave) {
        const interatorIndex = database_1.default.getArrayIndex('interators', interatorId);
        database_1.default.setData(`interators[${interatorIndex}]/properties`, elementToSave);
    }
    get(interatorId) {
        const dataBase = database_1.default.getData("interators");
        let retorno = { error: 404, msg: "Id Not found" };
        dataBase.forEach(element => {
            if (element.id == interatorId)
                retorno = element.properties;
        });
        return retorno;
    }
}
exports.default = new PropertiesInteratorModel();
//# sourceMappingURL=propertiesInteratorModel.js.map