import { GenModel } from '../main/GenModel';
import { writeFile } from 'fs';
import { resolve } from 'path';

var g = new GenModel();
g.generate(process.cwd(), (err, model) => {
  if (err) {
    throw err;
  } else {
    var modelPath = resolve(process.cwd(), 'kevlib.json');
    writeFile(modelPath, model+'\n', { encoding: 'utf8' }, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('gen done');
      }
    })
  }
})
