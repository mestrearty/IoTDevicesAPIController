import { Request, Response } from "express";
import YeelightAPI from "../devicesAPI/yeelightAPI";
import DeviceParser from "../humanInteraction/deviceParser";
import DeviceList from "../utils/DeviceList";
import { TuyaDriver } from "../Drivers/tuyaDriver";
import { YeelightDriver } from "../Drivers/yeelightDriver";

export class DevicesController {
  constructor() {}

  public async redirect(req: Request, res: Response) {
    const method = req.method.toLowerCase();
    new DevicesController()[method](req, res);
  }

  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const query = req.query;
      const device = DeviceList.getDevice(query);

      if (device.brand == "tuya") {
        new TuyaDriver(device, res).getDeviceInfo();
        return;
      }

      if (device.brand == "yeelight") {
        const yeelight = new YeelightDriver(device, res);
        yeelight.getDeviceInfo();
        return;
      }

      res.status(404);
      res.json({ error: 404, text: "Not Found" });
    } catch (e) {
      res.status(500);
      return res.json({
        error: "500",
        description: "Params not Accaptable",
      });
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      //body
      const body = req.body;
      const query = req.query;
      const device = DeviceList.getDevice(query);
      console.log("Request Recived: ", {
        id: device.id,
        type: device.type,
        body,
      });
      if (device.brand == "tuya") {
        new TuyaDriver(device, res).setDevice(body);
        return;
      }
      if (device.brand == "yeelight") {
        new YeelightDriver(device, res).setDevice(body);
        return;
      }
      res.status(404);
      res.json({ error: 404, text: "Not Found" });
    } catch (e) {
      console.log(e);
      res.status(500);
      return res.json({
        error: "500",
        description: "Device or Params not exist",
      });
    }
  }
}

export default new DevicesController();
