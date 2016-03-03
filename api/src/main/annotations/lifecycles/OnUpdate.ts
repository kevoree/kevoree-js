import { lifecycleMethod } from '../../util/lifecycleMethod';
import { MetaData } from '../../MetaData';

export function OnUpdate(async: boolean = false) {
    return lifecycleMethod(async, 'OnUpdate', MetaData.ON_UPDATE);
}
