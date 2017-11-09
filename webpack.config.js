var path = require('path')
var webpack = require('webpack')

***REMOVED***
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  ***REMOVED***,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      ***REMOVED***,      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          ***REMOVED***
          // other vue-loader options go here
        ***REMOVED***
      ***REMOVED***,
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      ***REMOVED***,
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        ***REMOVED***
      ***REMOVED***
    ]
  ***REMOVED***,
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    ***REMOVED***,
    extensions: ['*', '.js', '.vue', '.json']
  ***REMOVED***,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  ***REMOVED***,
  performance: {
    hints: false
  ***REMOVED***,
  devtool: '#eval-source-map'
***REMOVED***

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      ***REMOVED***
    ***REMOVED***),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      ***REMOVED***
    ***REMOVED***),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    ***REMOVED***)
  ])
***REMOVED***
