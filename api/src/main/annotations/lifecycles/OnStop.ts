import { lifecycleMethod } from './lifecycleMethod';
import { MetaData } from '../../api/MetaData';

export function OnStop(async: boolean = false) {
    return lifecycleMethod(async, 'OnStop', MetaData.ON_STOP);
}
