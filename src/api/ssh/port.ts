import findPort = require('find-port');

export default function getFreePort() {
    const promise = new Promise<number>((resolve, reject) => {
        findPort('127.0.0.1', 40000, 5000, ports => {
            if (ports.length === 0) return reject('No available port found');
            resolve(ports[0]);
        });
    });

    return promise;
}