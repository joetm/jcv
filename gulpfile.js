var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename');

//clean build directory
gulp.task('cleanjs', function () {
    return gulp.src('build/js/*', {read: false})
        .pipe(clean());
});
//clean build directory
gulp.task('cleancss', function () {
    return gulp.src('build/css/*', {read: false})
        .pipe(clean());
});

//uglify
gulp.task('compressjs', function() {
    gulp.src('app/main.js')
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('app'));
});

//concat
gulp.task('concatjs', function() {
    return gulp.src([
        'js/jquery.min.js',
        //'js/knockout-3.3.0.js',
        'js/underscore-min.js',
        'js/backbone-min.js',
        'js/semantic.min.js', //ALL
        //'mustache.min.js',
        'app/*.min.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('build/js'));
});

//css
gulp.task('minifycss', function() {
    gulp.src('css/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'));
});


//javascript tasks
gulp.task('js', ['cleanjs', 'compressjs', 'concatjs']);

//css tasks
gulp.task('css', ['cleancss', 'minifycss']);


//watch
gulp.task('watch', ['js', 'css'], function () {
    gulp.watch("css/*.less", ['css']);
    gulp.watch("app/main.js", ['js']);
});