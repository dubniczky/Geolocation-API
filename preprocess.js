// Prepares the city data for the api

import yaml from 'js-yaml'
import { readFileSync, writeFileSync } from 'fs'

const config = {
    in: process.argv[2],
    out: process.argv[3],
}

// Read cities file
const start = performance.now()
console.log('Processing: ', config.in)    
const cities = yaml.load( readFileSync(config.in, 'utf8') )

// Extract fields only
for (let i in cities) {
    cities[i] = cities[i].fields
}

// Update city data
for (let c of cities) {
    // Convert coords to key-value pairs
    const coords = c.coordinates
    c.coordinates = {
        lat: coords[0],
        lon: coords[1]
    }

    // Add country fields
    c.country = {
        name: c.cou_name_en,
        code: c.country_code
    }
    delete c.cou_name_en
    delete c.country_code

    // Add is capital
    c.country_capital = c.feature_code == 'PPLC'
    c.state_capital = c.feature_code == 'PPLA'

    // Validate ascii_name-s
    if (c.ascii_name == null) {
        c.ascii_name = c.name.replace(/[^\x00-\x7F]/g, '')
    }

    // Remove feature class (all of them are cities with P classification)
    delete c.feature_class

    // Make alternate names a list
    if (c.alternate_names) {
        c.alt_names = c.alternate_names.split(',')
    }
    else {
        c.alt_names = []
    }
    delete c.alternate_names

    // Rename some fields
    c.elevation = c.dem; delete c.dem
}

// Print example
console.log(cities[0])

// Create search list
let search = []
for (let c of cities) {
    search.push(c['ascii_name'].toLowerCase())
}

writeFileSync(config.out, JSON.stringify({
    cities: cities,
    search: search
}))

// Print performance
const stop = performance.now()
console.log('Parsed ', cities.length, ' items in:', (stop-start)/1000, 's')
