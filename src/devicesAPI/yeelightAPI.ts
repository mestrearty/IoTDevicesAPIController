import { Lookup } from "node-yeelight-wifi"
import { Yeelight } from "node-yeelight-wifi"
import colorTerminal from "../utils/colorTerminal";
import colorAlias from "../humanInteraction/colorAlias";
//const Lookup = require("../index").Lookup;
//const Yeelight = require("../index").Yeelight;

export class YeelightAPI {

    private look = new Lookup();
    private light
    constructor() {
        this.look.on("detected", (light) => {
            console.log("new yeelight detected: host=" + light.host + " type=" + light.type);
        });
        this.statusChecker()
    }

    public setBright(intencity) {
        //intencity could be 0 to 100
        if (this.light)
            this.light.setBright(intencity);
    }

    public setHEX(hex) {
        this.setPowerOn()
        var Color = require('color');
        let color = Color(hex)
        this.light.setRGB(color.rgb().array()).then(() => {
            console.log("setRGB promise resolved");
        }).catch((error => {
            console.log("promise rejected");
            console.log(error);
        }));
    }

    public setHSV([H, S, V], dur) {
        //https://github.com/Bastl34/node-yeelight-wifi/blob/4a4a308026ced9feafb4fc9dfc25f372fd7afe79/yeelight.js#L13
        //"hue", "sat", "effect", "duration"
        //H 0-360, S & V 0-100,  - 1000
        if (this.light)
            this.light.setHSV([H, S, V], dur);
    }

    public setColor(color) {
        this.setPowerOn()
        const colorFunction = color + "HSV"
        colorTerminal.alertMsg({
            action: "Setting color", color, alias: colorAlias[colorFunction]()
        })
        if (this.light && colorAlias[colorFunction]()) {
            const colorTranslated = colorAlias[colorFunction]()
            const h = colorTranslated[0]
            const s = colorTranslated[1]
            const v = colorTranslated[2]

            this.light.setHSV([h, s, v], 1);
        }

    }

    public setColorRGB(R, G, B) {
        this.setPowerOn()
        this.light.setRGB([R, G, B]).then(() => {
            console.log("setRGB promise resolved");
        }).catch((error => {
            console.log("promise rejected");
            console.log(error);
        }));
    }

    public setPowerOn() {
        this.light.setPower('on');
    }

    public setPowerOff() {
        this.light.setPower('off');
    }

    public setCT(ct) {
        //ct: 1700 ~ 6500

        this.light.setCT(ct);
    }

    public getLight() {
        return { light: this.light }
    }

    private statusChecker() {
        console.log("Iniciando o check da yeelight")
        setTimeout(() => {
            let lights = this.look.getLights();

            if (lights.length == 0) {
                console.log("no yeelight found");
                return;
            }

            let light = lights[0];
            this.light = light
            // ******************* state updates *******************
            light.on("connected", () => {
                console.log("connected");
            });

            light.on("disconnected", () => {
                console.log("disconnected");
            });

            light.on("stateUpdate", (light) => {
                console.log(light.rgb);
            });

            light.on("failed", (error) => {
                console.log(error);
            });


            // ******************* setter *******************
            /*
            if (light.type == "color") {
                light.setRGB([255, 255, 0]).then(() => {
                    console.log("setRGB promise resolved");
                }).catch((error => {
                    console.log("promise rejected");
                    console.log(error);
                }));
            }
            light.updateState().then(() => {
                console.log("updateState promise resolved");
            }).catch((error => {
                console.log("promise rejected");
                console.log(error);
            }));
    
    
            setInterval(() => {
                if (light.bright < 100)
                    light.setBright(100);
                else
                    light.setBright(10);
            }, 1000);
            */
            //light.setBright(100);
            //light.setHSV([298,100,100],1000);
            //light.setPower('on');
            //light.setCT(5000);



            setInterval(() => {
                light.updateState().then(() => {
                    console.log("updateState promise resolved");
                }).catch((error => {
                    console.log("promise rejected");
                    console.log(error);
                }));
            }, 10000)

        }, 1500);
    }


}


export default new YeelightAPI()