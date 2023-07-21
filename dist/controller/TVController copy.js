"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tvTuyaAPI_1 = require("../devicesAPI/tvTuyaAPI");
const lightParser_1 = require("../humanInteraction/lightParser");
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
            const device = DeviceList_1.default.getTvControll(deviceid);
            if (device.brand == 'tuya') {
                tvTuyaAPI_1.default.getStatus(device, res);
            }
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e || "time out",
            });
        }
    }
    /*public async post(req: Request, res: Response): Promise<Response> {
        try {
            
            //default return
            let retorno = { error: 404, msg: 'Bad Request or Not Awaiting' }
            return res.json(retorno);

        } catch (e) {
            console.log(e)
            return res.json({
                error: "500",
                description: e,
            });
        }
    }*/
    async put(req, res) {
        try {
            //body
            const body = req.body;
            const params = req.params;
            let lightObject = { ...body, ...params };
            const msgResponse = lightParser_1.default.light(lightObject);
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
exports.TVController = TVController;
exports.default = new TVController();
//# sourceMappingURL=TVController copy.js.map