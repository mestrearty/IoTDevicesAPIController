"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorTerminal_1 = require("../utils/colorTerminal");
const colorAlias_1 = require("../humanInteraction/colorAlias");
const tuyaAPI_1 = require("./tuyaAPI");
class BulbTuyaAPI {
    constructor(device, res) {
        if (device) {
            this.res = res; //esqueci completamente que tava setando o res na criação do objeto. Posso remover das demais funções
            this.tuyaAPI = new tuyaAPI_1.TuyaAPI(device.id, device.key, device.kind);
        }
        else
            res.send({ "code:": 404 });
    }
    async getStatus() {
        this.tuyaAPI.getDevice(this.res);
    }
    setPowerOn(res) {
        this.tuyaAPI.setDevice({ "20": true }, res);
    }
    setPowerOff(res) {
        this.tuyaAPI.setDevice({ "20": false }, res);
    }
    setColor(color, res) {
        const colorFunction = color + "HSV";
        colorTerminal_1.default.alertMsg({
            action: "Setting color", color, alias: colorAlias_1.default[colorFunction]()
        });
        if (this.tuyaAPI && colorAlias_1.default[colorFunction]()) {
            const colorTranslated = colorAlias_1.default[colorFunction]();
            const h = colorTranslated[0];
            //put in hex 2`
            let hexH = h.toString(16);
            if (hexH.length == 1)
                hexH = '000' + hexH;
            if (hexH.length == 2)
                hexH = '00' + hexH;
            if (hexH.length == 3)
                hexH = '0' + hexH;
            const color = hexH + "03e803e8";
            console.log(color);
            this.tuyaAPI.setDevice({
                "20": true,
                "21": "colour",
                "24": color
            }, res);
        }
    }
    setColorRGB(r, g, b, res) {
        function rgb2hsv(r, g, b) {
            let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
            let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
            return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
        }
        let [h, s, v] = rgb2hsv(r, g, b);
        h = Math.round(h);
        //put in hex 2`
        let hexH = h.toString(16);
        if (hexH.length == 1)
            hexH = '000' + hexH;
        if (hexH.length == 2)
            hexH = '00' + hexH;
        if (hexH.length == 3)
            hexH = '0' + hexH;
        const color = hexH + "03e803e8";
        this.tuyaAPI.setDevice({
            "20": true,
            "21": "colour",
            "24": color
        }, res);
    }
}
exports.BulbTuyaAPI = BulbTuyaAPI;
//# sourceMappingURL=bulbTuyaAPI.js.map