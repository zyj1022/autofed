// npm install del gulp-load-plugins gulp gulp-cache gulp-concat gulp-cssnano gulp-imagemin gulp-notify gulp-sass gulp-rename gulp-rimraf gulp-watch path run-sequence sass browser-sync --save-dev
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var reload = browserSync.reload;

// Task to compile SCSS
gulp.task('sass', function() {
	return gulp.src('src/scss/style.scss')
		.pipe($.plumber())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe($.rename({suffix: '.min'}))
		.pipe($.csso())
		.pipe(gulp.dest('src/css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({
			stream: true
		}))
		.pipe($.notify("SCSS Compiled Successfully :)"));
});


// MOVE JS
gulp.task('movejs', function() {
    return gulp.src('src/js/main.js')
    .pipe($.concat('main.js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe($.notify('MoveJS Task Complete :)'));
});

// MOVE html
gulp.task('move2out', function() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe($.notify('MoveHtml Task Complete :)'));
});

// Minify Images
gulp.task('imagemin', function() {
  return gulp.src('src/images/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images/'))
    .pipe($.notify('Imagemin Task Complete :)'));
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
   gulp.watch('src/**/*.html').on('change', reload);
});

gulp.task('default', ['watch']);

gulp.task('build', function() {
  runSequence('imagemin','movejs','move2out');
});
