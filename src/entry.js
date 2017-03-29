require('file-loader?name=[name].[ext]!./index.html')
var util = require('./util')

var colorlists = {
    xkcd: require('./xkcd'),
    official: require('./official')
}

var myFormEl = document.getElementById('myForm')
var colorlistEl = document.getElementById('colorlist')
var outEl = document.getElementById('out')
var whatEl = document.getElementById('what')

myFormEl.onsubmit = function (e) {
    e.preventDefault()
    var colorlist = colorlistEl.value
    var searchColor = +whatEl.value
    var closest = util.closestColor(colorlists[colorlist], searchColor)
    outEl.innerText = closest.name + " = " + util.hexify(closest.color)
}
