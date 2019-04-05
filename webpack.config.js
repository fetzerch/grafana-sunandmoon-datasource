const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "none",
  node: {
    fs: "empty",
  },
  context: path.join(__dirname, "src"),
  entry: {
    module: "./module.ts",
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "amd",
  },
  externals: [
    "moment",
    function(context, request, callback) {
      var prefix = "grafana/";
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    },
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: "../plugin.json", to: "." },
      { from: "../README.md", to: "." },
      { from: "../CHANGELOG.md", to: "." },
      { from: "../LICENSE", to: "." },
      { from: "partials/*", to: "." },
      { from: "img/*", to: "src" },
    ], {
      copyUnmodified: true
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.ts$/,
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader",
              options: {
                emitErrors: true,
            }
          }
        ]
      }
    ],
  },
};
