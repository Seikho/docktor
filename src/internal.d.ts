type RepositoryType = "Github" | "Gitlab"; 

declare interface Source {
    id: number;
    name: string;
    repository: string;
    repositoryType: RepositoryType;
    privateKey?: string;
    variables: string[]
    containerMinimumUptimeMs: number;
    containerMaximumRetries: number;
}

declare interface Image {
    id: number;
    imageName: string;
    sourceId: number;
    tag: string;
    exposedPorts: string;
}

declare interface Host {
    id: number;
    name?: string;
    sshHostname: string;
    sshPort: number;
    sshPrivateKey: string;
    dockerPort: number;
}

declare interface Container {
    id: number;
    imageId: number;
    hostId: number;
    name: string;
    dockerId: string;
    subdomains: string;
}

declare interface Configuration {
    dockerRegistryHostname: string;
    dockerRegistryPort: number;
    webPort: number;
}

declare module 'tunnel-ssh' {
    interface TunnelOptions {
        username?: string;
        host: string;
        privateKey?: string;
        port?: number;
        dstHost?: string;
        dstPort: number;
        localHost?: string;
        localPort?: number;
    }

    function tunnel(options: TunnelOptions, callback: (error?: any, server?: any) => void): void;

    export = tunnel;
}

declare module 'find-port' {
    function findPort(host: string, fromPort: number, toPort: number, callback: (ports: number[]) => void): void;

    export = findPort;
}