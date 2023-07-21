import colorAlias from "../humanInteraction/colorAlias";
import colorTerminal from "../utils/colorTerminal";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import { json } from "body-parser";

export class TuyaDriver {
  private device: { id; key; name; brand; type; kind?; gwID?; ip? };
  private tuya: any;
  private baseUrl = "https://openapi.tuyaus.com";
  private accessKey = "x5tj3h37aq8hybfgfqky";
  private secretKey = "7c8900fac5ca4a7fa318713b5748d2f4";
  private res;

  constructor(device: { id; key; name; brand; type; kind?; gwID?; ip? }, res) {
    this.device = device;
    this.res = res;

    this.tuya = new TuyaContext({
      baseUrl: this.baseUrl,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
    });
  }

  public getDeviceInfo() {
    this.devicesHttpRequest();
  }

  public setDevice(body) {
    const deviceType = this.device.type;
    this[deviceType](body);
    // this.devicesHttpRequest('commands', body)
  }

  private async devicesHttpRequest(type?, body?) {
    let path = `/v1.0/devices/${this.device.id}`;
    let method = "GET";

    if (type == "commands") {
      method = "POST";
      path = `/v1.0/devices/${this.device.id}/commands`;
    }
    let response = await this.tuya.request({
      method,
      path,
      body: { commands: body },
    });
    console.log({ id: this.device.id, body, response });
    this.res.json(response);
  }

  public socket(body) {
    const reqCommands = body.commands;
    let commands: any = [];

    if (reqCommands.switch != undefined) {
      commands.push({
        code: "switch_1",
        value: reqCommands.switch,
      });
    }

    if (reqCommands.countdown != undefined)
      commands.push({
        code: "countdown_1",
        value: reqCommands.countdown,
      });

    this.devicesHttpRequest("commands", commands);
  }

  public infrared_tv(body) {
    const reqCommands = body.commands;
    let commands: any = [];

    if (reqCommands.switch != undefined) {
      commands.push({
        code: "switch",
        value: reqCommands.switch,
      });
    }

    if (reqCommands.direction != undefined)
      commands.push({
        code: "direction",
        value: reqCommands.direction,
      });

    if (reqCommands.volume_control != undefined)
      commands.push({
        code: "volume_control",
        value: reqCommands.volume_control,
      });

    if (reqCommands.option != undefined)
      commands.push({
        code: "option",
        value: reqCommands.option,
      });

    if (reqCommands.channel_control != undefined)
      commands.push({
        code: "channel_control",
        value: reqCommands.channel_control,
      });

    if (reqCommands.channel != undefined)
      commands.push({
        code: "channel",
        value: reqCommands.channel,
      });
    this.devicesHttpRequest("commands", commands);
  }

  public lightsource(body) {
    const reqCommands = body.commands;
    let commands: any = [];

    if (reqCommands.switch != undefined)
      commands.push({
        code: "switch_led",
        value: reqCommands.switch,
      });

    if (reqCommands.work_mode != undefined)
      commands.push({
        code: "work_mode",
        value: reqCommands.work_mode,
      });

    if (reqCommands.bright_value != undefined)
      commands.push({
        code: "bright_value_v2",
        value: reqCommands.bright_value,
      });

    if (reqCommands.temp_value != undefined)
      commands.push({
        code: "temp_value_v2",
        value: reqCommands.temp_value,
      });

    if (reqCommands.countdown != undefined)
      commands.push({
        code: "countdown_1",
        value: reqCommands.countdown,
      });

    if (reqCommands.hsv || reqCommands.rgb || reqCommands.color) {
      if (reqCommands.work_mode == undefined) {
        commands.push({
          code: "work_mode",
          value: "colour",
        });
      }
      if (reqCommands.switch == undefined) {
        commands.push({
          code: "switch_led",
          value: true,
        });
      }
    }

    if (reqCommands.hsv != undefined) {
      commands.push({
        code: "colour_data_v2",
        value: reqCommands.hsv,
      });
    }

    if (reqCommands.rgb != undefined) {
      commands.push({
        code: "colour_data_v2",
        value: colorAlias.getHSVColorRGB(
          reqCommands.rgb.r,
          reqCommands.rgb.g,
          reqCommands.rgb.b
        ),
      });
    }
    if (reqCommands.hex != undefined) {
      commands.push({
        code: "colour_data_v2",
        value: colorAlias.getHSVColorHEX(reqCommands.hex),
      });
    }

    if (reqCommands.color != undefined) {
      commands.push({
        code: "colour_data_v2",
        value: colorAlias.getHSVColorString(reqCommands.color),
      });
    }

    this.devicesHttpRequest("commands", commands);
  }
}
