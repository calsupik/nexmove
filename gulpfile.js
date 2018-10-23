//Required Packages
const gulp = require('gulp')
const replace = require('gulp-replace')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')

//Global Files
var indexHTML = './mobile/www/index.html';
var indexJS = './src/js/nexmove.js';

//Replace HTML with dev HTML
gulp.task('dev-html', function() {
  gulp.src(indexHTML)
    .pipe(replace('https://nexmove.herokuapp.com/','../../dist/'))
    .pipe(replace('<script type="text/javascript" src="cordova.js"></script>','<!--<script type="text/javascript" src="cordova.js"> </script>-->'))
    .pipe(gulp.dest('./mobile/www/'))
});

//Replace JS with dev JS
gulp.task('dev-js', function() {
  gulp.src(indexJS)
    .pipe(replace('https://nexmove.herokuapp.com','http://localhost:5000'))
    .pipe(replace('document.addEventListener(\'deviceready\', app.onDeviceReady, false);','app.onDeviceReady();'))
    .pipe(gulp.dest('./src/js'))
});

//Replace HTML with prod HTML
gulp.task('prod-html', function() {
  gulp.src(indexHTML)
    .pipe(replace('../../dist/','https://nexmove.herokuapp.com/'))
    .pipe(replace('<!--<script type="text/javascript" src="cordova.js"> </script>-->','<script type="text/javascript" src="cordova.js"></script>'))
    .pipe(gulp.dest('./mobile/www/'))
});

//Replace JS with prod JS
gulp.task('prod-js', function() {
  gulp.src(indexJS)
    .pipe(replace('http://localhost:5000','https://nexmove.herokuapp.com'))
    .pipe(replace('app.onDeviceReady();','document.addEventListener(\'deviceready\', app.onDeviceReady, false);'))
    .pipe(gulp.dest('./src/js'))
});

//Run backend tasks
gulp.task('backend', function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./dist"))
})

//Run dev tasks
gulp.task('prep-dev', [ 'dev-html', 'dev-js', 'backend' ])

//Run prod tasks
gulp.task('prep-prod', [ 'prod-html', 'prod-js', 'backend' ])