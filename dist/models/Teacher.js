"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
exports.TeacherSchema = new mongoose_1.Schema({
    teacherName: {
        type: String,
        required: true,
        maxlength: 200,
        unique: true,
        lowercase: true
    }
});
exports.TeacherSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('Teacher', exports.TeacherSchema);
