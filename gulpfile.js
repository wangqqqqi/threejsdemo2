var gulp = require("gulp"),
	//minifycss = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	sass = require("gulp-sass"),
	livereload = require("gulp-livereload"),
	connect = require("gulp-connect"),
	notify = require("gulp-notify"),
	uglify = require("gulp-uglify"),
	sourcemaps = require("gulp-sourcemaps");

var paths = {
	css:["./skin/**/css/*.css"],
	js:["./js/*.js"],
	jssize:["./libs/app.js"],
	html:["./*.html"]
};

gulp.task("connect", function() {
	connect.server({
		root:"./",
		port: 8006,
		livereload: true,
		host:"172.31.156.142"
	});
});


gulp.task("css", function() {
	return gulp.src("./css/*.css")
		.pipe(connect.reload());
});

gulp.task("html", function() {
	return gulp.src(paths.html)
		.pipe(connect.reload());
});

gulp.task("js", function() {
	return gulp.src(paths.js)
		.pipe(connect.reload());
});

gulp.task("jsmin", function() {
	return gulp.src("./libs/app.js")
		.pipe(rename({ suffix: ".min" }))
		.pipe(uglify())
		.pipe(gulp.dest("./libs/min"));
});

gulp.task("sass", function() {
	return gulp.src("./sass/default.scss")
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on("error",sass.logError))
		.pipe(sourcemaps.write("maps"))
		.pipe(gulp.dest("./css"))
		.pipe(connect.reload());
});

gulp.task("lhsass", function() {
	return gulp.src("./sass/lh2018.scss")
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on("error",sass.logError))
		.pipe(sourcemaps.write("maps"))
		.pipe(gulp.dest("./css"))
		.pipe(connect.reload());
});

gulp.task("watch", function() {
	// livereload.listen(); //要在这里调用listen()方法
	gulp.watch("./sass/*.scss", ["sass"]);
	//gulp.watch('./sass/*.scss', ['lhsass']);
	gulp.watch(paths.css, ["css"]);
	gulp.watch(paths.js, ["js"]);
	// gulp.watch(paths.jssize, ['jsmin']);
	gulp.watch(paths.html, ["html"]);
});

gulp.task("default", ["connect","watch"]);
