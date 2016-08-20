import {ContainerInfo} from 'dockerode-ts';
import docker from '../connect';

export default async function listContainers(host: Host): Promise<Array<ContainerInfo>> {
    const client = await docker(host);
    const promise = new Promise<Array<ContainerInfo>>((resolve, reject) => {
        client.listContainers((error, list) => {
            if (error) return reject(error);
            resolve(list);
        })
    });
    const containers = await promise;
    return containers;
} 