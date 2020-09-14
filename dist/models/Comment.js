"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const CommentSchema = new mongoose_1.Schema({
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
    comment: {
        type: String,
        required: true,
        max: 500,
        trim: true
    },
    online: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
CommentSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('Comment', CommentSchema);
