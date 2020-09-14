"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolesV = void 0;
const ability_1 = require("@casl/ability");
exports.getRolesV = (req) => {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('read', 'Role');
};
