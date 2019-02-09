/**
 * Transpiles short method (no "function" before the method name").
 *
 * @param {String} code
 * @return {String}
 */
const shortMethod = (code: string) =>
	code.replace(
		/(protected|public|static|final|private)\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*\(/g,
		"$1 function $2("
	);

export = shortMethod;
