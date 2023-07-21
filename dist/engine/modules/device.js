"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yeelight_1 = require("../../devicesAPI/yeelight");
class Device {
    constructor() {
    }
    check() {
        return { type: { voiceRecognition: true } };
    }
    light(params) {
        let device;
        if (yeelight_1.default.getLight()) {
            device = yeelight_1.default;
        }
        if (params.color) {
            device.setColor(params.color);
        }
        if (params.intensityValue) {
            if (params.intensityValue == 0)
                device.setPowerOff();
            else
                device.setBright(params.intensityValue);
        }
        if (params.get) {
            return device.getLight();
        }
    }
}
exports.Device = Device;
exports.default = new Device();
//# sourceMappingURL=device.js.map