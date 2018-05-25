const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const sass = require("gulp-sass-china");
const jeditor = require("gulp-json-editor");

// ./   当前路径;
// **/* 无论层级无论任何内容;
//css的预编译器; => SASS;
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'));
});

// 编译json的任务
gulp.task('json', function () {
    return gulp.src('./json/**/*.json')
        .pipe(jeditor(function(json){
            json.version = "1.0.0";
            return json;
        }))
        .pipe(gulp.dest('./dist/json'))
        .pipe(connect.reload());
});

//  服务器
gulp.task('connect', function() {
    connect.server({
      port: 8888,
      root:"dist",
      livereload:true
    });
    // run some headless tests with phantomjs
    // when process exits:
    // connect.serverClose();
});
 
// ES6 - ES5
// gulp.task('babelparse', () =>
//     gulp.src('src/app.js')
//         .pipe(babel({
//             presets: ['env']
//         }))
//         .pipe(gulp.dest('dist'))
// );

// 压缩图片
gulp.task('imagemin', function () {
    gulp.src('./images/**/*.{png,jpg,gif,ico,jpeg,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

// 编译html的任务
gulp.task("index",function(){
    return gulp.src("./html/*.html")
           .pipe(gulp.dest("./dist/html"))
           .pipe(connect.reload());
});

// 编译js的任务
gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/src'))
        .pipe(connect.reload());
});

// 实时监测
gulp.task("watch",()=>{
    gulp.watch("./**/*.html",["index"])
    gulp.watch("./src/**/*.js", ["scripts"])
    gulp.watch("./sass/**/*.scss",["sass","index"])
    gulp.watch("./json/**/*.json", ["json"])
})

gulp.task("build",["scripts","index","imagemin","json"])

gulp.task('default', ['connect', 'watch']);
