/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
let HtmlWebpackPlugin,CopyWebpackPlugin,path;
HtmlWebpackPlugin = require('html-webpack-plugin');
CopyWebpackPlugin = require('copy-webpack-plugin');
path = require('path');

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: path.resolve(__dirname, 'src/index.js'),
  // Tell Weback to output our bundle to ./shui/shui.js
  output: {
    filename: 'shui.js',
    path: path.resolve(__dirname, 'shui')
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  // These rules tell Webpack how to process different module types.
  // Remember, *everything* is a module in Webpack. That includes
  // CSS, and (thanks to our loader) HTML.
  module: {
    rules: [
      {
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [
          { loader: 'babel-loader' },
          { loader: 'polymer-webpack-loader' }
        ]
      },
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-ie']
        }
        // Optionally exclude node_modules from transpilation except for polymer-webpack-loader:
        // exclude: /node_modules\/(?!polymer-webpack-loader\/).*/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      }
    ]
  },
  // Enable the Webpack dev server which will build, serve, and reload our
  // project on changes.
  devServer: {
    contentBase: path.join(__dirname, 'shui'),
    compress: false,
    port: 8082,
    host : '0.0.0.0'
  },
  plugins: [
    // This plugin will generate an index.html file for us that can be used
    // by the Webpack dev server. We can give it a template file (written in EJS)
    // and it will handle injecting our bundle for us.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      inject: false
    }),
    // This plugin will copy files over for us without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015.
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs'),
      to: 'node_modules/@webcomponents/webcomponentsjs/[path][name].[ext]'
    },{
      from: path.resolve(__dirname, 'src/shui-styles.css'),
      to: '[path][name].[ext]'
    },{
      from: path.resolve(__dirname, 'src/fonts/'),
      to: 'fonts/[path][name].[ext]'
    }])
  ]
};
