function distance(a_lat, a_lon, b_lat, b_lon) {
    const lat = a_lat - b_lat
    const lon = a_lon - b_lon
    return Math.sqrt( lat*lat + lon*lon )
}

export function cityDistance(lat, lon, cityIndex, cities) {
    return distance(
        lat,
        lon,
        cities[cityIndex].coordinates.lat,
        cities[cityIndex].coordinates.lon)
}

export function findClosest(cities, lat, lon) {
    let closestIndex = 0
    let dist = cityDistance(lat, lon, 0, cities)

    for (let i in cities) {
        let d = cityDistance(lat, lon, i, cities)
        if (d < dist) {
            dist = d
            closestIndex = i
        }
    }

    let city = { ... cities[closestIndex] }
    city.distance = dist * 111
    return city
}