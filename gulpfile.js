'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');  // модуль защиты от 'падения' в случае ошибки. Обработка ошибок (error handling)
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');  // переименование файлов
const server = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');  // вендорные префиксы
const csso = require('gulp-csso');  // минификация css
const imagemin = require('gulp-imagemin');  // оптимизация изображений
const webp = require('gulp-webp');  // convert to webP
const svgstore = require('gulp-svgstore');  // sprite svg
const posthtml = require('gulp-posthtml');  // подключение html
const include = require('posthtml-include');  // вставка в DOM дерево
const del = require('del');  // удаление файлов
const uglify = require('gulp-uglify');  // минификация js
const htmlmin = require('gulp-htmlmin');  // минификация html
const rigger = require('gulp-rigger');  // разбивка html на кусочки (для шаблонизации)
const concat = require('gulp-concat');  // сборка файлов в один
const babel = require('gulp-babel');

let path = {
  build: { // Куда складывать готовые файлы после сборки
    html: 'build/',
    php: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    copy: 'build/',
    server: 'build/',
    static: 'build/',
    libs: 'build/js/libs'
  },
  src: { // Откуда брать исходники
    html: 'source/**/*.html',
    php: 'source/**/*.php',
    js: ['source/js/*.js', '!source/js/**/*.min.js'],
    css: 'source/sass/style.scss',
    sass: 'source/sass/**/*.{scss,sass}',
    img: 'source/img/**/*.{jpg,jpeg,png,gif,svg}',
    webp: 'source/img/**/*.{jpg,jpeg,png}',
    sprite: 'source/img/**/ico{n,ns}-*.svg',
    fonts: 'source/fonts/**/*.*',
    static: 'source/static/**/*.*',
    libs: [
      'node_modules/jquery/dist/jquery.min.js',
      //'node_modules/slick-carousel/slick/slick.min.js',
      'source/js/libs/*.*'
    ]
  },
  watch: { // За изменениями каких файлов мы хотим наблюдать
    html: 'source/**/*.html',
    php: 'source/**/*.php',
    js: 'source/js/**/*.js',
    css: 'source/scss/**/*.scss',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  }
};

gulp.task('css', function () {
  return gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(path.build.css))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.build.css))
    .pipe(server.stream());
});

gulp.task('sprite', function () {
  return gulp.src(path.src.sprite)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('static', function () {
  return gulp.src(path.src.static)
    .pipe(gulp.dest(path.build.static));
});

gulp.task('libs', function () {
  return gulp.src(path.src.libs)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(concat('libs.min.js'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.build.libs))
});

gulp.task('js', function () {
  return gulp.src(path.src.js)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.build.js))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src(path.src.img)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('webp', function () {
  return gulp.src(path.src.webp)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('server', function () {
  server.init({
    server: path.build.server,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(path.src.sass, gulp.series('css'));
  gulp.watch(path.src.sprite, gulp.series('sprite', 'html', 'refresh'));
  gulp.watch(path.src.html, gulp.series('html', 'refresh'));
  gulp.watch(path.src.img, gulp.series('images', 'refresh'));
  gulp.watch(path.src.js, gulp.series('js', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    //'source/js/**',
    'source/*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest(path.build.copy));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'sprite',
  'html',
  'static',
  'libs',
  'js',
  'images',
  'webp'
));

gulp.task('start', gulp.series('build', 'server'));
