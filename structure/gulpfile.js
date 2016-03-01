var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify'),
    cache       = require('gulp-cache'),
    uglify      = require('gulp-uglify'),
    imagemin    = require('gulp-imagemin'),
    cssnano     = require('gulp-cssnano'),
    path        = require('path'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence');

// Task to compile SCSS
gulp.task('sass', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sass({
      errLogToConsole: false,
      paths: [ path.join(__dirname, 'scss', 'includes') ]
    })
    .on("error", notify.onError(function(error) {
      return "Failed to Compile SCSS: " + error.message;
    })))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
    //Add the suffix ‘min’
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(notify("SCSS Compiled Successfully :)"));
});


// MOVE JS
gulp.task('movejs', function() {
    return gulp.src('src/js/main.js')
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify('MoveJS Task Complete :)'));
});

// MOVE html
gulp.task('move2out', function() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(notify('MoveHtml Task Complete :)'));
});

// Minify Images
gulp.task('imagemin', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images/'))
    .pipe(notify('Imagemin Task Complete :)'));
});

// BrowserSync Task (Live reload)
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('watch', ['browserSync'], function () {
   gulp.watch('src/scss/**/*', ['sass']);
   gulp.watch('src/images/*', ['imagemin']);
   gulp.watch('src/js/main.js', ['movejs']);
   gulp.watch('src/**/*.html', ['move2out']);
   gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);

gulp.task('build', function() {
  runSequence('imagemin','movejs','move2out');
});
