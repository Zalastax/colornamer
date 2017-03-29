var webpack = require('webpack')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    }
}
