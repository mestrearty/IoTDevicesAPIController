"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorTerminal {
    constructor() {
        this.colors = {
            reset: "\x1b[0m",
            bright: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            blink: "\x1b[5m",
            reverse: "\x1b[7m",
            hidden: "\x1b[8m",
            fg: {
                black: "\x1b[30m",
                red: "\x1b[31m",
                green: "\x1b[32m",
                yellow: "\x1b[33m",
                blue: "\x1b[34m",
                magenta: "\x1b[35m",
                cyan: "\x1b[36m",
                white: "\x1b[37m",
                crimson: "\x1b[38m" // Scarlet
            },
            bg: {
                black: "\x1b[40m",
                red: "\x1b[41m",
                green: "\x1b[42m",
                yellow: "\x1b[43m",
                blue: "\x1b[44m",
                magenta: "\x1b[45m",
                cyan: "\x1b[46m",
                white: "\x1b[47m",
                crimson: "\x1b[48m"
            }
        };
    }
    actionColor(msg) {
        const color = this.colors.bg.red + this.colors.fg.white;
        if (msg)
            this.consoleMsg(color, msg);
        else
            return color;
    }
    initEngineColor(msg) {
        const color = this.colors.bg.black + this.colors.fg.yellow;
        if (msg)
            this.consoleMsg(color, msg);
        else
            return color;
    }
    mulsemidiaColor(msg) {
        const color = this.colors.bg.blue + this.colors.fg.white;
        if (msg)
            this.consoleMsg(color, msg);
        else
            return color;
    }
    testColor(msg) {
        const color = this.colors.bg.red + this.colors.fg.yellow;
        if (msg)
            this.consoleMsg(color, msg);
        else
            return color;
    }
    consoleMsgStatus(currentElementID, status) {
        let statusColor = this.colors.fg.white;
        switch (status) {
            case "disabled":
                statusColor = this.colors.fg.red;
                break;
            case "enabled":
                statusColor = this.colors.fg.blue;
                break;
            case "finished":
                statusColor = this.colors.fg.black + this.colors.bg.white;
                break;
            case "locked":
                statusColor = this.colors.fg.red;
                break;
            case "paused":
                statusColor = this.colors.fg.yellow;
                break;
            default:
            case "occurring":
                statusColor = this.colors.fg.green;
                break;
        }
        console.log(this.colors.reset, `Im: ${currentElementID} - Status Changed -> ` + statusColor + status, this.colors.reset);
    }
    consoleMsg(color, msg) {
        console.log(color, msg, this.colors.reset);
    }
}
exports.default = new ColorTerminal();
//# sourceMappingURL=colorTerminal.js.map