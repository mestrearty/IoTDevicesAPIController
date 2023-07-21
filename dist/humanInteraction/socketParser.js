"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketTuyaAPI_1 = require("../devicesAPI/socketTuyaAPI");
const yeelightAPI_1 = require("../devicesAPI/yeelightAPI");
class SocketParser {
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
            device = new socketTuyaAPI_1.default(lightObject, res);
        if (device) {
            const actionType = lightObject.actionType;
            switch (actionType) {
                case "switch":
                    if (lightObject.switch) {
                        if (lightObject.switch == "on") {
                            device.setPowerOn();
                            return { code: 200, msg: 'OK', lightObject };
                        }
                        else if (lightObject.switch == "off") {
                            device.setPowerOff();
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
exports.SocketParser = SocketParser;
exports.default = new SocketParser();
//# sourceMappingURL=socketParser.js.map