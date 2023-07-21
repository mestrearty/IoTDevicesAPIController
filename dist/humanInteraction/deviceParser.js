"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yeelightAPI_1 = require("../devicesAPI/yeelightAPI");
class DeviceParser {
    constructor() {
    }
    check() {
        return { type: { voiceRecognition: true } };
    }
    light(IoTObject, res) {
        let device = undefined;
        if (IoTObject.brand == 'yeelight')
            if (yeelightAPI_1.default.getLight())
                device = yeelightAPI_1.default;
        if (device) {
            const actionType = IoTObject.actionType;
            switch (actionType) {
                case "colorString":
                    if (IoTObject.color) {
                        device.setColor(IoTObject.color, res);
                        return { code: 200, msg: 'OK', lightObject: IoTObject };
                    }
                    break;
                case "colorHEX":
                    if (IoTObject.color) {
                        device.setHEX(IoTObject.color, res);
                        return { code: 200, msg: 'OK', lightObject: IoTObject };
                    }
                    break;
                case "colorRGB":
                    if (IoTObject.R && IoTObject.G && IoTObject.B) {
                        const R = IoTObject.R || 1;
                        const G = IoTObject.R || 1;
                        const B = IoTObject.R || 1;
                        device.setColorRGB(IoTObject.R, IoTObject.G, IoTObject.B, res);
                        return { code: 200, msg: 'OK', lightObject: IoTObject };
                    }
                    break;
                case "switch":
                    if (IoTObject.switch) {
                        if (IoTObject.switch == "on") {
                            device.setPowerOn(res);
                            return { code: 200, msg: 'OK', lightObject: IoTObject };
                        }
                        else if (IoTObject.switch == "off") {
                            device.setPowerOff(res);
                            return { code: 200, msg: 'OK', lightObject: IoTObject };
                        }
                    }
                    break;
            }
        }
        else {
            return { code: 422, msg: 'Missing Paramter' };
        }
    }
    socket(IoTObject, res) {
        let device = undefined;
        console.log(IoTObject);
        if (device) {
            const actionType = IoTObject.actionType;
            switch (actionType) {
                case "switch":
                    if (IoTObject.switch) {
                        if (IoTObject.switch == "on") {
                            device.setPowerOn(res);
                            return { code: 200, msg: 'OK', IoTObject };
                        }
                        else if (IoTObject.switch == "off") {
                            device.setPowerOff(res);
                            return { code: 200, msg: 'OK', IoTObject };
                        }
                    }
                    break;
            }
        }
        else {
            return { code: 422, msg: 'Missing Paramter' };
        }
    }
    tv(IoTObject, res) {
        let device = undefined;
        console.log(IoTObject);
        if (device) {
            const actionType = IoTObject.actionType;
            switch (actionType) {
                case "switch":
                    if (IoTObject.switch) {
                        if (IoTObject.switch == "on") {
                            device.setPowerOn(res);
                            return { code: 200, msg: 'OK', IoTObject };
                        }
                        else if (IoTObject.switch == "off") {
                            device.setPowerOff(res);
                            return { code: 200, msg: 'OK', IoTObject };
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
exports.DeviceParser = DeviceParser;
exports.default = new DeviceParser();
//# sourceMappingURL=deviceParser.js.map