import { lifecycleMethod } from '../../util/lifecycleMethod';
import { MetaData } from '../../MetaData';

export function OnStart(async: boolean = false) {
    return lifecycleMethod(async, 'OnStart', MetaData.ON_START);
}
