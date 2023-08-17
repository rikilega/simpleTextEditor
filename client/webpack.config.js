const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
    }),
    new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
    }),
    new WebpackPwaManifest({
        fingerprints: false,
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor PWA.',
        background_color: '#ffffff',
        // crossorigin: 'anonymous', // can be null, use-credentials or anonymous
        icons: [
            {
                src: path.resolve('../client/assets/icon.png'),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                destination: path.join('assets', 'icons'),
            },
        ],
    })

    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'],
              },
          },
      },
      {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
      },
      ],
    },
  };
};
