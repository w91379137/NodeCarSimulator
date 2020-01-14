
require('source-map-support').install();

let debug = require('debug')('app:main')

//====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
// 本地服務建立

import { GlobalUse } from './global-use';

import { storage } from './service/localstorage';
GlobalUse.myStorage = storage
// GlobalUse.myStorage.setItem('time', (new Date()).toString());
// GlobalUse.myStorage.getItem('time'));

import { append } from './service/append';
GlobalUse.append = append
// GlobalUse.append("data/data.txt", "test")

import { log } from './service/log';
GlobalUse.log = log
// GlobalUse.log("test")

//====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
// server 屬性建立

import * as express from 'express';
import { Server } from './server/server';
import { RootController } from './server/controller/root-controller';

// Middleware 中介軟體
function loggerMiddleware(req: express.Request, res: express.Response, next) {
    debug(`Method:${req.method} Path:${req.path} Body:${JSON.stringify(req.body)}`);
    next();
}

const port = 5000;
let server = new Server({
    port: port,
    controllers: [
        new RootController()
    ],
    middlewares: [
        loggerMiddleware
    ],
})

server.start()