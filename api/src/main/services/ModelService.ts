import { Callback } from '../api/Callback';

export interface ModelService {
    getCurrentModel(): any;
    submitScript(script: string, done?: Callback): void;
}
