/* jshint unused: false */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('default', function() {
  sass('./src/stylesheets/_hopscotch-highlight.scss', { style: 'expanded' })
    .pipe(gulp.dest('./dist/stylesheets'));
});
