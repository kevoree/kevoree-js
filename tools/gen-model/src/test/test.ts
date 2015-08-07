import { GenModel } from '../main/GenModel'
import { writeFile } from 'fs'
import { resolve } from 'path'

var g = new GenModel()
g.generate((err, model) => {
  if (err) {
    throw err
  } else {
    model = JSON.stringify(JSON.parse(model), null, 2)
    var modelPath = resolve(process.cwd(), 'kevlib.json')
    writeFile(modelPath, model, { encoding: 'utf8' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log('gen done')
      }
    })
  }
})
