/*
gulp-browser-sync处理css,JS,images文件进行自动化压缩，处理sass文件转换为css文件
实时监听和实时更新修改后的效果！
*/


//导入相关的包
var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var bs = require("browser-sync").create();
var sass = require("gulp-sass");

//未经处理资源的路径，以及处理过后的路径
var path = {
    "html":"./templates/**/",
    "css":"./src/css/",
    "js":"./js/js/",
    "images":"./images/",

    "css_dist" : "./dist/css/",
    "js_dist":"./dist/js/",
    "images_dist":"./dist/images/"

}

//处理html文件任务
gulp.task("html",function () {
    gulp.src(path.html + "*.html")
        .pipe(bs.stream())
})



//处理css的任务
// gulp.task("css",function () {
//     gulp.src(path.css + "*.css")
//         .pipe(cssnano())
//         .pipe(rename({"suffix":".min"}))
//         .pipe(gulp.dest(path.css_dist))
//         .pipe(bs.stream())
// })

//处理sass转换为css，并压缩css任务
gulp.task("scss",function () {
    gulp.src(path.css + "*.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(cssnano())
        .pipe(rename({"suffix":".min"}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())
})



//处理js的任务
gulp.task("js",function () {
    gulp.src(path.js + "*.js")
        .pipe(uglify())
        .pipe(rename({"suffix":".min"}))
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())
})

//处理图片的任务
gulp.task("images",function () {
    gulp.src(path.images + "*.*")
        .pipe(cache(imagemin()))
        .pipe.dest(path.images_dist)
        .pipe(bs.stream())
})



//监听css,JS,Images的文件，修改后自动处理
gulp.task("watch",function () {
    //gulp.watch(path.css + "*.css",["css"])  //如只需css，把注释去掉即可，还需要去掉处理css的任务
    gulp.watch(path.css + "*.scss",["scss"])
    gulp.watch(path.js + "*.js",["js"])
    gulp.watch(path.images + "*.*",["images"])
    gulp.watch(path.html + "*.html",["html"])
})


//初始化browser-sync的任务
gulp.task("bs",function(){
	bs.init({
		'server':{
			'baseDir':'./'
		}
	})
})

//创建一个默认任务，启动browser-sync
gulp.task("default",["bs","watch"])




