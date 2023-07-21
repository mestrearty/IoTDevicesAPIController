"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerController {
    async index(req, res) {
        try {
            if (req.params.action && !"new") {
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
exports.PlayerController = PlayerController;
exports.default = new PlayerController();
//# sourceMappingURL=player.js.map