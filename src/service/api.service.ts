import { post } from "./tool/post";

const debug = require('debug')('app:api.service');

export class ApiService {

    private serverUrl = 'http://localhost:3000/';  // URL to web api

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    async askNewOrder(carName: string) {

        return this.convenientReq('test/SearchUnFinishOrder',
            {
                carName,
            })
    }

    async finishOrder(carName: string, OrderId: number) {

        return this.convenientReq(`test/FinishOrder/${OrderId}`,
            {
                carName,
                OrderId,
            })
    }

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    // 共用
    private async convenientReq(path: string, body: any): Promise<any> {
        debug(`api path: %o body: %o`, path, body);
        // console.log(`api path: %o body: %o`, path, body);

        const res = await post(this.serverUrl + path, body)
            .catch(this.handleError);

        return res;
    }

    private handleError(error: any): Promise<any> {
        debug('An error occurred', error);
        return Promise.reject({ success: false, result: undefined, error: error.message || error });
    }
}