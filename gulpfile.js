var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var time = Date.now();


gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed', allowEmpty: true}).on('error', sass.logError))
    .pipe(concat('bundle-' + time + '.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('app-' + time + '.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', gulp.series('sass', 'scripts', function() {
  gulp.watch('css/**/*.sass', ['sass']);
  gulp.watch('src/**/*.js', ['scripts']);
}));

gulp.task('clean', function () {
    return gulp.src('dist', {read: false, allowEmpty: true})
        .pipe(clean());
});

gulp.task('build', gulp.series('clean', 'sass', 'scripts'));