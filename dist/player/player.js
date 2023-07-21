"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(pst, episodeId) {
        try {
            this.selectEpisode(episodeId);
        }
        catch (e) {
            this.errorMsg = "Não foi possível executar (Erro 401-1-Json Inválido " + e;
            console.log(this.errorMsg);
        }
    }
    selectEpisode(episodeId) {
        let episodes = this.pst.pervasiveStoryTelling.episode;
        if (Array.isArray(episodes && episodeId)) {
            episodes.forEach((episodeItem) => {
                if (episodeItem.id == episodeId) {
                    this.currentEpisode = episodeItem;
                }
            });
        }
        else {
            this.currentEpisode = this.pst.pervasiveStoryTelling.episode;
        }
    }
    runPSTEpisode(pst, episodeId) {
    }
}
exports.default = Player;
//# sourceMappingURL=player.js.map