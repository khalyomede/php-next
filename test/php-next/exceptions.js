const fs = require("fs");
const expect = require("chai").expect;

const phpNext = require("../../lib/main");
const arrowFunction = require("../../lib/feature/arrow-function");
const useFrom = require("../../lib/feature/use-from");
const codeSample = '<?php echo "hello world"; ?>';

describe("php-next", () => {
	describe("exceptions", () => {
		describe("options", () => {
			it("should return an exception if all the features are not functions", () => {
				expect(() => {
					phpNext(__dirname + "/../code-sample/simple.php", {
						features: ["hello world"]
					});
				}).to.throw(TypeError);
			});

			it("should return an exception if one of the feature is not a function", () => {
				expect(() => {
					phpNext(__dirname + "/../code-sample/simple.php", {
						features: [arrowFunction, "hello world", importSyntax]
					});
				}).to.throw(TypeError);
			});
		});
	});

	describe("exceptions messages", () => {
		describe("options", () => {
			it("should return an exception message if all the features are not functions", () => {
				expect(() => {
					phpNext(__dirname + "/../code-sample/simple.php", {
						features: ["hello world"]
					});
				}).to.throw("feature is not a function");
			});

			it("should return an exception message if one of the feature is not a function", () => {
				expect(() => {
					phpNext(__dirname + "/../code-sample/simple.php", {
						features: [arrowFunction, "hello world", importSyntax]
					});
				}).to.throw("feature is not a function");
			});
		});
	});
});
