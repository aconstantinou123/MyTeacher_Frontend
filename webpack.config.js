const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

const environmentVariables =  new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  TWILIO_URL: 'http://localhost:3000',
  TEACHER_URL: 'http://localhost:3001',
  STUDENT_RECORD_URL: 'http://localhost:3003',
  SCHEDULE_URL: 'http://localhost:3004',
  JWT_SECRET: 'b3k60snNSUbtS4zidBgiYgSkXPMcdwta',
})

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
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
  devServer: {
    historyApiFallback: true,
  },
  plugins: [htmlPlugin, environmentVariables]
}