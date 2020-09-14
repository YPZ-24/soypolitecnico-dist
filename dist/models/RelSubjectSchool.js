"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const RelSubjectSchoolSchema = new mongoose_1.Schema({
    idSubject: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    idSchool: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});
RelSubjectSchoolSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('RelSubjectSchool', RelSubjectSchoolSchema);
