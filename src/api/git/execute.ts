import canExecute from './can-execute';
import { exec } from 'child_process';
import { resolve as resolvePath } from 'path';

export default async function execute(source: Source, command: string): Promise<boolean> {
    if (canExecute(source) === false) {
        throw new Error('Unable to execute command: Command already in progress for this Source');
    }

    const promise = new Promise<boolean>((resolve, reject) => {
        const proc = exec(command, {
            cwd: getSourcePath(source),
        }, (error, stdout, stderr) => {
            if (error) return reject(error);
            /**
             * TODO: Add logging
             * proc.stdout.on('data', ... )
             */            
            resolve(true);
        });

        proc.stdout.on('data', (d: Buffer) => console.log(d.toString()));
    });

    return promise;
}

function getSourcePath(source: Source) {
    return resolvePath(__dirname, '../../../repositories', source.id);
}