"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circunstanceEngine_1 = require("./circunstanceEngine");
const properties_1 = require("./properties");
class Mulsemidia {
    constructor() { }
    runMedia(mediaElement) {
        console.log("---------------------------------------------------------------------------");
        const nextElementId = mediaElement.currentInstance[`$`].next;
        const mediaId = mediaElement.currentInstance[`$`].id;
        console.log("-> Executando: ", mediaId);
        setTimeout(function () {
            console.log("-> Fim da Reprodução - ", mediaId);
            properties_1.default.changePropetieByID(mediaId, mediaElement, 'status', 'finished');
            if (nextElementId && nextElementId != "") {
                console.log("Chamando o próximo: ", nextElementId);
                let nextElementInstance = properties_1.default.getInstanceByID(nextElementId, mediaElement);
                mediaElement.currentInstance[`$`] = nextElementInstance;
                new circunstanceEngine_1.CircunstanceEngine().engineFileSistenWatcher(new Mulsemidia().runMedia, mediaElement);
            }
        }, 5000);
    }
}
exports.Mulsemidia = Mulsemidia;
exports.default = new Mulsemidia();
//# sourceMappingURL=mulsemidia.js.map