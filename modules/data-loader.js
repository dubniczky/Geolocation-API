import { load } from 'js-yaml'
import { readFileSync } from 'fs'
import path from 'path'


function dataLoader(name) {
    const start = performance.now()
    const fpath = path.join('data', name)
    console.log('Loading: ', fpath)    
    const data = load( readFileSync(fpath, 'utf8') )

    // Extract fields only
    for (let i in data) {
        data[i] = data[i].fields
    }

    // Print performance
    const stop = performance.now()
    console.log('Loaded ', data.length, ' items in:', (stop-start)/1000, 's')

    return data
}


export default dataLoader