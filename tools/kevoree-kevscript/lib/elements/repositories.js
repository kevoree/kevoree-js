function repositories(model) {
  let str = '';

  const repos = model.repositories.iterator();
  while (repos.hasNext()) {
    const repo = repos.next();
    if (str.length !== 0) {
      str += '\n';
    }
    str += '// DEPRECATED: repo "' + repo.url + '"';
  }

  return str;
}

module.exports = repositories;
