
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


require('es6-promise').polyfill();

var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Gulp jshint
gulp.task('jshint',function(){
	  return gulp.src('js/**/*.js') // Miejsce docelowe
	  .pipe(jshint()) // Plugin
	  .pipe(jshint.reporter('default'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/**/*.scss")
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('autoprefixer', function () {

    return gulp.src('css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/'));
});
