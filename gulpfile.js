'use strict';

const uglify = require('gulp-uglify');
const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const nodeInspector = require('gulp-node-inspector');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const clean = require('gulp-clean');

gulp.task('default', ['html', 'css', 'scripts', 'browser-sync']);
gulp.task('dev', ['html', 'css', 'scripts', 'img', 'browser-sync']);

gulp.task('clean-scripts', () => gulp.src('www/js/*.js').pipe(clean()));

gulp.task('clean-html', () => gulp.src('./www/*.html').pipe(clean()));

gulp.task('img', () => {
  return gulp.src('./src/img/**/*')
  .pipe(gulp.dest('./www/img/'));
});

gulp.task('scripts', () => {
  return gulp.src([
    './lib/angular/angular.min.js',
    './lib/angular-material/angular-material.min.js',
    './lib/angular-aria/angular-aria.min.js',
    './lib/angular-animate/angular-animate.min.js',
    './lib/angular-messages/angular-messages.min.js',
    './lib/angular-ui-router/release/angular-ui-router.min.js',
    './lib/ngCordova/dist/ng-cordova.min.js',
    './src/js/app/**/*.js'
  ])
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('./www/js/'))
  .on('change', reload);
});

gulp.task('html', () => {
  return gulp.src('./src/index.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./www/'))
  .on('change', reload);
});

gulp.task('css', () => {
  return gulp.src([
    './lib/angular-material/angular-material.min.css',
    './src/css/index.css'
  ])
  .pipe(concat('index.css'))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('./www/css/'))
  .on('change', reload);
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './www/'
    }
  });
  gulp.watch('./src/js/**/*.js', ['scripts']).on('change', reload);
  gulp.watch('./src/*.html', ['html']).on('change', reload);
  gulp.watch('./src/css/*.css', ['css']).on('change', reload);
});

gulp.task('debug', () => {
  gulp.src([])
  .pipe(nodeInspector({
    debugPort: 5858,
    webHost: '0.0.0.0',
    webPort: 8080,
    saveLiveEdit: true,
    preload: true,
    inject: true,
    hidden: [],
    stackTraceLimit: 50,
    sslKey: '',
    sslCert: ''
  }));
});
