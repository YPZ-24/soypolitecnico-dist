"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
exports.SchoolSchema = new mongoose_1.Schema({
    schoolName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
        uppercase: true
    },
});
exports.SchoolSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('School', exports.SchoolSchema);
