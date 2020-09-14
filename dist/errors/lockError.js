"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LockError extends Error {
    constructor(nickName) {
        super(`Your user was locked ${nickName}`);
        this.name = 'LockError';
        this.nickName = 'ValidationError';
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
exports.default = LockError;
