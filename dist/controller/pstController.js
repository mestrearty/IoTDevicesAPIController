"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pervasiveStoryTellingModel_1 = require("../model/pervasiveStoryTellingModel");
class PSTController {
    async get(req, res) {
        try {
            console.log(this);
            const id = req.params.id;
            if (id === 'list') {
                let pstList = pervasiveStoryTellingModel_1.default.getList();
                pstList = Object.getOwnPropertyNames(pstList);
                res.json(pstList.splice(2));
                return;
            }
            if (id && pervasiveStoryTellingModel_1.default.get(id)) {
                res.json(pervasiveStoryTellingModel_1.default.get(id));
                return;
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
}
exports.PSTController = PSTController;
exports.default = new PSTController();
//# sourceMappingURL=pstController.js.map