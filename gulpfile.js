var
	gulp = require("gulp"),
	sass = require("gulp-sass"),
	path = require("path");

var paths = {
	appScss: ["app/scss/**/*.scss"]
};

gulp.task("sass", function () {
	return gulp.src(paths.appScss)
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest(function (file) {
			return path.join(file.base, "..", "css");
		}))
		pipe(gulp.dest("app/css"))
});

gulp.task("watch-sass", ["sass"], function() {
	gulp.watch(paths.appScss, ["sass"])
});
