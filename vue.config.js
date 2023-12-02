const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://94.241.169.172:8081',
    // {
    //     '^/api': {
    //       target: 'http://localhost:8081', // 194.67.121.7
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': '',
    //       },
    //     },
    //   },
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
