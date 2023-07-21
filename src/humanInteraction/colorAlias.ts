var Color = require('color');
export class colorAlias {
    constructor() {
        console.log("ColorAlias called!")
    }

    public getHSVColorString(color) {
        const hsv = this[`${color}HSV`]()
        const h = hsv[0]
        const s = hsv[1]
        const v = hsv[2]

        return { h, s, v }
    }

    public getHSVColorRGB(r, g, b) {
        var hsv = Color({ r, g, b }).hsl()

        const h = hsv.color[0] || 1
        const s = hsv.color[1] * 10
        const v = hsv.color[2] * 10

        return { h, s, v }
    }

    public getHSVColorHEX(hex) {
        var hsv = Color(hex).hsl()
        const h = hsv.color[0] || 1
        const s = hsv.color[1] * 10
        const v = hsv.color[2] * 10

        return { h, s, v }
    }

    public redHSV() {
        return [0, 1000, 1000]
    }

    public orangeHSV() {
        return [30, 1000, 1000]
    }

    public yellowHSV() {
        return [60, 1000, 1000]
    }

    public greenHSV() {
        return [124, 1000, 1000]
    }

    public purpleHSV() {
        return [270, 1000, 1000]
    }

    public pinkHSV() {
        return [330, 1000, 1000]
    }

    public whiteHSV() {
        return [0, 1000, 1000]
    }
    public blueHSV() {
        return [226, 1000, 1000]
    }
}

export default new colorAlias()