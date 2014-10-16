gulp = require('gulp');
nodemon = require('nodemon');
env = require('gulp-env');

gulp.task('mainTask', function () {

})

gulp.task('nodemon', function () {
    //nodemon server
});

gulp.task('set-env', function () {
    env({
        file: '.env'
        vars: {
            // overwriting here
        }
    });
});

gulp.task('mainTask', ['set-env', 'nodemon'])
