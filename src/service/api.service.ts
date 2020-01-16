import { get, post } from "./tool/http";

const debug = require('debug')('app:api.service');

export class ApiService {

    private serverUrl = 'http://localhost:3000/';  // URL to web api

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    async askNewOrder(carName: string) {

        return this.convPost('test/SearchUnFinishOrder',
            {
                carName,
            })
    }

    async finishOrder(carName: string, OrderId: number) {

        return this.convPost(`test/FinishOrder/${OrderId}`,
            {
                carName,
                OrderId,
            })
    }

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    // 共用
    private async convGet(path: string, body: any): Promise<any> {
        debug(`get path: %o`, path)

        const res = await get(this.serverUrl + path)
        .catch(this.handleError)

        return res
    }

    private async convPost(path: string, body: any): Promise<any> {
        debug(`post path: %o body: %o`, path, body)

        const res = await post(this.serverUrl + path, body)
            .catch(this.handleError)

        return res
    }

    private handleError(error: any): Promise<any> {
        debug('An error occurred', error);
        return Promise.reject({ success: false, result: undefined, error: error.message || error });
    }
}