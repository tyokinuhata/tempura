const gulp = require('gulp')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')
const browserSync = require('browser-sync')

// Pugのコンパイル
gulp.task('pug', () => {
    gulp.src([ './assets/pug/*.pug', '!./assets/pug/_*.pug' ])
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./public/'))
})

// Pugの自動コンパイル
gulp.task('pug-watch', [ 'pug' ], () => {
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
gulp.task('sass-watch', [ 'sass' ], () => {
    const watcher = gulp.watch('./assets/sass/*.scss', [ 'sass' ])
    watcher.on('change', event => {})
})

// ホットリロード
gulp.task('browser-sync', () => {
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
gulp.task('watch', [ 'pug-watch', 'sass-watch' ])

// デフォルト
gulp.task('default', [ 'browser-sync' ])