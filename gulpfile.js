const gulp = require('gulp');

gulp.task('createcomponent', function(done) {
	console.log(process.argv[4]);
	done();
});

//gulp.task('default', gulp.series('copy-fe-core'));

//exports.build = series(copyFECore);