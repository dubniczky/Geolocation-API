import { readFileSync } from 'fs'


export function load(name) {
    const start = performance.now()
    console.log('Loading:', name)
    
    const data = JSON.parse( readFileSync(name, 'utf8') )

    // Print performance
    const stop = performance.now()
    console.log('Loaded', data.length, 'items in', Number( ((stop-start)/1000).toFixed(2) ), 's') // Conv back to number for console highlight

    return data
}


export function makeSearchList(cities) {
    let list = []
    for (let c of cities) {
        list.push(c['ascii_name'].toLowerCase())
    }
    return list
}