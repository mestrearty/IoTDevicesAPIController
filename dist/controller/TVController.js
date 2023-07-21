"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tvTuyaAPI_1 = require("../devicesAPI/tvTuyaAPI");
const tvTuyaAPI_2 = require("../devicesAPI/tvTuyaAPI");
const DeviceList_1 = require("../utils/DeviceList");
class TVController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new TVController()[method](req, res);
    }
    async get(req, res) {
        const params = req.params;
        const brand = params.brand;
        const deviceid = params.deviceid;
        try {
            let tv;
            const device = DeviceList_1.default.getTvControll(deviceid);
            if (device.brand == 'tuya') {
                tv = new tvTuyaAPI_2.default(device, res);
                tv.getStatus();
            }
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e || "time out",
            });
        }
    }
    async put(req, res) {
        const params = req.params;
        const brand = params.brand;
        const deviceid = params.deviceid;
        try {
            let socket;
            const device = DeviceList_1.default.getTvControll(deviceid);
            if (device.brand == 'tuya') {
                console.log("oi");
                socket = new tvTuyaAPI_1.default(device, res);
                socket.getStatus();
            }
        }
        catch (e) {
            console.log(e);
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
}
exports.TVController = TVController;
exports.default = new TVController();
//# sourceMappingURL=TVController.js.map