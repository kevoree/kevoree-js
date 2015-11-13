import { lifecycleMethod } from '../util/lifecycleMethod';
import { MetaData } from './metas/MetaData';

export function Update(async: boolean = false) {
    return lifecycleMethod(async, 'Update', MetaData.UPDATE);
}
