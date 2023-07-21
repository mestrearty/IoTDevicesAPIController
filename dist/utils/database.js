"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
class DataBase {
    constructor() {
        this.db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("myDataBase", true, false, "/"));
    }
    getData(dataElement) {
        return this.db.getData(`/${dataElement}`);
    }
    getDataById(dataElement, id) {
        return this.db.getData(`/${dataElement}`, id);
    }
    setData(saveRoute, data) {
        this.db.push(`/${saveRoute}`, data);
    }
    setDataArray(saveRoute, data) {
        this.db.push(`/${saveRoute}`, data, true);
    }
    getArrayIndex(route, id) {
        return this.db.getIndex(`/${route}`, id);
    }
    delete(route) {
        this.db.delete(`/${route}`);
    }
}
exports.DataBase = DataBase;
exports.default = new DataBase();
//# sourceMappingURL=database.js.map