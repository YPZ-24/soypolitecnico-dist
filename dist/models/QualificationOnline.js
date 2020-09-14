"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const QualificationOnlineSchema = new mongoose_1.Schema({
    idUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    idTeacher: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    idSubject: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    idComment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    learn: {
        type: Boolean,
        required: true,
    },
    isEasy: {
        type: Boolean,
        required: true,
    },
    answer: {
        type: Boolean,
        required: true,
    },
    sentDocuments: {
        type: Boolean,
        required: true,
    },
    madeVideocalls: {
        type: Boolean,
        required: true,
    },
    dissapear: {
        type: Boolean,
        required: true,
    },
    beFair: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
QualificationOnlineSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('QualificationOnline', QualificationOnlineSchema);
