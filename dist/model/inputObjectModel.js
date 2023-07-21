"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
class InputObjectModel {
    constructor() { }
    //apesar de ser um objeto só (inputObject), dividi em dois (Resolved e Awiting),
    // pois em um cenário onde existem muitas requisições,
    // concorrer pesquisa de objetos aguardando resposta com objetos já resolvidos,
    //pode gerar um gargalo
    ///
    set(elementToSave) {
        database_1.default.setData(`input/awaiting/${elementToSave.id}`, elementToSave);
        return database_1.default.getData(`input/awaiting/${elementToSave.id}`);
    }
    setResolved(elementToUpdate) {
        database_1.default.delete(`input/awaiting/${elementToUpdate.id}`);
        database_1.default.setData(`input/resolved/${elementToUpdate.id}`, elementToUpdate);
        database_1.default.getData(`input/resolved/${elementToUpdate.id}`);
        return elementToUpdate;
    }
    get(id) {
        if (id)
            return database_1.default.getData(`input/resolved/${id}`);
        return database_1.default.getData(`input/awaiting`);
    }
    getListAwaiting() {
        return database_1.default.getData("input/awaiting");
    }
    getListResolved() {
        return database_1.default.getData("input/resolved");
    }
}
exports.default = new InputObjectModel();
//# sourceMappingURL=inputObjectModel.js.map