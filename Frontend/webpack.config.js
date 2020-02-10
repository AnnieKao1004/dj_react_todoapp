const path = require('path');

module.exports = {
  module: {
    rules: [
      //編譯JSX & ES6
      { test: /.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react','@babel/preset-env', {'plugins': ['@babel/plugin-proposal-class-properties']}]  } } },
      { test: /.css$/, use: [{loader: 'style-loader'}, {loader: 'css-loader', options: { modules: false }}]}
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port:3000,

  }
};