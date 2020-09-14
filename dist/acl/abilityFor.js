"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilityFor = void 0;
const ability_1 = require("@casl/ability");
const permissions_1 = require("./permissions");
const UnauthorizedError_1 = __importDefault(require("../errors/UnauthorizedError"));
function defineAbilityFor(user) {
    const builder = new ability_1.AbilityBuilder();
    if (typeof permissions_1.rolePermissions[user.role] === 'function') {
        permissions_1.rolePermissions[user.role](user, builder);
    }
    else {
        throw new UnauthorizedError_1.default();
    }
    return builder.build();
}
exports.defineAbilityFor = defineAbilityFor;
