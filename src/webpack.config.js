const path = require('path');

module.exports = {
  mode: "none", // "production" | "development" | "none"
  entry: "./src/game.js", // string | object | array
  output: {
    path: path.resolve(__dirname, "dist"), // string
    filename: "bundle.js", // string
  },
  target: 'web',
  context: __dirname
}