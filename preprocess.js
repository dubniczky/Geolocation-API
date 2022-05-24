// Prepares the city data for the api

import yaml from 'js-yaml'
import { readFileSync } from 'fs'
import path from 'path'

const config = yaml.load( readFileSync('preprocess.yml', 'utf8') )

// Read cities file
const start = performance.now()
console.log('Processing: ', config.cities.in)    
const cities = yaml.load( readFileSync(config.cities.in, 'utf8') )

// Extract fields only
for (let i in cities) {
    cities[i] = cities[i].fields
}

// Convert coords to key-value pairs
for (let c of cities) {
    const coords = c.coordinates
    c.coordinates = {
        lat: coords[0],
        lon: coords[1]
    }
}

// Add country fields
for (let c of cities) {
    c.country = {
        name: c.cou_name_en,
        code: c.country_code
    }
    delete c.cou_name_en
    delete c.country_code
}

// Add is capital
for (let c of cities) {
    c.country_capital = c.feature_code == 'PPLC'
    c.state_capital = c.feature_code == 'PPLC'

}

// Validate ascii_name-s
for (let c of cities) {
    if (c['ascii_name'] == null) {
        c['ascii_name'] = c['name'].replace(/[^\x00-\x7F]/g, '')
    }
}

// Print performance
const stop = performance.now()
console.log('Loaded ', cities.length, ' items in:', (stop-start)/1000, 's')

// Print example
console.log(cities[0])


export function makeSearchList(cities) {
    let list = []
    for (let c of cities) {
        list.push(c['ascii_name'].toLowerCase())
    }
    return list
}