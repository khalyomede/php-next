"use strict";
/**
 * Transpiles syntax.
 *
 * @param {String} code
 * @return {String}
 */
var useFrom = function (code) {
    return code.replace(/use(.+)from(.+);/g, function (match, classes, namespace) {
        var classList = classes.split(",").map(function (item) { return item.trim(); });
        var statements = [];
        namespace = namespace.trim();
        for (var _i = 0, classList_1 = classList; _i < classList_1.length; _i++) {
            var className = classList_1[_i];
            statements.push("use " + namespace + "\\" + className + ";");
        }
        return statements.join("\n");
    });
};
module.exports = useFrom;
