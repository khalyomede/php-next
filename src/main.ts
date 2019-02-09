import { readFileSync } from "fs";
import * as fileExists from "file-exists";
import * as joi from "joi";

interface Options {
	features: Array<Function>;
	target?: String;
	validate?: Boolean;
}

/**
 * Get the code, either from a string containing a code or a file path.
 *
 * @param {String} source Either a code or a file path.
 * @return {String}
 */
const getCode = (source): string =>
	fileExists(source) ? readFileSync(source).toString() : source;

/**
 * Parse an object and return all the keys with their values (or default values if needed).
 *
 * @param {Object} options The options.
 * @return {Object}
 */
const parseOptions = (options: Options): Options => {
	let parsedOptions = options;

	const schema = joi.object().keys({
		features: joi
			.array()
			.items(joi.func())
			.required(),
		target: joi.number().integer(),
		validate: joi.boolean()
	});

	joi.validate(parsedOptions, schema);

	if (!("target" in options)) {
		parseOptions["target"] = "7.0.0";
	}

	return parsedOptions;
};

/**
 * Transpiles next generation PHP code.
 *
 * @param {String} source
 * @param {Object} options
 * @param {Array<Function>} options.feature The list of features you want to support.
 * @param {String} options.target The PHP version you want to transpile to.
 * @param {Boolean} options.validate=true Wether to parse the transpiled code or not (disabling this options will improve performance).
 * @throws {TypeError} If one of the features listed in the options is not a callback.
 */
const phpNext = (source: string, options: Options) => {
	const parsedOptions = parseOptions(options);
	let transpiledCode = getCode(source);
	let index = 1;

	for (const feature of parsedOptions.features) {
		transpiledCode = feature(transpiledCode, {
			target: options.target
		});

		index++;
	}

	return transpiledCode;
};

export = phpNext;
