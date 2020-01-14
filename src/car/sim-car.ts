
import { v4 as uuid } from 'uuid';
import * as mqtt from 'mqtt';
let debugLib = require('debug')

const NewOrderChannel = '監聽主機 有新的 訂單頻道'

export class SimCar {

    uuid = uuid().slice(0, 13);

    carDebug = debugLib(`app:car:${this.uuid}`)

    constructor(config: any = {}) {

        this.debug('create')

        const opt = {
            port: 1883,
            clientId: `car:${this.uuid}`
        }
        const client = mqtt.connect('mqtt://127.0.0.1', opt)

        client.on('connect', (packet) => {
            this.debug('mqtt connect')

            client.subscribe(NewOrderChannel, (err) => {
                if (err) {
                    this.debug(err)
                }
                // else {
                //     client.publish(NewOrderChannel, 'Hello mqtt')
                // }
            })
        })

        client.on('message', (topic, message) => {
            this.debug(topic, message.toString())
        })
    }


    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    debug(...args: any[]) {
        args.unshift(`car:${this.uuid}`)
        this.carDebug(...args)
    }


}