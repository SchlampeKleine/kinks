module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
  ],
  assumptions: {
    "setPublicClassFields": true
  },
};
