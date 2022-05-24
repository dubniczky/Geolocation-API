function rad(deg) {
    return deg * (Math.PI/180)
}

// Calculate distane of two coordinates and convert to kilometers using the Haversine formula
// https://en.wikipedia.org/wiki/Haversine_formula
function distanceToKM(a_lat, a_lon, b_lat, b_lon) {
    const sin = Math.sin
    const cos = Math.cos
    const sqrt = Math.sqrt
    const atan2 = Math.atan2

    const radLat = rad(b_lat - a_lat)
    const radLon = rad(b_lon - a_lon)
    const a = 
        sin(radLat / 2) *
        sin(radLat / 2) +
        cos(rad(a_lat)) *
        cos(rad(b_lat)) * 
        sin(radLon / 2) *
        sin(radLon / 2)

    return ( 2 * atan2(sqrt(a), sqrt(1-a)) ) * 6371 // 6371: Earth radius in km
}
  
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

export function closestCity(cities, lat, lon) {
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
    city.distance = distanceToKM(lat, lon, city.coordinates.lat, city.coordinates.lon)
    return city
}