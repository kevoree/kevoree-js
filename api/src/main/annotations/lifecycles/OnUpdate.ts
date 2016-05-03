import { lifecycleMethod } from './lifecycleMethod';
import { MetaData } from '../../api/MetaData';

export function OnUpdate(async: boolean = false) {
    return lifecycleMethod(async, 'OnUpdate', MetaData.ON_UPDATE);
}
