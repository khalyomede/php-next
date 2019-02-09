/**
 * Transpiles "for ... in" loop.
 *
 * @param {String} code
 * @return {String}
 */
const forIn = (code: string): string =>
	code.replace(
		/for\s*\(\s*(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s+in\s+(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g,
		"foreach ($2 as $1)"
	);

export = forIn;
