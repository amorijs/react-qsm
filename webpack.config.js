const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/containers/QuickSelectMenu.jsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-class-properties', 'transform-object-rest-spread']
          }
        }
      }
    ]
  },
  externals: { react: 'commonjs react' }
};
