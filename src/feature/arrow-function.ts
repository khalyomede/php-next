/**
 * Transpiles lambda shorthand.
 *
 * @param {String} code
 * @return {String}
 */
const lambda = (code: string): string => {
	code = code.replace(/\)\s*(=>)\s*(.*);/g, ") { return $2; }");
	code = code.replace(
		/([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)(\(.+\)\s*[:]*\s*\w+\s*)=>(\s*{)/g,
		"function $1$2{"
	);

	return code;
};

export = lambda;
