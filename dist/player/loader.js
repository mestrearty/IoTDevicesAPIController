"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Loader {
    constructor() {
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
exports.Loader = Loader;
exports.default = new Loader();
//# sourceMappingURL=loader.js.map