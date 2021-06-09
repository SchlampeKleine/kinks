const path = require('path');

module.exports = {
  publicPath: '/kinks/',
  lintOnSave: process.env.NODE_ENV !== 'production',

  pluginOptions: {

    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      enableInSFC: true,
      localeDir: 'locales',
      enableLegacy: true,
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
  },

};
