"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuyaAPI_1 = require("./tuyaAPI");
class SocketTuyaAPI {
    constructor() { }
    switch(deviceInfo, onOff, timer) {
        let device = new tuyaAPI_1.TuyaAPI(deviceInfo.id, deviceInfo.key, deviceInfo.kind);
        if (timer == undefined)
            timer = 1;
        setTimeout(() => {
            if (onOff == 'on')
                device.setDevice({ '1': true });
            if (onOff == 'off')
                device.setDevice({ '1': true });
        }, timer);
    }
    async getStatus(deviceInfo, res) {
        let device = new tuyaAPI_1.TuyaAPI(deviceInfo.id, deviceInfo.key, deviceInfo.type);
        device.getDevice(res);
    }
}
exports.default = new SocketTuyaAPI();
//# sourceMappingURL=socketTuyaAPI copy.js.map