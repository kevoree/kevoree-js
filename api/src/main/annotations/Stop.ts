import { lifecycleMethod } from '../util/lifecycleMethod';
import { MetaData } from './metas/MetaData';

export function Stop(async: boolean = false) {
    return lifecycleMethod(async, 'Stop', MetaData.STOP);
}
