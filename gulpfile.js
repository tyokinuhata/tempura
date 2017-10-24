const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

// Pugのコンパイル
gulp.task('pug', function() {
    gulp.src([ './assets/pug/*.pug', '!./assets/pug/_*.pug' ])
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./public/'));
});

// Pugの自動コンパイル
gulp.task('pug-watch', [ 'pug' ], function() {
    const watcher = gulp.watch('./assets/pug/*.pug', [ 'pug' ]);
    watcher.on('change', function(event) {});
});

// Sassのコンパイル
gulp.task('sass', function() {
    gulp.src('./assets/sass/*.scss')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css/'));
});

// Sassの自動コンパイル
gulp.task('sass-watch', [ 'sass' ], function() {
    const watcher = gulp.watch('./assets/sass/*.scss', [ 'sass' ]);
    watcher.on('change', function(event) {});
});

// ホットリロード
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        open: 'external'
    });
    gulp.watch([ './public/*' ], function() {
        setTimeout(function() {
            browserSync.reload();
        }, 500);
    })
});

// Pug, Sassのコンパイル
gulp.task('compile', [ 'pug', 'sass' ]);

// Pug, Sassの自動コンパイル
gulp.task('watch', [ 'pug-watch', 'sass-watch' ]);

// デフォルト
gulp.task('default', [ 'browser-sync' ]);