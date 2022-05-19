import yaml from 'js-yaml'
import { readFileSync } from 'fs'
import path from 'path'


export function load(name) {
    const start = performance.now()
    const fpath = path.join('data', name)
    console.log('Loading: ', fpath)    
    const data = yaml.load( readFileSync(fpath, 'utf8') )

    // Extract fields only
    for (let i in data) {
        data[i] = data[i].fields
    }

    // Validate ascii_name-s
    for (let c of data) {
        if (c['ascii_name'] == null) {
            c['ascii_name'] = c['name'].replace(/[^\x00-\x7F]/g, "")
        }
    }

    // Print performance
    const stop = performance.now()
    console.log('Loaded ', data.length, ' items in:', (stop-start)/1000, 's')

    return data
}


export function makeSearchList(cities) {
    let list = []
    for (let c of cities) {
        list.push(c['ascii_name'].toLowerCase())
    }
    return list
}