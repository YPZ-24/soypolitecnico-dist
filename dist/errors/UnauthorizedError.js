"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedError extends Error {
    constructor() {
        super('You are not authorized');
        this.name = 'Unauthorized';
        this.status = 401;
    }
    toJson() {
        return {
            name: this.name,
            status: this.status,
            message: this.message
        };
    }
}
exports.default = UnauthorizedError;
