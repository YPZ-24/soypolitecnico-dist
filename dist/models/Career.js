"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const CareerSchema = new mongoose_1.Schema({
    careerName: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
});
CareerSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('Career', CareerSchema);
