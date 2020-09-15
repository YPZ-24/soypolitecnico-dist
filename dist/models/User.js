"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const mongoose_2 = require("@casl/mongoose");
const UserSchema = new mongoose_1.Schema({
    nickName: {
        type: String,
        required: true,
        maxlength: 30,
        unique: true,
        uppercase: true
    },
    idSchool: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    idCareer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Career',
        required: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 320,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
    },
    lock: {
        type: Boolean,
        required: false
    }
});
UserSchema.pre(('save'), function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        const salt = yield bcrypt_1.default.genSalt(config_1.default.BCRYP.SALT);
        const hash = yield bcrypt_1.default.hash(this.password, salt);
        this.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
UserSchema.plugin(mongoose_2.accessibleRecordsPlugin);
exports.default = mongoose_1.model('User', UserSchema);
