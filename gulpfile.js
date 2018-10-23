//Required Packages
const gulp = require('gulp')
const replace = require('gulp-replace')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')

//Global Files
var indexJS = './web/public/js/index.js';

//Replace JS with dev JS
gulp.task('dev-js', function() {
  gulp.src(indexJS)
    .pipe(replace('https://nexmove.herokuapp.com','http://localhost:5000'))
    .pipe(replace('document.addEventListener(\'deviceready\', app.onDeviceReady, false);','app.onDeviceReady();'))
    .pipe(gulp.dest('./web/public/js/'))
});

//Replace JS with prod JS
gulp.task('prod-js', function() {
  gulp.src(indexJS)
    .pipe(replace('http://localhost:5000','https://nexmove.herokuapp.com'))
    .pipe(replace('app.onDeviceReady();','document.addEventListener(\'deviceready\', app.onDeviceReady, false);'))
    .pipe(gulp.dest('./web/public/js/'))
});

//Run dev tasks
gulp.task('prep-dev', [ 'backend', 'dev-js' ])

//Run prod tasks
gulp.task('prep-prod', [ 'backend', 'prod-js' ])

//Run backend tasks
gulp.task('backend', function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./dist"))
})