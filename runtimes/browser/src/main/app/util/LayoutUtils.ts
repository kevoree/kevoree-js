import { Layout } from 'react-grid-layout';
import { LayoutDesc } from '../api/LayoutDesc';

export default class LayoutUtils {
    static equals(x: LayoutDesc<Layout[]>, y: LayoutDesc<Layout[]>): boolean {
      // TODO take care this works as long as the properties are in the same order
      // TODO => JSON.stringify({ a: 0, b: 1 }) !== JSON.stringify({ b: 1, a: 0 });
      return JSON.stringify(x) === JSON.stringify(y);
    }
}
