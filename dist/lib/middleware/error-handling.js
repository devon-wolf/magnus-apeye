"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = exports.handleError = void 0;
var handleError = function (err, req, res) {
    var status = err.status, error = err.error;
    res.status(status || 500).send(error.message);
};
exports.handleError = handleError;
var handleNotFound = function (req, res, next) {
    next({
        error: new Error('Not Found'),
        status: 404,
    });
};
exports.handleNotFound = handleNotFound;
