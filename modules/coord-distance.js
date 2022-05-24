function coordDistance(a_lat, a_lon, b_lat, b_lon) {
    const lat = a_lat - b_lat
    const lon = a_lon - b_lon
    return Math.sqrt( lat*lat + lon*lon )
}

export function cityDistance(lat, lon, cityIndex, cities) {
    return coordDistance(
        lat,
        lon,
        cities[cityIndex].coordinates.lat,
        cities[cityIndex].coordinates.lon)
}