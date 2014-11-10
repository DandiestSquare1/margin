var gulp = require('gulp');
var server = require('gulp-express');
var env = require('gulp-env');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('set-env', function () {
    env({
        file: '/.env',
        vars: {
            // overwriting here
        }
    });
});

gulp.task('server', function () {
    //start the server at the beginning of the task
    server.run({
        file: 'app.js'
    });

    //restart the server when file changes
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});

gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('public/javascripts/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('public/javascripts/build'));
});


gulp.task('compress', function() {
    gulp.src('public/javascripts/build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/build'))
});

gulp.task('heroku:production', ['browserify', 'compress']);

gulp.task('default', ['set-env', 'server', 'browserify', 'compress']);
