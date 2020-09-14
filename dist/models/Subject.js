"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
exports.SubjectSchema = new mongoose_1.Schema({
    subjectName: {
        type: String,
        required: true,
        maxlength: 200,
        unique: true,
        lowercase: true
    }
});
exports.SubjectSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('Subject', exports.SubjectSchema);
