"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const RelSchoolCareerSchema = new mongoose_1.Schema({
    idCareer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Career',
        required: true
    },
    idSchool: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});
RelSchoolCareerSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('RelSchoolCareer', RelSchoolCareerSchema);
