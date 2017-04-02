
function colorDistance(c1, c2) {
    var sum = 0;
    while (c1 || c2) {
        var diff = (c1 & 0xFF) - (c2 & 0xFF)
        sum += diff * diff
        c1 = c1 >> 8
        c2 = c2 >> 8
    }
    return sum
}

function closestColor(list, c) {
    var best = {
        distance: Number.MAX_SAFE_INTEGER,
        name: '',
        color: -1
    }

    for (var i = 0; i < list.length; i++) {
        var item = list[i]
        var distance = colorDistance(c, item[1])
        if (distance < best.distance) {
            best.distance = distance
            best.name = item[0]
            best.color = item[1]
        }
    }

    return best
}

function hexify(c) {
    return "0x" + (+c).toString(16).toUpperCase()
}

function hexColorify(c) {
    return "#" + (+c).toString(16).toUpperCase()
}

module.exports.colorDistance = colorDistance
module.exports.closestColor = closestColor
module.exports.hexify = hexify
module.exports.hexColorify = hexColorify
