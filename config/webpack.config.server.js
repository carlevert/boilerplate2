var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
    entry: __dirname + "/../server/server.ts",
    output: {
        filename: "index.js"
    },
    resolve: {
        extensions: [
            ".js", ".ts",
        ],
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts?/,
                use: "ts-loader"
            }
        ]
    },
    externals: nodeModules
}