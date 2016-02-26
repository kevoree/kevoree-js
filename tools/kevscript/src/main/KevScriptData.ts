import { org } from 'kevoree-model';

export interface KevScriptData {
  kevs: string;
  ctxModel?: org.kevoree.Model;
  ctxVars?: Object;
}
