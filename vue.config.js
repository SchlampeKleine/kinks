/**
 * Source
 * https://createapp.dev/webpack
 */
const path = require('path');
// const webpack = require('webpack');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/kinks/'
    : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',

  configureWebpack: {

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    plugins: [
      /* Default Plugins */
      // new VueLoaderPlugin(),
      /* new CopyPlugin({
        patterns: [
          { from: 'public/index.html' }
        ],
      }), */
      /* new HtmlWebpackPlugin({
        appMountId: 'app',
        filename: 'index.html'
      }), */
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),

    ].concat(
      process.env.NODE_ENV === 'production'
        ? [
        /* Production Plugins */
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          }),
        ]
        : [
        /* Development Plugins */
          new BundleAnalyzerPlugin(),
        ],
    ),

    devtool: process.env.NODE_ENV !== 'production'
      ? 'source-map'
      : false,

  },

  pluginOptions: {

    devtools: process.env.NODE_ENV !== 'production',
    css: {
      loaderOptions: {
        sass: {
          additionalData: `
              @import "@/assets/main.scss";
            `,
        },
      },
    },

    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      enableInSFC: true,
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },

  },

  chainWebpack: (config) => {
    config.module
      .rule('yaml-resource')
      .test(/\.(json5?|ya?ml)$/)
      .include
      .add(path.resolve(__dirname, './src/assets/'))
      .add(path.resolve(__dirname, '/src/assets/'))
      .end()
      .type('javascript/auto')
      .use('js-yaml-loader')
      .loader('js-yaml-loader');

    config.module
      .rule('i18n-resource')
      .test(/\.(json5?|ya?ml)$/)
      .include.add(path.resolve(__dirname, './src/locales'))
      .end()
      .type('javascript/auto')
      .use('i18n-resource')
      .loader('@intlify/vue-i18n-loader');

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader');

    config.module
      .rule('babel-plugin-syntax-dynamic-import')
      .test(/\.(js)$/)
      .use('@babel/plugin-syntax-dynamic-import')
      .loader('babel-loader');
  },

};
