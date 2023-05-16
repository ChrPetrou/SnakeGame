const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
/**
 * @type {import("webpack-cli").WebpackConfiguration}
 */
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Snake",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
