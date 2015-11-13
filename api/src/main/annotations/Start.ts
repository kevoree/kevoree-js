import { lifecycleMethod } from '../util/lifecycleMethod';
import { MetaData } from './metas/MetaData';

export function Start(async: boolean = false) {
    return lifecycleMethod(async, 'Start', MetaData.START);
}
