import fs from 'fs';
import yaml from 'js-yaml';

const absPath = require('path');


// Load settings from settings.yml
const { PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}


module.exports = {

      watch: true,

      //context: __dirname,
      //configuration
      entry: './src/react-app/app.js',
      output: {
        // options related to how webpack emits results

        path: absPath.resolve(__dirname, PATHS.dist + '/assets/js'), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        //publicPath: './assets/',

        filename: "react.js", // string
        // the filename template for entry chunks

        //publicPath: "dist/", // string
        // // the url to the output directory resolved relative to the HTML page

      },
      // watch: true,
      module: {
        // rules for modules (configure loaders, parser options, etc.)
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
          },
        ]
      },
      //just need this to concat to it in gulpfile
      plugins: [],

      devtool: "source-map",

      devServer: {
        contentBase: absPath.resolve(__dirname, "dist"),
        compress: true,
        port: 8080,
        hot: true
      }
}