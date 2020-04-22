var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('src/sass/main.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src(['src/js/common.js', 'src/libs/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('code', function() {
	return gulp.src('src/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function() {
	return gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css')); 
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({ 
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('prebuild', async function() {
	var buildCss = gulp.src([
		'src/css/main.css',
		'src/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('src/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('src/*.html', gulp.parallel('code'));
	gulp.watch(['src/js/common.js', 'src/libs/**/*.js'], gulp.parallel('scripts')); 
});

gulp.task('default', gulp.parallel('css-libs', 'sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));