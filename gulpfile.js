var gulp = require('gulp');
var server = require('gulp-express');
var env = require('gulp-env');
var browserify = require('gulp-browserify');

gulp.task('default', function () {
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
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('set-env', function () {
    env({
        file: '.env',
        vars: {
            // overwriting here
        }
    });
});

gulp.task('default', ['set-env', 'browserify']);
