let request = require('request');

export function get(url) {
    return new Promise((resolve, reject) => {

        request.get({
            url: url,
            json: true,
        }, (err, httpResponse, body) => {
            if (err) {
                //console.error('error:', err);
                reject(err)
            } else {
                //console.error(body);
                resolve(body)
            }
        });
    })
}

export function post(url, data) {
    return new Promise((resolve, reject) => {

        request.post({
            url: url,
            json: true,
            form: data,
        }, (err, httpResponse, body) => {
            if (err) {
                //console.error('error:', err);
                reject(err)
            } else {
                //console.error(body);
                resolve(body)
            }
        });
    })
}
