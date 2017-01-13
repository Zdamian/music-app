var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var paths = {
    appScss: ['app/scss/**/*.scss'],
    appJs: ['app/js/**/*.js']
};

gulp.task('sass', function() {
    return gulp.src(paths.appScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(function(file) {
            return path.join(file.base, '..', 'css');
        }))
    pipe(gulp.dest('app/css'))
});

gulp.task('build.dev', function(){
    return gulp
        .src([
            // dependencies
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
            'node_modules/materialize-css/dist/js/materialize.min.js',
            'node_modules/handlebars/dist/handlebars.min.js',
            'node_modules/moment/min/moment.min.js',
            'node_modules/masonry-layout/dist/masonry.pkgd.min.js',

            // project source
            'app/js/app.js',
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
        // include dist/app.js in index.html
});

gulp.task('build.prod', function(){
    return gulp
        .src([
            // dependencies
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
            'node_modules/materialize-css/dist/js/materialize.min.js',
            'node_modules/handlebars/dist/handlebars.min.js',
            'node_modules/moment/min/moment.min.js',
            'node_modules/masonry-layout/dist/masonry.pkgd.min.js',

            // project source
            'app/js/app.js',
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
        // include dist/app.js in index.html
});

gulp.task('watch.dev', ['sass', 'build.dev'], function() {
    gulp.watch(paths.appScss, ['sass']);
    gulp.watch(paths.appJs, ['build.dev']);
});
