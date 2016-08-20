# Docktor

## Schema

### Source
- `id` number [PK]
- `name` string [REQUIRED]
- `repository` string, "namespace/repository" [REQUIRED]
- `repositoryType` string, "Github" | "Gitlab" [REQUIRED]
- `privateKey` string [OPTIONAL]
- `variables` string [OPTIONAL]
- `containerMinimumUptimeMs` number [REQUIRED, DEFAULT `2000`]
- `containerMaximumRetries` number [REQUIRED, DEFAULT `3`]

```ts
type RepositoryType = "Github" | "Gitlab"

interface Source {
    id: number;
    name: string;
    repository: string;
    repositoryType: RepositoryType;
    privateKey?: string;
    variables: string[]
    containerMinimumUptimeMs: number;
    containerMaximumRetries: number;
}
```

### Image
`id` number [PK]
`sourceId` number [FK]
`tag` string [REQUIRED]
`exposedPorts` string, JSON `Array<number>` [REQUIRED]

```ts
interface Image {
    id: number;
    sourceId: number;
    tag: string;
    exposedPorts: string;
}
```

### Host
`id` number [PK]
`name` string [OPTIONAL]
`sshHostname` string, IP or FQDN [REQUIRED]
`sshPort` number [REQUIRED]
`sshUsername` string [REQUIRED]
`sshPrivateKey` string, PASSWORD or RSA PRIVATE KEY [REQUIRED]
`dockerPort` port [REQUIRED]

```ts
interface Host {
    id: number;
    name?: string;
    sshHostname: string;
    sshPort: number;
    sshPrivateKey: string;
    dockerPort: number;
}
```

### Container
`id` number [PK]
`imageId` number [FK]
`hostId` number [FK]
`name` string [REQUIRED]
`dockerId` string [REQUIRED]
`subdomains` string, JSON `{ [subdomain: string]: number } [REQUIRED]

```ts
interface Container {
    id: number;
    imageId: number;
    hostId: number;
    name: string;
    dockerId: string;
    subdomains: string;
}
```

### Configuration
What's a better way to store this information? The database will do... for now

`dockerRegistryHostname` string [REQUIRED]
`dockerRegistryPort` number [REQUIRED]
`webPort`

```ts
interface Configuration {
    dockerRegistryHostname: string;
    dockerRegistryPort: number;
    webPort: number;
}
```
## Web API

```ts
type Resource = Source | Image | Host | Container | Configuration;
```

RESTful

### All resources

`GET /resource/{id}` => `Resource`  
`GET /resource` => `Array<Resource>`  
`POST /resource` => `Array<Resource>`, payload: `{ creates: Array<Resource>, edits: Array<Resource>, deletes: Array<Resource> }`  

#### Caveats
When returning a `Resource` that contains a private key, return an empty string if it is empty or return `"********"` if it is not empty.
