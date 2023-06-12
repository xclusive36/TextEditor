const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Require webpack-pwa-manifest plugin
const path = require('path'); // Require path plugin
const { InjectManifest } = require('workbox-webpack-plugin'); // Require workbox-webpack-plugin plugin

module.exports = () => { // Export module as a function
  return {
    mode: 'development', // Set mode to development
    entry: { // Set entry points
      main: './src/js/index.js', // Main entry point
      install: './src/js/install.js' // Install entry point
    },
    output: { // Set output
      filename: '[name].bundle.js', // Set filename
      path: path.resolve(__dirname, 'dist'), // Set path
    },
    plugins: [ // Set plugins
      // Webpack plugin that generates our html file and injects our bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Just Another Text Editor",
      }),

      // Injects our custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Best text editor ever!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    module: { // Set modules
      rules: [ // Set rules
        {
          test: /\.css$/, // Target css files
          use: ["style-loader", "css-loader"], // Use these loaders
        },
        {
          test: /\.m?js$/, // Target js files
          exclude: /node_modules/, // Exclude node_modules
          // We use babel-loader in order to use ES6. We also use @babel/preset-env to target specific browsers.
          use: { // Use babel-loader
            loader: "babel-loader", // Use babel-loader
            options: { // Set options
              presets: ["@babel/preset-env"], // Set presets
              plugins: [ // Set plugins
                "@babel/plugin-proposal-object-rest-spread", // Set plugin
                "@babel/transform-runtime", // Set plugin
              ],
            },
          },
        },
      ],
    },
  };
};
