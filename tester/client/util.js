"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = void 0;
exports.isEqual = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return objects.every(function (obj) { return JSON.stringify(obj) === JSON.stringify(objects[0]); });
};
