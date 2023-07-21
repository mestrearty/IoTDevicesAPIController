"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bulbTuyaAPI_1 = require("../devicesAPI/bulbTuyaAPI");
const yeelightAPI_1 = require("../devicesAPI/yeelightAPI");
const deviceParser_1 = require("../humanInteraction/deviceParser");
const DeviceList_1 = require("../utils/DeviceList");
class LightController {
    constructor() { }
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new LightController()[method](req, res);
    }
    async get(req, res) {
        try {
            const params = req.params;
            const deviceid = params.deviceid;
            const device = DeviceList_1.default.getLight(deviceid);
            console.log({ device });
            if (device.brand == 'tuya') {
                new bulbTuyaAPI_1.BulbTuyaAPI(device, res).getStatus();
            }
            else {
                if (device.brand == 'yeelight' && yeelightAPI_1.default.getLight) {
                    console.log({ api: await yeelightAPI_1.default.getLight() });
                    return res.json(await yeelightAPI_1.default.getLight());
                }
                else
                    return res.json({ error: 404, text: 'not found' });
            }
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
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
            const device = DeviceList_1.default.getLight(params.deviceid);
            console.log({ body });
            let lightObject = { ...body, ...params, ...device };
            const msgResponse = deviceParser_1.default.light(lightObject, res);
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
exports.LightController = LightController;
exports.default = new LightController();
//# sourceMappingURL=lightController copy.js.map