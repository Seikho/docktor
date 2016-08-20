import tunnel = require('tunnel-ssh');
import getPort from './port';

/**
 * Create an SSH tunnel to the Host's SSH server and make the Docker TCP port the destination
 * This enables secure connections to Docker to Hosts outside of the Docktor's local network
 */
export default async function createTunnel(host: Host) {
    try {
        const port = await getPort();
        const config = {
            host: host.sshHostname,
            port: host.sshPort,
            privateKey: host.sshPrivateKey,
            dstHost: host.sshHostname,
            dstPort: host.dockerPort,
            localHost: '127.0.0.1',
            localPort: port
        }

        const promise = new Promise((resolve, reject) => {
            tunnel(config, (error, server) => {
                if (error) return reject(error);
                resolve();
            })
        });
        await promise;
        return port;
    }
    catch (ex) {
        throw ex;
    }
}