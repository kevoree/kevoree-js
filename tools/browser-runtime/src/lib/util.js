const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function randomId(length = 3) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += ALPHABET[randomInt(0, ALPHABET.length - 1)];
  }
  return id;
}

export function randomInt(min = 0, max = Infinity) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}
