const phpNext = require("../../lib/main");
const arrowFunction = require("../../lib/feature/arrow-function");
const shortMethod = require("../../lib/feature/short-method");
const forIn = require("../../lib/feature/for-in");
const useFrom = require("../../lib/feature/use-from");

const transpiledCode = phpNext(__dirname + "/code.php", {
	features: [arrowFunction, shortMethod, forIn, useFrom],
	validate: true
});

console.log(transpiledCode);
