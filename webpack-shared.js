const path = require("path");

const webpack = require("webpack");
const WebpackNodeHttpChunkLoadingPlugin = require("webpack-node-http-chunk-loading-plugin");

/**
 * @returns {import("webpack").Configuration}
 */
module.exports = function webpackShared({ mode, name, publicPath }) {
  return {
    mode,
    devtool: false,
    target: "async-node",
    entry: { noop: path.resolve(process.cwd(), "./src/noop.js") },
    output: {
      publicPath,
    },
    plugins: [
      new WebpackNodeHttpChunkLoadingPlugin(),
      new webpack.container.ModuleFederationPlugin({
        name,
        filename: "remote-entry.js",
        library: { type: "commonjs-module" },
        exposes: {
          "./schema": path.resolve(process.cwd(), "./src/schema.js"),
        },
        shared: ["apollo-server"],
      }),
    ],
  };
};
