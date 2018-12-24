const gulp = require('gulp');
const del = require('del');

const paths = {
  src: 'src',
  buil: 'build',
  tmp: '.tmp',
  vendor: 'vendor',
};

function clean() {
  return del([paths.dist]);
}

gulp.task('clean', clean);
gulp.task('build', gulp.series(gulp.parallel('other', 'swImports', 'webpack:dist')));
