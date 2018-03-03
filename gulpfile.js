const gulp = require('gulp')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')
const browserSync = require('browser-sync')
const minifyJs = require('gulp-uglify')
const minifyCss = require('gulp-clean-css')
const minifyHtml = require('gulp-minify-html')
const runSequence = require('run-sequence')

// Pugのコンパイル
gulp.task('pug', () => {
    gulp.src([ './assets/pug/*.pug', '!./assets/pug/_*.pug' ])
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./public/'))
})

// Pugの自動コンパイル
gulp.task('pugWatch', [ 'pug' ], () => {
    const watcher = gulp.watch('./assets/pug/*.pug', [ 'pug' ])
    watcher.on('change', event => {})
})

// Sassのコンパイル
gulp.task('sass', () => {
    gulp.src('./assets/sass/*.scss')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css/'))
})

// Sassの自動コンパイル
gulp.task('sassWatch', [ 'sass' ], () => {
    const watcher = gulp.watch('./assets/sass/*.scss', [ 'sass' ])
    watcher.on('change', event => {})
})

gulp.task('minifyHtml', () => {
    return gulp.src('public/*.html')
        .pipe(minifyHtml({ empty: true }))
        .pipe(gulp.dest('public'))
});

// CSSの圧縮
gulp.task('minifyCss', () => {
    return gulp.src('public/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('public/css'))
})

// JSの圧縮
gulp.task('minifyJs', () => {
    return gulp.src('assets/js/app.js')
        .pipe(minifyJs())
        .pipe(gulp.dest('public/js'))
})

// ホットリロード
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        open: 'external'
    })
    gulp.watch([ './public/*' ], () => {
        setTimeout(() => {
            browserSync.reload()
        }, 500)
    })
})

// Pug, Sassのコンパイル
gulp.task('compile', [ 'pug', 'sass' ])

// Pug, Sassの自動コンパイル
gulp.task('watch', [ 'pugWatch', 'sassWatch' ])

// CSS, JSの圧縮
gulp.task('min', [ 'minifyCss', 'minifyJs', 'minifyHtml' ])

// デフォルト
gulp.task('default', [ 'watch', 'browserSync', ])