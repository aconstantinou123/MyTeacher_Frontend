const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

const environmentVariables =  new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  TWILIO_URL: 'http://localhost:3000'
})

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-2'],
              plugins: ['transform-object-rest-spread'],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ]
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

    ]
  },
  plugins: [htmlPlugin, environmentVariables]
}