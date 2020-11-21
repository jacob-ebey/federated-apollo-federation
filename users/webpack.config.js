const webpackShared = require("../webpack-shared");

module.exports = webpackShared({
  name: "users",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  publicPath: "http://localhost:5002/"
});