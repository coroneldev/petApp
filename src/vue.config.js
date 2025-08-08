// vue.config.js
const path = require('path');

module.exports = {
  chainWebpack: config => {
    // Configuración del alias para 'src'
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
};
