
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

function luma(c) {
    var rgb = +c;
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    return  0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}

function isDark(c) {
    return luma(c) < 40;
}


module.exports.colorDistance = colorDistance
module.exports.closestColor = closestColor
module.exports.hexify = hexify
module.exports.hexColorify = hexColorify
module.exports.luma = luma
module.exports.isDark = isDark
