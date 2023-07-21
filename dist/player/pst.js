"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("./loader");
class PervasiveStoryTelling extends loader_1.Loader {
    constructor() {
        super();
    }
    loadNewPST(xml) {
        const newPst = this.decoderXmlToObject(xml);
        return newPst;
    }
}
exports.PervasiveStoryTelling = PervasiveStoryTelling;
exports.default = new PervasiveStoryTelling;
//# sourceMappingURL=pst.js.map