"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pervasiveStoryTellingModel_1 = require("../model/pervasiveStoryTellingModel");
class PervasiveStoryTellingController {
    async redirect(req, res) {
        const method = req.method.toLowerCase();
        new PervasiveStoryTellingController()[method](req, res);
    }
    async get(req, res) {
        try {
            const id = req.params.id;
            if (id === 'list') {
                let pstList = pervasiveStoryTellingModel_1.default.getList();
                pstList = Object.getOwnPropertyNames(pstList);
                return res.json(pstList);
            }
            if (id && pervasiveStoryTellingModel_1.default.get(id)) {
                return res.json(pervasiveStoryTellingModel_1.default.get(id));
            }
            return res.json("STD_C_TC_25");
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
    async post(req, res) {
        try {
            const bodyPst = req.body['pervasivestorytelling'];
            const pstId = bodyPst['$'].id;
            if (bodyPst && pstId) {
                pervasiveStoryTellingModel_1.default.set(pstId, bodyPst);
                return res.json(pervasiveStoryTellingModel_1.default.get(pstId));
            }
            return res.json("pst");
        }
        catch (e) {
            return res.json({
                error: "500",
                description: e,
            });
        }
    }
}
exports.PervasiveStoryTellingController = PervasiveStoryTellingController;
exports.default = new PervasiveStoryTellingController();
//# sourceMappingURL=pervasiveStoryTellingController.js.map