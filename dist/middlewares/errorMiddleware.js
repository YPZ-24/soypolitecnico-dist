"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
function errorMiddleware(error, req, res, next) {
    let errorObject;
    if (typeof error.toJson === 'function') {
        errorObject = error.toJson();
    }
    else if (error instanceof ability_1.ForbiddenError) {
        errorObject = {
            status: 401,
            name: 'Unauthorized',
            message: 'You are not authorized'
        };
    }
    else {
        errorObject = {
            status: 500,
            name: 'UnknownError',
            message: 'Internal Error'
        };
    }
    res.status(errorObject.status).json(errorObject);
}
exports.default = errorMiddleware;
