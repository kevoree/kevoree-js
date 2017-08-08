function is(a, b, opts) {
  if (a === b) {
    return opts.fn(this); // eslint-disable-line no-invalid-this
  } else {
    return opts.inverse(this); // eslint-disable-line no-invalid-this
  }
}

module.exports = is;
