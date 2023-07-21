"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuyaAPI_1 = require("./tuyaAPI");
class TvTuyaAPI {
    constructor(device, res) {
        if (device) {
            this.res = res;
            this.tuyaAPI = new tuyaAPI_1.TuyaAPI(device.id, device.key, device.kind);
        }
        else
            res.send({ "code:": 404 });
    }
    async getStatus() {
        this.tuyaAPI.getDevice(this.res);
    }
    setPowerOn(timer) {
        if (timer == undefined)
            timer = 1;
        setTimeout(() => {
            this.tuyaAPI.setDevice({
                "command": "[{\"code\": \"switch\", \"value\": true}]"
            }, this.res);
        }, timer);
    }
    setPowerOff(timer) {
        if (timer == undefined)
            timer = 1;
        setTimeout(() => {
            this.tuyaAPI.setDevice({ "commands": "[{\"code\": \"switch\", \"value\": false}]" }, this.res);
        }, timer);
    }
}
exports.default = TvTuyaAPI;
//# sourceMappingURL=tvTuyaAPI.js.map