import DataBase from "../utils/database";
import * as parser from "xml2json";
import database from "../utils/database";

class InputObjectModel {
  constructor() {}
  //apesar de ser um objeto só (inputObject), dividi em dois (Resolved e Awiting),
  // pois em um cenário onde existem muitas requisições,
  // concorrer pesquisa de objetos aguardando resposta com objetos já resolvidos,
  //pode gerar um gargalo
  ///
  set(elementToSave) {
    DataBase.setData(`input/awaiting/${elementToSave.id}`, elementToSave);
    return DataBase.getData(`input/awaiting/${elementToSave.id}`);
  }

  setResolved(elementToUpdate) {
    DataBase.delete(`input/awaiting/${elementToUpdate.id}`);
    DataBase.setData(`input/resolved/${elementToUpdate.id}`, elementToUpdate);
    DataBase.getData(`input/resolved/${elementToUpdate.id}`);
    return elementToUpdate
  }

  get(id?) {
    if (id) return DataBase.getData(`input/resolved/${id}`);
    return DataBase.getData(`input/awaiting`);
  }

  getListAwaiting() {
    return DataBase.getData("input/awaiting");
  }

  getListResolved() {
    return DataBase.getData("input/resolved");
  }
}
export default new InputObjectModel();
