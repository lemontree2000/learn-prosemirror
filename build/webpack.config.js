const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
console.log(__dirname)
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "ProsiMirror",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: 'dir',
          noErrorOnMissing: true, // 当目录为空时不会报错
          globOptions: {
            dot: true,
            ignore: ['**/index.html']
          }
        },
      ],
    }),
  ],
};
