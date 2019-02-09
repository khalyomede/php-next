"use strict";
var fs_1 = require("fs");
var fileExists = require("file-exists");
var joi = require("joi");
/**
 * Get the code, either from a string containing a code or a file path.
 *
 * @param {String} source Either a code or a file path.
 * @return {String}
 */
var getCode = function (source) {
    return fileExists(source) ? fs_1.readFileSync(source).toString() : source;
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
var phpNext = function (source, options) {
    var parsedOptions = parseOptions(options);
    var transpiledCode = getCode(source);
    var index = 1;
    for (var _i = 0, _a = parsedOptions.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        transpiledCode = feature(transpiledCode, {
            target: options.target
        });
        index++;
    }
    return transpiledCode;
};
module.exports = phpNext;
