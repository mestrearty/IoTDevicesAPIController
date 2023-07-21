import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

export class DataBase {
  protected db;
  constructor() {
    this.db = new JsonDB(new Config("myDataBase", true, false, "/"));
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

  delete(route){
    this.db.delete(`/${route}`)
  }
}

export default new DataBase();
