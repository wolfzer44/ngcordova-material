'use strict';

const uglify = require('gulp-uglify');
const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const nodeInspector = require('gulp-node-inspector');
const browserSync = require('browser-sync').create();

gulp.task('default', ['browser-sync', 'debug', 'html', 'css', 'scripts-vendors', 'scripts' ,'all-scripts']);


gulp.task('all-scripts', () => {
  return gulp.src([
    './www/js/tmp/*.js'
  ])
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('./www/js/'));
});

gulp.task('scripts', () => {
  return gulp.src([
    './src/js/app/**/*.js'
  ])
  .pipe(concat('allmyjs.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./www/js/tmp/'));
});

gulp.task('scripts-vendors', () => {
  return gulp.src([
    './lib/angular/angular.min.js',
    './lib/ngCordova/dist/ng-cordova.min.js'
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('./www/js/tmp/'));
});

gulp.task('html', () => {
  return gulp.src('./src/index.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./www/'));
});

gulp.task('css', () => {
  return gulp.src('./src/css/*.css')
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('./www/css/'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './www/'
    }
  });
  gulp.watch('./src/js/**/*.js', ['scripts-vendors', 'scripts', 'all-scripts'])
  .on('change', browserSync.reload);
  gulp.watch('./src/**/*.html', ['html'])
  .on('change', browserSync.reload);
  gulp.watch('./src/css/*.css', ['css'])
  .on('change', browserSync.reload);
});

gulp.task('debug', function () {
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
