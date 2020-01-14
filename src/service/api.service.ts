import { post } from "./tool/post";

const debug = require('debug')('app:api.service');

export class ApiService {

    private serverUrl = 'http://127.0.0.1:5000/';  // URL to web api

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    async askNewTask(carName: string) {
        return this.convenientReq('askNewTask',
            {
                carName,
            })
    }

    async finishTask(carName: string, taskID: number) {

        return this.convenientReq('finishTask',
            {
                carName,
                taskID,
            })
    }

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    // 共用
    private async convenientReq(path: string, body: any): Promise<any> {
        debug(`api path: %o body: %o`, path, body);
        // console.log('api', path);

        const res = await post(this.serverUrl + path, body)
            .catch(this.handleError);

        return res;
    }

    private handleError(error: any): Promise<any> {
        debug('An error occurred', error);
        return Promise.reject({ success: false, result: undefined, error: error.message || error });
    }
}