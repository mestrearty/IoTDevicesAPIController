"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = require('color');
class colorAlias {
    constructor() {
        console.log("ColorAlias called!");
    }
    getHSVColorString(color) {
        const hsv = this[`${color}HSV`]();
        const h = hsv[0];
        const s = hsv[1];
        const v = hsv[2];
        return { h, s, v };
    }
    getHSVColorRGB(r, g, b) {
        var hsv = Color({ r, g, b }).hsl();
        const h = hsv.color[0] || 1;
        const s = hsv.color[1] * 10;
        const v = hsv.color[2] * 10;
        return { h, s, v };
    }
    getHSVColorHEX(hex) {
        var hsv = Color(hex).hsl();
        const h = hsv.color[0] || 1;
        const s = hsv.color[1] * 10;
        const v = hsv.color[2] * 10;
        return { h, s, v };
    }
    redHSV() {
        return [0, 1000, 1000];
    }
    orangeHSV() {
        return [30, 1000, 1000];
    }
    yellowHSV() {
        return [60, 1000, 1000];
    }
    greenHSV() {
        return [124, 1000, 1000];
    }
    purpleHSV() {
        return [270, 1000, 1000];
    }
    pinkHSV() {
        return [330, 1000, 1000];
    }
    whiteHSV() {
        return [0, 1000, 1000];
    }
    blueHSV() {
        return [226, 1000, 1000];
    }
}
exports.colorAlias = colorAlias;
exports.default = new colorAlias();
//# sourceMappingURL=colorAlias.js.map