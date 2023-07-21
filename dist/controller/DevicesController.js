"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeviceList_1 = require("../utils/DeviceList");
const tuyaDriver_1 = require("../Drivers/tuyaDriver");
const yeelightDriver_1 = require("../Drivers/yeelightDriver");
class DevicesController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new DevicesController()[method](req, res);
    }
    async get(req, res) {
        try {
            const query = req.query;
            const device = DeviceList_1.default.getDevice(query);
            if (device.brand == "tuya") {
                new tuyaDriver_1.TuyaDriver(device, res).getDeviceInfo();
                return;
            }
            if (device.brand == "yeelight") {
                const yeelight = new yeelightDriver_1.YeelightDriver(device, res);
                yeelight.getDeviceInfo();
                return;
            }
            res.status(404);
            res.json({ error: 404, text: "Not Found" });
        }
        catch (e) {
            res.status(500);
            return res.json({
                error: "500",
                description: "Params not Accaptable",
            });
        }
    }
    async put(req, res) {
        try {
            //body
            const body = req.body;
            const query = req.query;
            const device = DeviceList_1.default.getDevice(query);
            console.log("Request Recived: ", {
                id: device.id,
                type: device.type,
                body,
            });
            if (device.brand == "tuya") {
                new tuyaDriver_1.TuyaDriver(device, res).setDevice(body);
                return;
            }
            if (device.brand == "yeelight") {
                new yeelightDriver_1.YeelightDriver(device, res).setDevice(body);
                return;
            }
            res.status(404);
            res.json({ error: 404, text: "Not Found" });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            return res.json({
                error: "500",
                description: "Device or Params not exist",
            });
        }
    }
}
exports.DevicesController = DevicesController;
exports.default = new DevicesController();
//# sourceMappingURL=DevicesController.js.map