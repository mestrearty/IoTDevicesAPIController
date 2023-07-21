"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketTuyaAPI_1 = require("../devicesAPI/socketTuyaAPI");
const deviceParser_1 = require("../humanInteraction/deviceParser");
const DeviceList_1 = require("../utils/DeviceList");
class SocketController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new SocketController()[method](req, res);
    }
    async get(req, res) {
        const params = req.params;
        const brand = params.brand;
        const deviceid = params.deviceid;
        try {
            let socket;
            const device = DeviceList_1.default.getSocket(deviceid);
            if (device.brand == 'tuya') {
                socket = new socketTuyaAPI_1.default(device, res);
                socket.getStatus();
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
        try {
            //body
            const body = req.body;
            const params = req.params;
            const device = DeviceList_1.default.getSocket(params.deviceid);
            let iotObject = { ...body, ...params, ...device };
            const msgResponse = deviceParser_1.default.socket(iotObject, res);
            if (device.brand == "yeelight")
                return res.send(msgResponse);
            //default return
            //let retorno: any = { error: 422, msg: 'Unprocessable entity' }
            //return res.json(retorno);
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
exports.SocketController = SocketController;
exports.default = new SocketController();
//# sourceMappingURL=SocketController.js.map