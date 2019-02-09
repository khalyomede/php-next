const { src, dest, series, watch } = require("gulp");
const typescript = require("gulp-typescript");

const js = () =>
	src("src/**/*.ts")
		.pipe(typescript())
		.pipe(dest("lib"));

const listen = () => watch("src/**/*.ts", series(js));

module.exports = { listen };
