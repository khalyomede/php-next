const { readFileSync } = require("fs");
const { expect } = require("chai");
const phpNext = require("../../lib/main");

describe("usage", () => {
	it("should load a file from a string", () => {
		const path = __dirname + "/../code-sample/simple.php";
		const expected = readFileSync(path).toString();
		const actual = phpNext(path);

		expect(actual).to.be.equal(expected);
	});

	it("should be able to read string code", () => {
		const code = '<?php echo "hello world;" ?>';
		const expected = code;
		const actual = phpNext(code);

		expect(actual).to.be.equal(expected);
	});
});
