"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
class InteratorPSTInstance {
    constructor() {
    }
    set(id, elementToSave) {
        database_1.default.setData(`interator/${id}/aura`, elementToSave);
    }
    get(id) {
        return database_1.default.getData("aura")[id]["aura"];
    }
}
exports.default = new InteratorPSTInstance();
//# sourceMappingURL=InteratorPSTInstance.js.map