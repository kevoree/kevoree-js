import { lifecycleMethod } from '../util/lifecycleMethod';
import { MetaData } from '../MetaData';

export function Start(async: boolean = false) {
    return lifecycleMethod(async, 'Start', MetaData.START);
}
