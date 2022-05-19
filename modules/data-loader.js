import { load } from 'js-yaml'
import { readFileSync } from 'fs'
import path from 'path'


function dataLoader(name) {
    const fpath = path.join('data', name)
    return load( readFileSync(fpath, 'utf8') )
}


export default dataLoader