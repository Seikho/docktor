import {ContainerInfo} from 'dockerode-ts';
import getDocker from '../connect';

export default async function listContainers(host: Host): Promise<Array<ContainerInfo>> {
    const docker = await getDocker(host);
    const promise = new Promise<Array<ContainerInfo>>((resolve, reject) => {
        docker.listContainers((error, list) => {
            if (error) return reject(error);
            resolve(list);
        })
    });
    const containers = await promise;
    return containers;
} 