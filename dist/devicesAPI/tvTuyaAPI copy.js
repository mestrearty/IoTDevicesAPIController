"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuyaAPI_1 = require("./tuyaAPI");
class TvTuyaAPI {
    constructor() { }
    async getStatus(deviceInfo, res) {
        let device = new tuyaAPI_1.TuyaAPI(deviceInfo.id, deviceInfo.key, deviceInfo.type);
        device.getDevice(res);
    }
}
exports.default = new TvTuyaAPI();
//# sourceMappingURL=tvTuyaAPI copy.js.map