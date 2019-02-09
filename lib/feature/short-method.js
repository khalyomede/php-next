"use strict";
/**
 * Transpiles short method (no "function" before the method name").
 *
 * @param {String} code
 * @return {String}
 */
var shortMethod = function (code) {
    return code.replace(/(protected|public|static|final|private)\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*\(/g, "$1 function $2(");
};
module.exports = shortMethod;
