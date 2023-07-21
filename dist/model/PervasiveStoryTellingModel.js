"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const parser = require("xml2json");
class PlayerModel {
    constructor() {
    }
    set(id, elementToSave) {
        database_1.default.setData(`pst/${id}`, elementToSave);
    }
    get(pstId) {
        console.log(database_1.default.getData("pst"));
        return database_1.default.getData("pst")[pstId];
    }
    getList() {
        return database_1.default.getData("pst");
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
//# sourceMappingURL=pervasiveStoryTellingModel.js.map