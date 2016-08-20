import Dockerode, * as Docker from 'dockerode-ts';
import createTunnel from '../ssh/tunnel';
/**
 * Create an SSH tunnel to the Host's Docker port and provide a Docker client that connects to it
 */
export default async function getClient(host: Host) {
    const dockerPort = await createTunnel(host);

    const client = new Dockerode({
        host: '127.0.0.1',
        port: dockerPort
    }); 

    // This will be an async function in the future, so let's treat it like one now
    return client;
}