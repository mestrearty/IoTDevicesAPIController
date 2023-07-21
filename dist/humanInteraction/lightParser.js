"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bulbTuyaAPI_1 = require("../devicesAPI/bulbTuyaAPI");
const yeelightAPI_1 = require("../devicesAPI/yeelightAPI");
class LightParser {
    constructor() {
    }
    check() {
        return { type: { voiceRecognition: true } };
    }
    light(lightObject, res) {
        let device = undefined;
        if (lightObject.brand == 'yeelight')
            if (yeelightAPI_1.default.getLight())
                device = yeelightAPI_1.default;
        if (lightObject.brand == 'tuya')
            device = new bulbTuyaAPI_1.BulbTuyaAPI(lightObject, res);
        if (device) {
            const actionType = lightObject.actionType;
            switch (actionType) {
                case "colorString":
                    if (lightObject.color) {
                        device.setColor(lightObject.color, res);
                        return { code: 200, msg: 'OK', lightObject };
                    }
                    break;
                case "colorRGB":
                    if (lightObject.R && lightObject.G && lightObject.B) {
                        const R = lightObject.R || 1;
                        const G = lightObject.R || 1;
                        const B = lightObject.R || 1;
                        device.setColorRGB(lightObject.R, lightObject.G, lightObject.B, res);
                        return { code: 200, msg: 'OK', lightObject };
                    }
                    break;
                case "switch":
                    if (lightObject.switch) {
                        if (lightObject.switch == "on") {
                            device.setPowerOn(res);
                            return { code: 200, msg: 'OK', lightObject };
                        }
                        else if (lightObject.switch == "off") {
                            device.setPowerOff(res);
                            return { code: 200, msg: 'OK', lightObject };
                        }
                    }
                    break;
            }
        }
        else {
            return { code: 422, msg: 'Missing Paramter' };
        }
    }
}
exports.LightParser = LightParser;
exports.default = new LightParser();
//# sourceMappingURL=lightParser.js.map