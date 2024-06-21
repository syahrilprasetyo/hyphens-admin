// webpack.config.js
const path = require("path");

module.exports = {
  // ... other webpack configuration settings

  module: {
    rules: [
      // ... other rules

      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/", // Specifies the output directory for images
          },
        },
      },
    ],
  },
};
