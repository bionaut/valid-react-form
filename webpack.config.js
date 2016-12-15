module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/index.js'
  },
  externals: {
    "React": "react",
    "react-dom": "react-dom"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }]
  }
};