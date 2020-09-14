"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
RoleSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('Role', RoleSchema);
