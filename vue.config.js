const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://94.241.169.172:8081/api/**',
    // host: '94.241.169.172',
    port: 80,
    // allowedHosts: 'all',
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],

    resolve: {fallback: {fs: false, os: false, path: false}},
    experiments: {
      topLevelAwait: true,
    },
    optimization: {
      splitChunks: {chunks: 'all'},
    },
  },
});
