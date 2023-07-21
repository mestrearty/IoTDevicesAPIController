"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const parser = require("xml2json");
class PlayerModel {
    constructor() { }
    setAwaiting(id, elementToSave) {
        database_1.default.setData(`input/awaiting${id}`, elementToSave);
    }
    setResolved(id, elementToSave) {
        database_1.default.setData(`input/resolved${id}`, elementToSave);
    }
    getAwaiting(pstId) {
        console.log(database_1.default.getData("input/awaiting"));
        return database_1.default.getData("input/awaiting")[pstId];
    }
    get(pstId) {
        console.log(database_1.default.getData("input/resolved"));
        return database_1.default.getData("input/resolved")[pstId];
    }
    getAwaitingList() {
        return database_1.default.getData("input");
    }
    getList() {
        return database_1.default.getData("input");
    }
    loadNewPST(xml) {
        const newPst = this.decoderXmlToObject(xml);
        if (newPst) {
            return newPst;
        }
    }
    decoderXmlToObject(xml) {
        try {
            let pst = parser.toJson(xml);
            pst = JSON.parse(pst);
            return pst;
        }
        catch (e) {
            console.log(e);
            return { error: 401, msg: e };
        }
    }
}
exports.default = new PlayerModel();
//# sourceMappingURL=InputResolved.js.map