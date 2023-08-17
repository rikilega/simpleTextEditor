const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
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
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
    }),
    new InjectManifest({
        swSrc: './src-sw.js',
    }),
    new WebpackPwaManifest({
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor PWA.',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
            {
                src: path.resolve('src/assets/icon.png'),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                destination: path.join('icons'),
            },
        ],
    }),
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
