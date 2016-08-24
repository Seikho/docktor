import Dockerode from 'dockerode-ts';

/**
 * Calls 'docker build' on against a Source git repository
 */
export default async function buildImage(source: Source): Promise<string> {
    const client = new Dockerode();
    
}