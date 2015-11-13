import { ModelService, Callback } from 'kevoree-api';

export class ModelServiceImpl implements ModelService {

    getCurrentModel(): any {
        console.log('TODO getCurrentModel');
        return null;
    }

    submitScript(script: string, done?: Callback): void {
        console.log('TODO submitScript', script);
    }
}
