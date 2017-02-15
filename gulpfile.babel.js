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
//for ee
import php      from 'gulp-connect-php';
import gulpWatch    from 'gulp-watch';

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

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, sass, javascript, images, phpPages, copy), styleGuide));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watchPhp));


//for ee
//--------------------------------------

//copy php files to dist folder on change
//different than gulp.watch, we use this to simply copy
//the php files to dist dir on change
var source = './src/php/'; 
gulp.task('watch-folder', gulp.series(function() {  
  gulp.src('src/php/**/*.php')
    .pipe(gulpWatch(source, {base: source}))
    .pipe(gulp.dest(PATHS.dist + '/templates'));
}));

// gulp.task('runphp', gulp.series('watch-folder', function() {
//     gulp.watch('src/php/**/*.php').on('all', gulp.series(phpPages));
// }));

// Build the "dist" folder by running all of the below tasks
gulp.task('buildphp',
 gulp.series('watch-folder', clean, gulp.parallel(sass, javascript, images, phpPages, copy), styleGuide));


// Build the site, run the server, and watch for file changes
gulp.task('runphp',
  gulp.series('buildphp', watch));

//--------------

//locally serve php files for testing
gulp.task('php', gulp.series(function() {
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


//--------------------------------------



// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
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

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  watchAssets();
}

//for ee version
// Watch for changes to static assets, pages, Sass, and JavaScript
function watchPhp() {
  gulp.watch('src/php/**/*.php').on('all', gulp.series(phpPages));
  watchAssets();
}

function watchAssets() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, browser.reload));
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
}
