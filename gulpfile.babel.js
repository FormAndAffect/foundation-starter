/*eslint-env node */

'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import browser  from 'browser-sync';
import gulp     from 'gulp';
import panini   from 'panini';
import rimraf   from 'rimraf';
import sherpa   from 'style-sherpa';
import yaml     from 'js-yaml';
import fs       from 'fs';
import newer    from 'gulp-newer';

//for ee
import php      from 'gulp-connect-php';
import gulpWatch    from 'gulp-watch';

//for react
//import webpackStream from 'webpack-stream';
//import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import gutil    from 'gulp-util'
import webpackConfig from './webpack.config.js';
import WebpackDevServer from 'webpack-dev-server';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//specity version to build
function constructBuildArgs(version) {

  gutil.log(yargs.argv.react);

  let buildArgs = [];

  switch (version) {
    case 'html':

        if(yargs.argv.react) {
          buildArgs = [pages, sass, javascript, reactJavascript, images, copy];
        } else {
          buildArgs = [pages, sass, javascript, images, copy];
        }

      break;

    case 'php':

        if(yargs.argv.react) {
          buildArgs = [sass, javascript, reactJavascript, images, phpPages, copy];
        } else {
          buildArgs = [sass, javascript, images, phpPages, copy];
        }

      break;
  } 
    
  return buildArgs;
}

  

//html build version for static html
//--------------------------------------

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(...constructBuildArgs('html')), styleGuide));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));


//php build version for ee
//--------------------------------------

// Build the "dist" folder by running all of the below tasks
gulp.task('buildphp',
 gulp.series(clean, gulp.parallel(...constructBuildArgs('php'))));


// Build the site, run the server, and watch for file changes
gulp.task('runphp',
  gulp.series('buildphp', watchPhp));

//--------------

//locally serve php files for testing
gulp.task('php', gulp.series('runphp', function() {
    php.server({ base: 'src/php', port: 8010, keepalive: true});
}));

//auto reload broser for php files
gulp.task('servephp', gulp.series('php', function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
}));


//for react
//--------------------------------------


// // run webpack through webpackStream for react
// // this version generates hashed js files 
// function reactJavascript() {
//   return gulp.src(PATHS.react)
//     //.pipe($.sourcemaps.init())
//     //.pipe($.if(!PRODUCTION, $.sourcemaps.write()))
//     .pipe(webpackStream({
//       // watch: true,
//       module: {
//         // rules for modules (configure loaders, parser options, etc.)
//         rules: [
//           {
//             test: /\.(js|jsx)$/,
//             use: 'babel-loader'
//           },
//         ]
//       },
//       plugins: [
//         new HtmlWebpackPlugin({
//           template: 'src/react-template/index.html',
//           filename: 'react.html'
//         })
//         //new HtmlWebpackPlugin()
//       ],
//       devtool: "source-map"
//     }, webpack))
//     //must pipe this the the dist dir to connect the HtmlWebpackPlugin
//     //generated page
//     .pipe(gulp.dest(PATHS.dist));
// }

// // run webpack for react (without webpackStream version) 
function reactJavascript(done) {

  if(!PRODUCTION) {
      //dev version
      gutil.log('running dev webpack');
      //grab existing config file
      var myConfig = Object.create(webpackConfig);
      myConfig.watch = true;

      var taskNum = 1; // A counter to track how many times the webpack task runs

      //run webpack
      webpack(myConfig,
      function(err, stats) {
          if(err) throw new gutil.PluginError("webpack", err);
          gutil.log("[webpack]", stats.toString({
              // output options
          }));

          // Only execute this callback the first time
          if (taskNum === 1) {
              done();
          }

          //callback();
          taskNum++; // Increment the task counter
      }); 
    } else {
      //build version
      gutil.log('running production webpack');
      // modify some webpack config options
      var myConfig = Object.create(webpackConfig);
      myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
          "process.env": {
            // This has effect on the react lib size
            "NODE_ENV": JSON.stringify("production")
          }
        }),
        //compress
        new webpack.optimize.UglifyJsPlugin()
      );

      //run webpack
      webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
          colors: true
        }));
        //callback();
        done();
      });
    }

}

// //use webpack dev server
// function webpackServer(done) {

//   var myConfig = Object.create(webpackConfig);

//   //grab config options
//   const compiler = webpack(webpackConfig);

//   // Start a webpack-dev-server
//   const server = new WebpackDevServer(compiler, {
//     // publicPath: "/" + myConfig.output.publicPath,
//     contentBase: myConfig.devServer.contentBase,
//     compress: myConfig.devServer.compress,
//     hot: myConfig.devServer.hot,
//     stats: {
//       colors: true
//     }
//   });

//   server.listen(myConfig.devServer.port, 'localhost', function() {
//     console.log("Starting server on http://localhost:8080/");
//   });

//   done();
// }

//--------------------------------------

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets/media folder
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets/media'));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}

//initial Copy php files into dist dir for EE use
function phpPages() {
  return gulp.src('src/php/**/*.php')
    .pipe(gulp.dest(PATHS.distPhp));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
  sherpa('src/styleguide/index.md', {
    output: PATHS.dist + '/styleguide.html',
    template: 'src/styleguide/template.html'
  }, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel({ignore: ['what-input.js']}))
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

//watch for panini (html) changes
function watch() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', 
  gulp.series(resetPages, pages, browser.reload));
  watchAssets();
}

//for ee version
// Watch for changes to static assets, pages, Sass, and JavaScript
function watchPhp() {
  gulp.watch('src/php/**/*.php').on('all', gulp.series(phpPages));
  watchAssets();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watchAssets() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, browser.reload));
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));

  gulp.watch('src/react-app/**/*.{js,jsx}').on('all', gulp.series(reactJavascript, browser.reload));
  gulp.watch('src/react-template/**/*').on('all', gulp.series(reactJavascript, browser.reload));
}
