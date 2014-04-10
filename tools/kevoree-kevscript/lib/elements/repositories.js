/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var str = '';

    var repos = model.repositories.iterator();
    while (repos.hasNext()) {
        var repo = repos.next();
        if (str.length !== 0) {
            str += '\n';
        }
        str += 'repo "'+repo.url+'"';
    }

    return str;
};