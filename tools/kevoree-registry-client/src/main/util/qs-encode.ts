export default function qsEncode(obj: { [key: string]: string }) {
  return Object.keys(obj).reduce((params, key, i) => {
    return params + (i > 0 ? '&' : '') + key + '=' + obj[key];
  }, '');
}
