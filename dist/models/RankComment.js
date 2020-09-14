"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@casl/mongoose");
const RankCommentSchema = new mongoose_1.Schema({
    idUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idComment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    rank: {
        type: Number,
        required: true,
        min: 1,
    }
});
RankCommentSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('RankComment', RankCommentSchema);
