import { lifecycleMethod } from '../../util/lifecycleMethod';
import { MetaData } from '../../MetaData';

export function OnStop(async: boolean = false) {
    return lifecycleMethod(async, 'OnStop', MetaData.ON_STOP);
}
