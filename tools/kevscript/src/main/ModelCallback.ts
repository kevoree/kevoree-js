import { org } from 'kevoree-model';

export interface ModelCallback {
  (err: Error, model?: org.kevoree.Model): void;
}
