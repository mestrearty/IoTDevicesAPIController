"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TuyAPI = require("tuyapi");
const colorTerminal_1 = require("../utils/colorTerminal");
class TuyaAPI {
    constructor(id, key, kind, gwID, ip) {
        if (gwID)
            this.device = new TuyAPI({ gwID, ip, id, key, issueGetOnConnect: false });
        else
            this.device = new TuyAPI({ id, key, issueGetOnConnect: false });
        console.log(this.device);
        /*
        // Add event listeners
        this.device.on('connected', () => {
          console.log('Connected to device!');
        });
    
        this.device.on('disconnected', () => {
          console.log('Disconnected from this.device.');
        });
    
        this.device.on('error', error => {
          console.log('Error!', error);
        });
    
        this.device.on('data', data => {
          console.log('Data from device:', data);
    
          //console.log(`Boolean status of default property: ${data.dps['20']}.`);
    
          // Set default property to opposite
          if (!stateHasChanged) {
            this.device.set({ set: !(data.dps['20']) });
    
            // Otherwise we'll be stuck in an endless
            // loop of toggling the state.
            stateHasChanged = true;
          }
        });
    */
    }
    async sendAnActionToDevice(data, res) {
        await this.device.find();
        await this.device.connect();
        let status = await this.device.get();
        console.log(`Current status: ${status}.`);
        this.getDevice(res);
    }
    ;
    async setDevice(data, res) {
        await this.device.find();
        await this.device.connect();
        console.log({ data });
        this.device.set({
            multiple: true,
            data
        }).then(() => {
            console.log('Alteração Concluida');
        }).then(() => { this.getDevice(res); });
    }
    async getDevice(res) {
        await this.device.find();
        await this.device.connect();
        console.log(this.device.foundDevices);
        let status = await this.device.get();
        colorTerminal_1.default.IoTMsg(`Current Tuya required device status: ${status}.`);
        let data = await this.device.get({ schema: true });
        this.disconect();
        res.json(data);
    }
    disconect() {
        this.device.disconnect();
    }
}
exports.TuyaAPI = TuyaAPI;
/* Devices Keys

Lampada Positivo
https://developer.tuya.com/en/docs/iot/generic-light-bulb-template?id=Kag3g03a9vy81
const device = new TuyAPI({
  id: 'eb541394999858d637nrco',
  key: '507033fb949d09dc'
});

Tomata A
const device = new TuyAPI({
  id: '6043675024a1600cf7aa',
  key: '39197e8a3c91ced3'
});

Tomata B
const device = new TuyAPI({
  id: '6043675070039fcf97d9',
  key: '86d4b46dc9b4ff98'
});


Controlador Infra
const device = new TuyAPI({
  id: '0065724624a1602223cb',
  key: 'a01e14ab33421b4c'
});
*/ 
//# sourceMappingURL=tuyaAPI.js.map