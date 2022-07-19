const webpack = require('webpack');
module.exports = function override(config, env) {
  config.resolve.fallback = {
    util: require.resolve('util/'),
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser")
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  return config;
}