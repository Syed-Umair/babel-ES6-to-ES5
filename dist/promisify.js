'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function promisify(funcOrObject) {
    if (typeof funcOrObject === 'function') {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                args.push(function (err) {
                    var rest = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        rest[_i - 1] = arguments[_i];
                    }
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rest.length === 1 ? rest[0] : rest);
                    }
                });
                funcOrObject.apply(this, args);
            });
        };
    }
    if ((typeof funcOrObject === 'undefined' ? 'undefined' : _typeof(funcOrObject)) === 'object') {
        return Object.keys(funcOrObject).reduce(function (acc, x) {
            acc[x] = promisify(funcOrObject[x]);
            return acc;
        }, {});
    }
    // Neither a func or an object, just return itself
    return funcOrObject;
}
module.exports = promisify;