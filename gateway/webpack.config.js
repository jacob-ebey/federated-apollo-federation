const nodeExternals = require("webpack-node-externals");
const RunNodeWebpackPlugin = require("run-node-webpack-plugin");
const webpack = require("webpack");
const WebpackNodeHttpChunkLoadingPlugin = require("webpack-node-http-chunk-loading-plugin");

const config = {
  mode: "development",
  devtool: false,
  target: "async-node",
  entry: "./src/index.js",
  externals: [
    nodeExternals({
      allowlist: [/^webpack\/container\/reference\//],
    }),
  ],
  plugins: [
    new RunNodeWebpackPlugin({ scriptToRun: "main.js" }),
    new WebpackNodeHttpChunkLoadingPlugin(),
    new webpack.container.ModuleFederationPlugin({
      name: "gateway",
      filename: "remote-entry.js",
      library: { type: "commonjs-module" },
      remotes: {
        todos: WebpackNodeHttpChunkLoadingPlugin.httpExternal(
          "http://localhost:5001/remote-entry.js"
        ),
        users: WebpackNodeHttpChunkLoadingPlugin.httpExternal(
          "http://localhost:5002/remote-entry.js"
        ),
      },
      shared: ["apollo-server"],
    }),
  ],
};

module.exports = config;
