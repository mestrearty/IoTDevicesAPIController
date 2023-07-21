import { Request, Response } from "express";
import alexaModel from "../devicesAPI/alexaAPI";
import AlexaModel from "../devicesAPI/alexaAPI";

export class AlexaController {

    constructor() { }

    public async redirect(req: Request, res: Response) {
        const method = req.method.toLowerCase()
        new AlexaController()[method](req, res)
    }

    public async get(req: Request, res: Response): Promise<Response> {
        try {
            const params = req.params

            //testando a alexa
            console.log("entrei")
            const alexaDBData = alexaModel.get()
            console.log(alexaDBData)
            if (alexaDBData) return res.json(alexaDBData);


            return res.json({ error: 404, text: 'not found' });

        } catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }

    public async post(req: Request, res: Response): Promise<Response> {
        try {
            //body
            const body = req.body;
            const type = body.type
            const answer = body.answer
            const atualAlexaStatus = alexaModel.get().status
            if (type == 'alexaResponse' && answer && atualAlexaStatus == "awaiting") {
                alexaModel.setAnswer(answer)
                return res.json({ "code": 201, "msg": "saved" });
            }

            //default return
            let retorno = { error: 404, msg: 'Bad Request or Not Awaiting' }
            console.log(body);
            return res.json(retorno);

        } catch (e) {
            console.log(e)
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
    public async put(req: Request, res: Response): Promise<Response> {
        try {
            //body
            const body = req.body;
            const status = body.status
            const msgToTalk = body.msgToTalk

            //Try to find aura in db
            const alexaGetted = AlexaModel.get()

            if (status && msgToTalk) {
                AlexaModel.setStatus(status)
                AlexaModel.setmsgToTalk(msgToTalk)
                return res.json({ "code": 201, "msg": "saved" });
            }
            //default return
            let retorno: any = { error: 422, msg: 'Unprocessable entity' }
            console.log(body);
            retorno = AlexaModel.get();
            return res.json(retorno);

        } catch (e) {
            console.log(e)
            return res.json({
                error: "500",
                description: e,
            });
        }
    }

}


export default new AlexaController();