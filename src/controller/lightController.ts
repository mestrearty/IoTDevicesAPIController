import { Request, Response } from "express";
import YeelightAPI from "../devicesAPI/yeelightAPI";
import DeviceParser from "../humanInteraction/deviceParser";
import DeviceList from "../utils/DeviceList";

export class LightController {

    constructor() { }

    public async redirect(req: Request, res: Response) {
        const method = req.method.toLowerCase()
        new LightController()[method](req, res)
    }

    public async get(req: Request, res: Response): Promise<Response> {

        try {
            const params = req.params
            const deviceid = params.deviceid
            const device = DeviceList.getLight(deviceid)

            console.log({ device })

            if (device.brand == 'yeelight' && YeelightAPI.getLight) {
                console.log({ api: await YeelightAPI.getLight() })
                return res.json(await YeelightAPI.getLight())

            } else
                return res.json({ error: 404, text: 'not found' });

        } catch (e) {
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

    public async put(req: Request, res: Response): Promise<Response> {
        try {
            //body
            const body = req.body
            const params = req.params
            const device = DeviceList.getLight(params.deviceid)
            console.log({ body })
            let lightObject = { ...body, ...params, ...device }
            const msgResponse = DeviceParser.light(lightObject, res)

            if (device.brand == "yeelight")
                return res.send(msgResponse)

            //default return
            //let retorno: any = { error: 422, msg: 'Unprocessable entity' }
            //return res.json(retorno);

        } catch (e) {
            console.log(e)
            return res.json({
                error: "500",
                description: e,
            });
        }
    }

}


export default new LightController();