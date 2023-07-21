"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorAlias_1 = require("../humanInteraction/colorAlias");
const node_yeelight_wifi_1 = require("node-yeelight-wifi");
class YeelightDriver {
    constructor(device, res) {
        this.look = new node_yeelight_wifi_1.Lookup();
        this.device = device;
        this.res = res;
    }
    findDeviceAndDoTheMagic(action) {
        let lights;
        this.look.on("detected", (light) => {
            console.log("new yeelight detected: host=" + light.host + " type=" + light.type);
            lights = this.look.getLights();
            light = lights[0];
            this.light = light;
            if (this.light) {
                action();
                light.socket.end();
                light.socket.destroy();
            }
        });
    }
    async getDeviceInfo() {
        this.findDeviceAndDoTheMagic(() => {
            this.res.json({
                light: this.look.getLights()[0]
            });
        });
    }
    setDevice(body) {
        this.findDeviceAndDoTheMagic(() => {
            const deviceType = this.device.type;
            this[deviceType](body);
        });
    }
    lightsource(body) {
        const reqCommands = body.commands;
        if (reqCommands.switch === true)
            this.light.setPower('on');
        if (reqCommands.switch === false)
            this.light.setPower('off');
        let delay = 0.1;
        if (reqCommands.delay)
            delay = reqCommands.delay;
        if (reqCommands.bright_value != undefined)
            this.light.setBright(reqCommands.bright_value);
        if (reqCommands.ct != undefined)
            this.light.setCT(reqCommands.ct);
        if (reqCommands.hsv || reqCommands.rgb || reqCommands.color || reqCommands.hex) {
            this.light.setPower('on');
            if (reqCommands.hsv != undefined)
                this.light.setHSV([reqCommands.hsv.h, reqCommands.hsv.s, reqCommands.hsv.v], delay);
            if (reqCommands.rgb != undefined)
                this.light.setRGB([reqCommands.rgb.r, reqCommands.rgb.g, reqCommands.rgb.b], delay);
            if (reqCommands.hex != undefined) {
                const hsv = colorAlias_1.default.getHSVColorHEX(reqCommands.hex);
                this.light.setHSV([hsv.h, hsv.s, hsv.v], delay);
            }
            if (reqCommands.color != undefined) {
                const hsv = colorAlias_1.default.getHSVColorString(reqCommands.color);
                this.light.setHSV([hsv.h, hsv.s, hsv.v], delay);
            }
        }
        const deviceInfo = this.look.getLights()[0];
        this.res.json({
            name: deviceInfo.name,
            model: deviceInfo.model,
            power: deviceInfo.power,
            rgb: deviceInfo.rgb,
            hsb: deviceInfo.hsb,
            host: deviceInfo.host,
            port: deviceInfo.port,
        });
    }
}
exports.YeelightDriver = YeelightDriver;
//# sourceMappingURL=yeelightDriver.js.map