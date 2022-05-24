export function selectRandom(list) {
    return list[ Math.floor(Math.random() * list.length) ]
}