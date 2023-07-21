"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuyaAPI_1 = require("./tuyaAPI");
class SocketTuyaAPI {
    constructor(device, res) {
        if (device) {
            this.res = res;
            this.tuyaAPI = new tuyaAPI_1.TuyaAPI(device.id, device.key, device.kind);
        }
        else
            res.send({ "code:": 404 });
    }
    switch(deviceInfo, res) {
        let tuyaAPI = new tuyaAPI_1.TuyaAPI(deviceInfo.id, deviceInfo.key, deviceInfo.kind);
        if (deviceInfo.timer == undefined)
            deviceInfo.timer = 1;
        setTimeout(() => {
            if (deviceInfo.onOff == 'on')
                tuyaAPI.setDevice({ '1': true }, res);
            if (deviceInfo.onOff == 'off')
                tuyaAPI.setDevice({ '1': true }, res);
        }, deviceInfo.timer);
    }
    setPowerOn(timer) {
        if (timer == undefined)
            timer = 1;
        setTimeout(() => {
            this.tuyaAPI.setDevice({
                "1": true
            }, this.res);
        }, timer);
    }
    setPowerOff(timer) {
        if (timer == undefined)
            timer = 1;
        setTimeout(() => {
            this.tuyaAPI.setDevice({ '1': false }, this.res);
        }, timer);
    }
    async getStatus() {
        this.tuyaAPI.getDevice(this.res);
    }
}
exports.default = SocketTuyaAPI;
//# sourceMappingURL=socketTuyaAPI.js.map