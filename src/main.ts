import { readFileSync } from "fs";
import * as joi from "joi";
import * as fancyLog from "fancy-log";

interface Options {
	features?: Array<Function>;
	target?: String;
	validate?: Boolean;
	debug?: Boolean;
}

/**
 * Get the code, either from a string containing a code or a file path.
 *
 * @param {String} source Either a code or a file path.
 * @return {String}
 */
const getCode = (source: string, options: Options): string => {
	let code;

	if (options.debug) {
		fancyLog.info("reading source code");
	}

	try {
		code = readFileSync(source);

		if (options.debug) {
			fancyLog.info(`code fetched from ${source}`);
		}

		code = code.toString();
	} catch (exception) {
		fancyLog.info("plain code read");

		code = source;
	}

	return code;
};

/**
 * Parse an object and return all the keys with their values (or default values if needed).
 *
 * @param {Object} options The options.
 * @return {Object}
 */
const parseOptions = (options: Options): Options => {
	let parsedOptions = options;

	const schema = joi.object().keys({
		features: joi.array().items(joi.func()),
		target: joi.number().integer(),
		validate: joi.boolean(),
		debug: joi.boolean()
	});

	joi.validate(parsedOptions, schema);

	if (
		parsedOptions !== null &&
		parsedOptions !== undefined &&
		parsedOptions.constructor === Object
	) {
		if (!("target" in parsedOptions)) {
			parseOptions["target"] = "7.0.0";
		}

		if (!("debug" in parsedOptions)) {
			parsedOptions["debug"] = false;
		}

		if (!("validate" in parsedOptions)) {
			parsedOptions["validate"] = false;
		}

		if (!("features" in parsedOptions)) {
			parsedOptions["features"] = [];
		}
	} else {
		parsedOptions = {
			features: [],
			debug: false,
			target: "7.0.0",
			validate: false
		};
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
 * @param {Boolean} options.debug=false Wether to display debug information on console or not.
 * @throws {TypeError} If one of the features listed in the options is not a callback.
 */
const phpNext = (source: string, options: Options) => {
	const parsedOptions = parseOptions(options);

	let transpiledCode = getCode(source, parsedOptions);

	for (const feature of parsedOptions.features) {
		transpiledCode = feature(transpiledCode, {
			debug: parsedOptions.debug,
			taret: parsedOptions.target,
			validate: parsedOptions.validate
		});
	}

	return transpiledCode;
};

export = phpNext;
