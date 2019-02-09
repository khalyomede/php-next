/**
 * Transpiles syntax.
 *
 * @param {String} code
 * @return {String}
 */
const useFrom = (code: string): string =>
	code.replace(
		/use(.+)from(.+);/g,
		(match: string, classes: string, namespace: string) => {
			const classList = classes.split(",").map(item => item.trim());
			let statements = [];

			namespace = namespace.trim();

			for (const className of classList) {
				statements.push(`use ${namespace}\\${className};`);
			}

			return statements.join("\n");
		}
	);

export = useFrom;
