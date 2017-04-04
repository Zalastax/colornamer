var colors = require('./official').concat(require('./xkcd')).map(function (v) {
    return [v[0].toLowerCase(), v[1]]
})


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

function rgb2Value(r, g, b) {
    return b | (g << 8) | (r << 16)
}

function parseColor(str) {
    if (isNumber(str)) { // Probably hex literal
        return +str
    }
    str = ("" + str).trim().toLowerCase()
    if (str[0] == '#') { // hex
        if (str.length == 7) { // hex6
            return parseInt(str.substr(1), 16)
        } else if (str.length == 4) { // hex3
            return rgb2Value(
                parseInt(str[1] + str[1], 16),
                parseInt(str[2] + str[1], 16),
                parseInt(str[3] + str[1], 16))
        }
    }
    if (str.indexOf('rgb') === 0) { //rgba(a)
        var match = str.match(/rgba?\(([^)]+)\)/)[1]
        var parts = match && match.split(/ *, */).map(Number);
        if (parts && (parts.length === 3 || parts.length === 4)) {
            return rgb2Value(parts[0], parts[1], parts[2])
        }
    }

    for (var i = 0; i < colors.length; i++) {
        if (colors[i][0] == str) {
            return colors[i][1];
        }
    }
}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function hexify(c) {
    return "0x" + (+c).toString(16).toUpperCase()
}

function hexColorify(c) {
    return "#" + (16777216 | c).toString(16).slice(1).toUpperCase()
}

function luma(c) {
    var rgb = +c;
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >> 8) & 0xff;
    var b = (rgb >> 0) & 0xff;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}

function isDark(c) {
    return luma(c) < 100;
}


module.exports.colorDistance = colorDistance
module.exports.closestColor = closestColor
module.exports.hexify = hexify
module.exports.hexColorify = hexColorify
module.exports.luma = luma
module.exports.isDark = isDark
module.exports.isNumber = isNumber
module.exports.parseColor = parseColor
module.exports.rgb2Value= rgb2Value
