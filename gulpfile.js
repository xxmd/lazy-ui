const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concatCSS = require('gulp-concat-css');
const clean = require('gulp-clean');

function cleanDist() {
  return src('dist', { allowEmpty: true }).pipe(clean())
}

const cssDir = 'src/**/*.scss'

function buildCSS() {
  return src(cssDir)
    .pipe(sass())
    .pipe(concatCSS('css/lazy-ui.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist'))
}

function watchCSS() {
  watch([cssDir], () => css())
}

exports.build = buildCSS
exports.default = series(buildCSS, watchCSS)
