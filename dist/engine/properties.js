"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InteratorPSTInstanceModel_1 = require("../model/InteratorPSTInstanceModel");
class Properties {
    constructor() {
        this.myDataBase = './myDataBase.json';
    }
    checkStatusByID(id, instance) {
        let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId);
        let status = 'notFound';
        //Find if has the id on pst and if is ocurring
        if (pstInstance.pst[`$`].id == id)
            status = pstInstance.pst[`$`].status;
        for (let i in pstInstance.pst.episode) {
            if (pstInstance.pst.episode[i][`$`].id == id)
                status = pstInstance.pst.episode[i][`$`].status;
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstInstance.pst.episode[i].experience[j][`$`].id == id)
                    status = pstInstance.pst.episode[i].experience[j][`$`].status;
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == id)
                        status = pstInstance.pst.episode[i].experience[j].sequence[k][`$`].status;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].id == id)
                            status = pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].status;
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id == id)
                            status = pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].status;
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].id == id)
                            status = pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].status;
                    }
                }
            }
        }
        if (status == 'none')
            status = 'enable';
        return status;
    }
    getInstanceByID(id, instance) {
        let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId);
        let instanceFound = undefined;
        //Find if has the id on pst and if is ocurring
        if (pstInstance.pst[`$`].id == id)
            instanceFound = pstInstance.pst[`$`];
        for (let i in pstInstance.pst.episode) {
            if (pstInstance.pst.episode[i][`$`].id == id)
                instanceFound = pstInstance.pst.episode[i][`$`];
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstInstance.pst.episode[i].experience[j][`$`].id == id)
                    instanceFound = pstInstance.pst.episode[i].experience[j][`$`];
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == id)
                        instanceFound = pstInstance.pst.episode[i].experience[j].sequence[k][`$`];
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].id == id)
                            instanceFound = pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`];
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id == id)
                            instanceFound = pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`];
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].id == id)
                            instanceFound = pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`];
                    }
                }
            }
        }
        return instanceFound;
    }
    changePropetieByID(id, recivedInstance, propertie, value) {
        let instance = { ...recivedInstance };
        let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId);
        //Find if has the id on pst and if is ocurring
        if (pstInstance.pst[`$`].id == id)
            pstInstance.pst[`$`][propertie] = value;
        for (let i in pstInstance.pst.episode) {
            if (pstInstance.pst.episode[i][`$`].id == id)
                pstInstance.pst.episode[i][`$`][propertie] = value;
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstInstance.pst.episode[i].experience[j][`$`].id == id)
                    pstInstance.pst.episode[i].experience[j][`$`][propertie] = value;
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == id)
                        pstInstance.pst.episode[i].experience[j].sequence[k][`$`][propertie] = value;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media)
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].id == id)
                            pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`][propertie] = value;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint)
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id == id)
                            pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`][propertie] = value;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect)
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].id == id)
                            pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`][propertie] = value;
                }
            }
        }
        //console.log("Alterando propriedade", { propertie, value })
        InteratorPSTInstanceModel_1.default.setInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId, instance.pstInstance.pst);
    }
    changeSonsByFatherId(fatherID, instance, propertie, value) {
        let isFatherInThisPropertieValue = false;
        let pstInstance = InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel(instance.interatorId, instance.pstInstanceId);
        let status = this.checkStatusByID(fatherID, { ...instance });
        if (status == value) {
            isFatherInThisPropertieValue = true;
        }
        else {
            this.changePropetieByID(fatherID, { ...instance }, propertie, value);
        }
        //console.log({ status, isFatherInThisPropertieValue })
        //percorre toda a lista verificando quem é o pai. Os filhos verificam então se algum antepassado era o procurado. Se for, altera o status para igual
        let pstFather = false;
        if (pstInstance.pst[`$`].id == fatherID)
            pstFather = true;
        let epFather = false;
        for (let i in pstInstance.pst.episode) {
            if (pstFather)
                this.changePropetieByID(pstInstance.pst.episode[i][`$`].id, { ...instance }, propertie, value);
            if (pstInstance.pst.episode[i][`$`].id == fatherID) {
                epFather = true;
            }
            else
                epFather = false;
            let expFather = false;
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstFather || epFather)
                    this.changePropetieByID(pstInstance.pst.episode[i].experience[j][`$`].id, { ...instance }, propertie, value);
                if (pstInstance.pst.episode[i].experience[j][`$`].id == fatherID) {
                    expFather = true;
                }
                else
                    expFather = false;
                let seqFather = false;
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstFather || expFather || epFather)
                        this.changePropetieByID(pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id, { ...instance }, propertie, value);
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == fatherID) {
                        seqFather = true;
                    }
                    else
                        seqFather = false;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media) {
                        if (pstFather || expFather || epFather || seqFather)
                            this.changePropetieByID(pstInstance.pst.episode[i].experience[j].sequence[k].media[l][`$`].id, { ...instance }, propertie, value);
                    }
                    let dpFather = false;
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint) {
                        if (pstFather || expFather || epFather || seqFather)
                            this.changePropetieByID(pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id, { ...instance }, propertie, value);
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint[l][`$`].id == fatherID) {
                            dpFather = true;
                        }
                        else
                            dpFather = false;
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect) {
                        if (pstFather || expFather || epFather || seqFather)
                            this.changePropetieByID(pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect[l][`$`].id, { ...instance }, propertie, value);
                    }
                }
            }
        }
        delete instance.initialInstance;
        InteratorPSTInstanceModel_1.default.setInteratorPSTInstanceModel({ ...instance }.interatorId, instance.pstInstanceId, instance.pstInstance.pst);
    }
    resetFatherAndSonsByFatherId(fatherID, interatorId, pstInstanceId) {
        let pstInstance = JSON.parse(JSON.stringify(InteratorPSTInstanceModel_1.default.getInteratorPSTInstanceModel(interatorId, pstInstanceId)));
        const initialInstance = { ...pstInstance.initialInstance };
        const removeReference = function (value) {
            return JSON.parse(JSON.stringify(value));
        };
        //percorre toda a lista verificando quem é o pai. Os filhos verificam então se algum antepassado era o procurado. Se for, altera o status para igual
        if (pstInstance.pst[`$`].id == fatherID) {
            pstInstance.pst = removeReference(initialInstance);
        }
        for (let i in pstInstance.pst.episode) {
            if (pstInstance.pst.episode[i][`$`].id == fatherID)
                pstInstance.pst.episode[i] = removeReference(initialInstance.episode[i]);
            for (let j in pstInstance.pst.episode[i].experience) {
                if (pstInstance.pst.episode[i].experience[j][`$`].id == fatherID)
                    pstInstance.pst.episode[i].experience[j] = removeReference(initialInstance.episode[i].experience[j]);
                for (let k in pstInstance.pst.episode[i].experience[j].sequence) {
                    if (pstInstance.pst.episode[i].experience[j].sequence[k][`$`].id == fatherID)
                        pstInstance.pst.episode[i].experience[j].sequence[k] = removeReference(initialInstance.episode[i].experience[j].sequence[k]);
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].media) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].media.id == fatherID)
                            pstInstance.pst.episode[i].experience[j].sequence[k].media = removeReference(initialInstance.episode[i].experience[j].sequence[k].media);
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint.id == fatherID)
                            pstInstance.pst.episode[i].experience[j].sequence[k].decisionpoint = removeReference(initialInstance.episode[i].experience[j].sequence[k].decisionpoint);
                    }
                    for (let l in pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect) {
                        if (pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect.id == fatherID)
                            pstInstance.pst.episode[i].experience[j].sequence[k].sensorialeffect = removeReference(initialInstance.episode[i].experience[j].sequence[k].sensorialeffect);
                    }
                }
            }
        }
        InteratorPSTInstanceModel_1.default.setInteratorPSTInstanceModel(interatorId, pstInstanceId, removeReference(pstInstance.pst));
    }
}
exports.Properties = Properties;
exports.default = new Properties();
//# sourceMappingURL=properties.js.map