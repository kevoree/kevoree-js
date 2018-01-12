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

export function queryparams() {
  return decodeURI(window.location.search.substr(1))
    .split('&')
    .reduce((params, value) => {
      const array = value.split('=');
      params[array[0]] = array[1];
      return params;
    }, {});
}

export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
