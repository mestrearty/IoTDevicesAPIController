"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Media {
    constructor() { }
    runMedia(mediaElement) {
        const nextElement = mediaElement.currentInstance[`$`].nextElement;
        setTimeout(() => {
            console.log("Executando: ", mediaElement.currentInstance[`$`].id);
        }, 2000);
        if (nextElement)
            this.runMedia(nextElement);
    }
}
exports.Media = Media;
exports.default = new Media();
//# sourceMappingURL=media.js.map