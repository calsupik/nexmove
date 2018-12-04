//Required Packages
const gulp = require('gulp')
const replace = require('gulp-replace')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')

//Run backend tasks
gulp.task('backend', function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./dist"))
})

//Run prod tasks
gulp.task('prep-prod', gulp.series([ 'backend' ]))