import colorAlias from "../humanInteraction/colorAlias";
import { Lookup } from "node-yeelight-wifi"
import { json } from 'body-parser';

export class YeelightDriver {
    private device: { id, key, name, brand, type, kind?, gwID?, ip?}
    private yeelight: any

    private res

    private look = new Lookup();
    private light

    constructor(device: { id, key, name, brand, type, kind?, gwID?, ip?}, res) {
        this.device = device
        this.res = res
    }

    private findDeviceAndDoTheMagic(action) {

        let lights
        this.look.on("detected", (light) => {
            console.log("new yeelight detected: host=" + light.host + " type=" + light.type);
            lights = this.look.getLights();
            light = lights[0];
            this.light = light
            if (this.light) {
                action()
                light.socket.end()
                light.socket.destroy()
            }
        });


    }

    public async getDeviceInfo() {
        this.findDeviceAndDoTheMagic(() => {
            this.res.json({
                light:
                    this.look.getLights()[0]
            })
        })
    }

    public setDevice(body) {
        this.findDeviceAndDoTheMagic(() => {
            const deviceType = this.device.type
            this[deviceType](body)
        })
    }

    public lightsource(body) {
        const reqCommands = body.commands

        if (reqCommands.switch === true)
            this.light.setPower('on');

        if (reqCommands.switch === false)
            this.light.setPower('off');

        let delay = 0.1
        if (reqCommands.delay)
            delay = reqCommands.delay


        if (reqCommands.bright_value != undefined)
            this.light.setBright(reqCommands.bright_value);

        if (reqCommands.ct != undefined)
            this.light.setCT(reqCommands.ct);


        if (reqCommands.hsv || reqCommands.rgb || reqCommands.color || reqCommands.hex) {
            this.light.setPower('on');

            if (reqCommands.hsv != undefined)
                this.light.setHSV([reqCommands.hsv.h, reqCommands.hsv.s, reqCommands.hsv.v], delay)

            if (reqCommands.rgb != undefined)
                this.light.setRGB([reqCommands.rgb.r, reqCommands.rgb.g, reqCommands.rgb.b], delay)

            if (reqCommands.hex != undefined) {
                const hsv = colorAlias.getHSVColorHEX(reqCommands.hex)
                this.light.setHSV([hsv.h, hsv.s, hsv.v], delay)
            }

            if (reqCommands.color != undefined) {
                const hsv = colorAlias.getHSVColorString(reqCommands.color)
                this.light.setHSV([hsv.h, hsv.s, hsv.v], delay)
            }

        }

        const deviceInfo = this.look.getLights()[0]
        this.res.json({
            name: deviceInfo.name,
            model: deviceInfo.model,
            power: deviceInfo.power,
            rgb: deviceInfo.rgb,
            hsb: deviceInfo.hsb,
            host: deviceInfo.host,
            port: deviceInfo.port,
        })
    }
}