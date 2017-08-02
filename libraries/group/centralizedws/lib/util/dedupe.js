module.exports = function dedupe(arr) {
  const obj = {};
  const deduped = [];
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  for (const key in obj) {
    deduped.push(key);
  }
  return deduped;
};
