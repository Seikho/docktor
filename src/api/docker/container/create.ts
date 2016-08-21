import getAvailableHost from '../host/available';
import getDocker from '../connect';
import {ContainerCreateOptions} from 'dockerode-ts'; 

export default async function create(image: Image): Promise<Container> {
    const host = await getAvailableHost();
    const docker = await getDocker(host);
    const options: ContainerCreateOptions = {
        Image: image.imageName
    }

    return null as any;
}