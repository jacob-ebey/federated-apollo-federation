const webpackShared = require("../webpack-shared");

module.exports = webpackShared({
  name: "todos",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  publicPath: "http://localhost:5001/"
});