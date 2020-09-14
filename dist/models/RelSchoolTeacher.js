"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const RelSchoolTeacherSchema = new mongoose_1.Schema({
    idTeacher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    idSchool: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});
RelSchoolTeacherSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('RelSchoolTeacher', RelSchoolTeacherSchema);
