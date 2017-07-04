var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    pug           = require('gulp-pug'),
    wait          = require('gulp-wait'),
    autoprefixer  = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug', 'js'], function() {

    browserSync.init({
        server: "./build/"
    });

    gulp.watch("./sources/**/*.scss", ['sass']);
    gulp.watch("./sources/js/*.js", ['js']);
    gulp.watch("./sources/**/*.pug", ['pug']);
});

gulp.task('pug', function() {
    return gulp.src("./sources/pug/*.pug")
        .pipe(wait(1000))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./sources/scss/*.scss")
        .pipe(wait(1000))
        .pipe(sass())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("./sources/js/*.js")
        .pipe(gulp.dest("./build/js/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);