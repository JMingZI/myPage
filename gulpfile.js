const gulp = require('gulp')
const babel = require('gulp-babel')
const runSequence = require('run-sequence')
const pump = require('pump')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const clean = require('gulp-clean')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('clean', function () {
    return gulp.src('dist', {read: false}).pipe(clean())
})

gulp.task('sass', function () {
    return gulp.src('./src/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'))
})

gulp.task('html', () => {
    return gulp.src(['rev/**/*.json', '*.html'])
        .pipe(revCollector({
            dirReplacements: {
                'src/js/': './js/',
                'src/style/': './css/'
            }
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('js', (cb) => {
    pump([
        gulp.src('src/js/*.js'),
        babel({
            presets: [["env", { 
                "debug": true,
                "modules": "commonjs",
                "useBuiltIns": "usage",
                "targets": {
                    "browsers": ["safari >= 7", "ios >= 7"]
                }
            }]]
        }),
        rev(),
        gulp.dest('dist/js/'),
        rev.manifest(),
        gulp.dest('./rev/js')
    ], cb)
})

gulp.task('default', (done) => {
    runSequence('clean', 'js', 'sass', 'html', done)
})

gulp.task('watch', () => {
    gulp.watch('./index.html', ['html'])
    gulp.watch('./src/js/*.js', ['js'])
    gulp.watch('./src/style/*.scss', ['sass'])
})