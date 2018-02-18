const path = require('path');

if (process.env.NODE_ENV === 'development') {
  module.exports = {
    entry: ['babel-polyfill', './demo/demo.js'],
    output: {
      path: path.join(__dirname, 'demo'),
      filename: 'demo-bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-class-properties', 'transform-object-rest-spread']
            }
          },
          exclude: /(build|node_modules)/
        },
        {
          test: /\.css|\.scss/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'demo')
    }
  };
} else {
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
}
