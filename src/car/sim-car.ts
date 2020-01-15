
import { v4 as uuid } from 'uuid';
import * as mqtt from 'mqtt';
import { GlobalUse } from '../global-use';
let debugLib = require('debug')

const NewOrderChannel = 'home'

export class SimCar {

    uuid = uuid().slice(0, 13);
    debug = debugLib(`app:car:${this.uuid}`)

    constructor(config: any = {}) {

        this.debug('create')

        const opt = {
            port: 1883,
            clientId: `car:${this.uuid}`
        }

        // TODO: 這個 client 應該分出去 全部車子共用？ 不用？
        const client = mqtt.connect('mqtt://localhost', opt)

        client.on('connect', (packet) => {
            this.debug('mqtt connect')

            client.subscribe(NewOrderChannel, (err) => {
                if (err) {
                    this.debug(err)
                }
                // else {
                //     client.publish(NewOrderChannel, 'Hello mqtt')
                // }

                // 開機先問
                this.askNewOrder()
            })
        })

        client.on('message', (topic, message) => {
            this.debug(topic, message.toString())

            if (topic === NewOrderChannel) {
                this.askNewOrder()
            }
        })
    }

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    isWorking = false;
    async askNewOrder() {

        if (this.isWorking) {
            this.debug('busy in work')
        }
        else {
            // this.work(1000) // 測試用
            this.debug(`ask new task`)
            let res = await GlobalUse.api.askNewOrder(this.uuid)
            if (res.OrderId) {
                this.debug(`get task:${res.OrderId}`)
                this.work(res.OrderId)
            }
            else {
                this.debug(`get task fail`)
            }
        }
    }

    orderId = -1
    async work(orderId: number) {

        if (this.isWorking) {
            this.debug(`busy in work task:${orderId} fail`)
            return
        }

        this.orderId = orderId
        this.isWorking = true

        {
            // 車子工作
            let time = random(9000, 5000)
            this.debug(`work for task:${orderId} use time:${time} ms`)
            await delay(time)
            await GlobalUse.api.finishOrder(this.uuid, this.orderId)

            this.debug(`finish task:${orderId} use time:${time} ms`)

            // 車子休息
            await delay(1000)
        }

        this.isWorking = false

        this.askNewOrder()
    }

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

}

function random(max, min) {
    return Math.floor(Math.random() * Math.floor(max - min) + min)
}

function delay(time) {
    // https://www.oxxostudio.tw/articles/201706/javascript-promise-settimeout.html
    return new Promise((resolve, _) => {
        setTimeout(function () {
            resolve()
        }, time)
    })
}
