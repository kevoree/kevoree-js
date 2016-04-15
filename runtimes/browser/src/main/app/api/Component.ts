interface InternalLayout {
  w?: number;
  h?: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
}

export interface Component {
  name: string;
  type: string;
  hide: boolean;
  layout: InternalLayout;
}

export class Components {
  [name: string]: Component;
}
