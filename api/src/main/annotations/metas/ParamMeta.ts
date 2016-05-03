export type ParamType = 'int' | 'long' | 'float' | 'double' | 'short' | 'choice' |
    'array' | 'string' | 'boolean';

export interface ParamMeta {
  type?: ParamType;
}
