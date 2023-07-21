
class DeviceList {
    private deviceList = [
        {
            id: '6043675024a1600cf7aa',
            key: '39197e8a3c91ced3',
            brand: 'tuya',
            name: 'tomadaA',
            type: 'socket'
        },
        {
            id: '6043675070039fcf97d9',
            key: '86d4b46dc9b4ff98',
            brand: 'tuya',
            name: 'tomadaB',
            type: 'socket'
        },
        {
            id: 'eb541394999858d637nrco',
            key: '507033fb949d09dc',
            brand: 'tuya',
            name: 'lampada2',
            type: "lightsource"
        },
        {
            id: '0x000000000795eeb3',
            key: 'xiaomi',
            brand: 'yeelight',
            name: 'teto',
            type: "lightsource"
        },
        {
            id: '0065724624a1602223cb',
            key: 'a01e14ab33421b4c',
            brand: 'tuya',
            name: 'SmartControleUniversal',
            type: "urc" //Universal Remote Control
        },
        {
            gwID: 'a01e14ab33421b4c',
            id: 'eb05f49257ea519c29zqaa',
            key: 'a01e14ab33421b4c',
            brand: 'tuya',
            name: 'TV',
            type: "infrared_tv"
        }
    ]
    
    private socket = [
        {
            id: '6043675024a1600cf7aa',
            key: '39197e8a3c91ced3',
            brand: 'tuya',
            name: 'TomadaA',
            type: 'Socket'
        },
        {
            id: '6043675070039fcf97d9',
            key: '86d4b46dc9b4ff98',
            brand: 'tuya',
            name: 'TomadaB',
            type: 'Socket'
        }
    ]

    private light = [{
        id: 'eb541394999858d637nrco',
        key: '507033fb949d09dc',
        brand: 'tuya',
        name: 'lampada2',
        type: "Light Source"
    }, {
        id: '0x000000000795eeb3',
        key: 'xiaomi',
        brand: 'yeelight',
        name: 'yeelight',
        type: "Light Source"
    }]

    private universalRemoteControl = [{
        id: '0065724624a1602223cb',
        key: 'a01e14ab33421b4c',
        brand: 'tuya',
        name: 'Smart Controle Universal',
        type: "Universal Remote Control"
    }]

    private tvControll = [{
        gwID: 'eb05f49257ea519c29zqaa',
        id: '0065724624a1602223cb',
        key: 'a01e14ab33421b4c',
        brand: 'tuya',
        name: 'TV',
        type: "tv"
    }]

    constructor() { }

    getDevice(query) {
        for (let i = 0; i < this.deviceList.length; i++) {
            const element = this.deviceList[i]
            if (element.id == query.id || element.key == query.key || element.name == query.name) {
                return element
            }
        }
    }

    getSocketList() {
        return this.socket
    }

    getLightList() {
        return this.light
    }

    getUniversalRemoteControlList() {
        return this.universalRemoteControl
    }

    getTvControllList() {
        return this.tvControll
    }

    getLight(idKeyOrName): any {
        for (let i = 0; i < this.light.length; i++) {
            const element = this.light[i]
            if (element.id == idKeyOrName || element.key == idKeyOrName || element.name == idKeyOrName) {
                return element
            }
        }
    }


}


export default new DeviceList()