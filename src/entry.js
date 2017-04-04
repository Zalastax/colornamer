require('file-loader?name=[name].[ext]!./index.html')
var util = require('./util')
var ColorPicker = require('./FlexiColorPicker/colorpicker.js')

var colorlists = {
    xkcd: require('./xkcd'),
    official: require('./official')
}

var colorlistEl = document.getElementById('colorlist')
var outEl = document.getElementById('out')
var whatEl = document.getElementById('what')
var sliderEl = document.getElementById('slider-indicator')
var pickerEl = document.getElementById('picker-indicator')

ColorPicker.fixIndicators(sliderEl, pickerEl);

var cp = new ColorPicker(
                document.getElementById('slider'), 
                document.getElementById('picker'), 
                function(hex, hsv, rgb, value, pickerCoordinate, sliderCoordinate) {
                    ColorPicker.positionIndicators(sliderEl, pickerEl, sliderCoordinate, pickerCoordinate)
                    whatEl.value = hex
                    out(value)
            });

whatEl.onchange = function () {
    var value = util.parseColor(whatEl.value)
    if (value !== undefined) {
        cp.setHex(util.hexColorify(value))
        out(value)
    }
}

function out(value) {
    var colorlist = colorlistEl.value
    var closest = util.closestColor(colorlists[colorlist], value)
    outEl.innerHTML = formatOut("", value) + formatOut(closest.name + " = ", closest.color)
}

function formatOut(text, color) {
    return '<div style="background-color:' + util.hexColorify(color) + ';color:' + (util.isDark(color) ? 'white' : 'black' ) + '"><p>' +
                text + util.hexColorify(color) + '</p></div>'
}

cp.setHex("#800000")

