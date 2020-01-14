
import { v4 as uuid } from 'uuid';
import * as mqtt from 'mqtt';
import { GlobalUse } from '../global-use';
let debugLib = require('debug')

const NewOrderChannel = '監聽主機 有新的 訂單頻道'

export class SimCar {

    uuid = uuid().slice(0, 13);
    debug = debugLib(`app:car:${this.uuid}`)

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

            if (topic === NewOrderChannel) {
                this.askNewTask()
            }
        })
    }

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    isWorking = false;
    async askNewTask() {

        if (this.isWorking) {
            this.debug('busy in work')
        }
        else {
            let res = await GlobalUse.api.askNewTask(this.uuid)
            if (res.success) {
                this.work(res.taskID)
            }
        }
    }

    taskID = -1
    async work(taskID: number) {

        if (this.isWorking) {
            this.debug(`busy in work task:${taskID} fail`)
            return
        }

        this.isWorking = true
        this.taskID = taskID

        let time = random(9000, 5000)
        this.debug(`work for task:${taskID} use time:${time} ms`)
        await delay(time)

        this.debug(`finish task:${taskID} use time:${time} ms`)

        await delay(1000) // 車子休息
        this.isWorking = false

        this.askNewTask()
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
