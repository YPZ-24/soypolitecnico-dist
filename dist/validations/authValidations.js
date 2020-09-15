"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signInV = exports.signUpV = void 0;
const yup = __importStar(require("yup"));
const User_1 = __importDefault(require("../models/User"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const generalFunctions_1 = require("./generalFunctions");
exports.signUpV = ({ body }) => __awaiter(void 0, void 0, void 0, function* () {
    const signUpSchema = yup.object().shape({
        nickName: yup.string().required().max(30),
        idSchool: yup.string().required(),
        idCareer: yup.string().required(),
        email: yup.string().required().email().max(320),
        password: yup.string().required().max(50).min(8),
        confirmPassword: yup.string().required().max(50).min(8).oneOf([yup.ref('password')], 'Passwords must match'),
    });
    signUpSchema.validateSync(body, { strict: true });
    const { password, nickName, email, confirmPassword, idSchool, idCareer } = body;
    yield generalFunctions_1.schoolExists(idSchool);
    yield generalFunctions_1.careerExists(idCareer);
    yield generalFunctions_1.relSchoolCareerExists(idSchool, idCareer);
    if (password !== confirmPassword) {
        throw new ValidationError_1.default({ message: 'Passwords do not match' });
    }
    let user = yield User_1.default.findOne({ email }).exec();
    if (user) {
        throw new ValidationError_1.default({ message: 'The email is already in use' });
    }
    let upperNick = nickName.toUpperCase();
    user = yield User_1.default.findOne({ upperNick }).exec();
    if (user) {
        throw new ValidationError_1.default({ message: 'The nickName is already in use' });
    }
});
exports.signInV = ({ body }) => __awaiter(void 0, void 0, void 0, function* () {
    const signUpSchema = yup.object().shape({
        email: yup.string().required().email().max(320),
        password: yup.string().required().min(8).max(50)
    });
    signUpSchema.validateSync(body, { strict: true });
    let user = yield User_1.default.findOne({ email: body.email }).exec();
    if (!user) {
        throw new ValidationError_1.default({ message: 'The user does not exist' });
    }
    const isMatch = yield user.comparePassword(body.password);
    if (!isMatch) {
        throw new ValidationError_1.default({ message: 'Email or password are incorrect' });
    }
});
