var GenModel_1 = require('../main/GenModel');
var fs_1 = require('fs');
var path_1 = require('path');
var g = new GenModel_1.GenModel();
g.generate(function (err, model) {
    if (err) {
        throw err;
    }
    else {
        var modelPath = path_1.resolve(process.cwd(), 'kevlib.json');
        fs_1.writeFile(modelPath, model + '\n', { encoding: 'utf8' }, function (err) {
            if (err) {
                throw err;
            }
            else {
                console.log('gen done');
            }
        });
    }
});
