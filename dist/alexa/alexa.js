"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interatorModel_1 = require("../model/interatorModel");
const propertiesInteratorModel_1 = require("../model/propertiesInteratorModel");
const auraModel_1 = require("../model/auraModel");
const InteratorPSTInstanceModel_1 = require("../model/InteratorPSTInstanceModel");
AlexaAPI;
InteratorController;
{
    constructor();
    { }
    async;
    redirect(req, Request, res, Response);
    {
        const method = req.method.toLowerCase();
        new InteratorController()[method](req, res);
    }
    async;
    get(req, Request, res, Response);
    Promise < Response > {
        try: {
            const: interatorId = req.params.id,
            const: info = req.params.info,
            const: instanceId = req.params.instanceId,
            let, retorno: any = { error: 404, text: 'not found' },
            if(interatorId) { }
        } == undefined,
        return: res.json(retorno),
        if(interatorId) { }
    } === 'list';
    return res.json(interatorModel_1.default.getList());
    if (interatorModel_1.default.get(interatorId)) {
        retorno = (interatorModel_1.default.get(interatorId));
        if (info == "properties")
            retorno = (propertiesInteratorModel_1.default.get(interatorId));
        if (info == "pstaura" && instanceId) {
            retorno = auraModel_1.default.getInteratorPSTInstanceModel(interatorId, instanceId);
        }
    }
    return res.json(retorno);
}
try { }
catch (e) {
    return res.json({
        error: "500",
        description: e,
    });
}
async;
post(req, Request, res, Response);
Promise < Response > {
    try: {
        //body
        const: body = req.body,
        const: interatorId = req.params.id
        //params
        ,
        //params
        const: info = req.params.info,
        const: pstId = req.params.instanceId
        //Try to find aura in db
        ,
        //Try to find aura in db
        const: interatorGetted = interatorModel_1.default.get(interatorId)
        //default return
        ,
        //default return
        let, retorno = { error: 422, msg: 'Unprocessable entity' },
        if(interatorId) { }
    } && interatorGetted.error
};
{
    interatorModel_1.default.set(body);
    retorno = interatorModel_1.default.get(interatorId);
}
if (info == "pstaura" && pstId) {
    const newInstanceId = InteratorPSTInstanceModel_1.default.setNEWInteratorPSTInstanceModel(interatorId, pstId);
    retorno = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel(interatorId, newInstanceId);
}
return res.json(retorno);
try { }
catch (e) {
    console.log(e);
    return res.json({
        error: "500",
        description: e,
    });
}
async;
put(req, Request, res, Response);
Promise < Response > {
    try: {
        //body
        const: body = req.body,
        const: interatorId = req.params.id,
        const: bodyProperties = body.properties,
        const: bodyAura = req.body.aura
        //params
        ,
        //params
        const: info = req.params.info,
        const: pstId = req.params.instanceId
        //Try to find aura in db
        ,
        //Try to find aura in db
        const: interatorGetted = interatorModel_1.default.get(interatorId)
        //default return
        ,
        //default return
        let, retorno = { error: 422, msg: 'Unprocessable entity' },
        if(interatorGetted) { }, : .error
    }
};
{
    return res.json(retorno);
}
if (interatorId && bodyProperties)
    propertiesInteratorModel_1.default.set(interatorId, bodyProperties);
if (interatorId && bodyAura && req.params.id != "new")
    auraModel_1.default.set(interatorId, bodyAura);
if (info == 'pstaura' && pstId) {
    InteratorPSTInstanceModel_1.default.setInteratorPSTInstanceModel(interatorId, pstId, body);
}
//if (interatorId && bodyAura.pstId != undefined)
//AuraModel.setNEWInteratorPSTInstanceModel(interatorId, bodyAura.pstId)
retorno = interatorModel_1.default.get(interatorId);
return res.json(retorno);
try { }
catch (e) {
    console.log(e);
    return res.json({
        error: "500",
        description: e,
    });
}
exports.default = new InteratorController();
//# sourceMappingURL=alexa.js.map