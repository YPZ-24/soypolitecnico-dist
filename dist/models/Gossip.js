"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@casl/mongoose");
const mongoose_2 = require("mongoose");
const GossipSchema = new mongoose_2.Schema({
    idTeacher: {
        type: mongoose_2.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    gossip: {
        type: String,
        required: true,
        max: 500,
        trim: true
    }
});
GossipSchema.plugin(mongoose_1.accessibleRecordsPlugin);
exports.default = mongoose_2.model('Gossip', GossipSchema);
