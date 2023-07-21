import { Request, Response } from "express";
import DeviceList from "../utils/DeviceList";
import * as uuid from "uuid";
import InputObjectModel from "../model/inputObjectModel";

export class InputsController {
  constructor() {}

  public async redirect(req: Request, res: Response) {
    const method = req.method.toLowerCase();
    new InputsController()[method](req, res);
  }

  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const inputsToResolve = InputObjectModel.get(id);
      if (inputsToResolve) {
        if (id) res.json(inputsToResolve);
        else res.json(inputsToResolve[Object.keys(inputsToResolve)[0]]);
        return;
      }

      res.json({ error: 404, text: "Not Found" });
    } catch (e) {
      return res.json({
        error: "500",
        description: "Params not Accaptable",
      });
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      //body
      const bodyResponse = req.body.body;

      console.log("Request Recived: ", {
        id: bodyResponse.id,
        type: bodyResponse.type,
        data: bodyResponse.data,
      });

      if (bodyResponse.id && bodyResponse.type && bodyResponse.data) {
        bodyResponse.resolved = true;
        const response = InputObjectModel.setResolved(bodyResponse);
        res.json(response);
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

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      console.log("--------------------------------------------------------");
      const body = req.body;

      if (body.inputType) {
        let inputObject: any = {};
        inputObject.id = uuid.v1();
        inputObject.type = body.inputType;
        inputObject.params = body.params;
        inputObject.resolved = false;
        console.log({ inputObject });
        const response = InputObjectModel.set(inputObject);
        console.log({ RequestedObject: response });
        console.log("--------------------------------------------------------");
        res.json({ response });
        return;
      }

      res.status(400);
      res.json({ error: 400, text: "Missing Parameter" });
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

export default new InputsController();
