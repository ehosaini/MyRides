const gulp = require('gulp');
const livereload = require('gulp-livereload');

gulp.task('default', () => {
  console.log('gulp is ready');
});

gulp.task('template', () => {
  gulp.src('views/*.pug')
    .pipe(livereload());
});

gulp.task('css', () => {
  gulp.src('public/*/*.css')
    .pipe(livereload());
});

gulp.task('script', () => {
  gulp.src('public/*/*.js')
    .pipe(livereload());
});



gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('views/*.pug', ['template']);
  gulp.watch('public/*/*.css', ['css', 'template']);
  gulp.watch('public/*/*.js', ['script', 'template']);
});