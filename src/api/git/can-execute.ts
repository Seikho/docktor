
/**
 * Git operations against a source can only be executed one at a time
 * We will use a semaphor to ensure 
 */
export default function canExecute(source: Source): boolean {
    if (semaphors[source.id] == null) {
        semaphors[source.id] = false;
    }

    return semaphors[source.id];
}

const semaphors: { [sourceId: number]: boolean } = {}