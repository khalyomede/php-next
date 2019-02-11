"use strict";
var fs_1 = require("fs");
var joi = require("joi");
var fancyLog = require("fancy-log");
/**
 * Get the code, either from a string containing a code or a file path.
 *
 * @param {String} source Either a code or a file path.
 * @return {String}
 */
var getCode = function (source, options) {
    var code;
    if (options.debug) {
        fancyLog.info("reading source code");
    }
    try {
        code = fs_1.readFileSync(source);
        if (options.debug) {
            fancyLog.info("code fetched from " + source);
        }
        code = code.toString();
    }
    catch (exception) {
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
var parseOptions = function (options) {
    var parsedOptions = options;
    var schema = joi.object().keys({
        features: joi.array().items(joi.func()),
        target: joi.number().integer(),
        validate: joi.boolean(),
        debug: joi.boolean()
    });
    joi.validate(parsedOptions, schema);
    if (parsedOptions !== null &&
        parsedOptions !== undefined &&
        parsedOptions.constructor === Object) {
        if (!("target" in parsedOptions)) {
            parseOptions["target"] = "7.0.0";
        }
    }
    else {
        parsedOptions = {
            features: [],
            debug: false
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
var phpNext = function (source, options) {
    var parsedOptions = parseOptions(options);
    var transpiledCode = getCode(source, options);
    for (var _i = 0, _a = parsedOptions.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        transpiledCode = feature(transpiledCode, options);
    }
    return transpiledCode;
};
module.exports = phpNext;
