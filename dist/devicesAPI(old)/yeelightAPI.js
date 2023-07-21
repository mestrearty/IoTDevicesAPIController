"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_yeelight_wifi_1 = require("node-yeelight-wifi");
const colorTerminal_1 = require("../utils/colorTerminal");
const colorAlias_1 = require("../humanInteraction/colorAlias");
//const Lookup = require("../index").Lookup;
//const Yeelight = require("../index").Yeelight;
class YeelightAPI {
    constructor() {
        this.look = new node_yeelight_wifi_1.Lookup();
        this.look.on("detected", (light) => {
            console.log("new yeelight detected: host=" + light.host + " type=" + light.type);
        });
        this.statusChecker();
    }
    setBright(intencity) {
        //intencity could be 0 to 100
        if (this.light)
            this.light.setBright(intencity);
    }
    setHEX(hex) {
        this.setPowerOn();
        var Color = require('color');
        let color = Color(hex);
        this.light.setRGB(color.rgb().array()).then(() => {
            console.log("setRGB promise resolved");
        }).catch((error => {
            console.log("promise rejected");
            console.log(error);
        }));
    }
    setHSV([H, S, V], dur) {
        //https://github.com/Bastl34/node-yeelight-wifi/blob/4a4a308026ced9feafb4fc9dfc25f372fd7afe79/yeelight.js#L13
        //"hue", "sat", "effect", "duration"
        //H 0-360, S & V 0-100,  - 1000
        if (this.light)
            this.light.setHSV([H, S, V], dur);
    }
    setColor(color) {
        this.setPowerOn();
        const colorFunction = color + "HSV";
        colorTerminal_1.default.alertMsg({
            action: "Setting color", color, alias: colorAlias_1.default[colorFunction]()
        });
        if (this.light && colorAlias_1.default[colorFunction]()) {
            const colorTranslated = colorAlias_1.default[colorFunction]();
            const h = colorTranslated[0];
            const s = colorTranslated[1];
            const v = colorTranslated[2];
            this.light.setHSV([h, s, v], 1);
        }
    }
    setColorRGB(R, G, B) {
        this.setPowerOn();
        this.light.setRGB([R, G, B]).then(() => {
            console.log("setRGB promise resolved");
        }).catch((error => {
            console.log("promise rejected");
            console.log(error);
        }));
    }
    setPowerOn() {
        this.light.setPower('on');
    }
    setPowerOff() {
        this.light.setPower('off');
    }
    setCT(ct) {
        //ct: 1700 ~ 6500
        this.light.setCT(ct);
    }
    getLight() {
        return { light: this.light };
    }
    statusChecker() {
        console.log("Iniciando o check da yeelight");
        setTimeout(() => {
            let lights = this.look.getLights();
            if (lights.length == 0) {
                console.log("no yeelight found");
                return;
            }
            let light = lights[0];
            this.light = light;
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
            }, 10000);
        }, 1500);
    }
}
exports.YeelightAPI = YeelightAPI;
exports.default = new YeelightAPI();
//# sourceMappingURL=yeelightAPI.js.map