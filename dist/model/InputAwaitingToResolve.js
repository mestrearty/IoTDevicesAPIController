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
        database_1.default.setDataArray(`input/awaiting/${elementToSave.id}`, elementToSave);
        return database_1.default.getData(`input/awaiting/${elementToSave.id}`);
    }
    setResolved(elementToUpdate) {
        database_1.default.getData(`input/resolved/${elementToUpdate.id}`);
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
//# sourceMappingURL=InputAwaitingToResolve.js.map