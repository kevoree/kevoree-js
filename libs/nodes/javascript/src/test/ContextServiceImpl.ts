import { ContextService } from 'kevoree-api';

export class ContextServiceImpl implements ContextService {

    constructor(private instanceName: string, private nodeName: string) {}

    getInstanceName(): string {
        return this.instanceName;
    }

    getNodeName(): string {
        return this.nodeName;
    }
}