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
exports.addRankCommentV = exports.createQualificationOnlineV = void 0;
const yup = __importStar(require("yup"));
const generalFunctions_1 = require("./generalFunctions");
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const RankComment_1 = __importDefault(require("../models/RankComment"));
const QualificationOnline_1 = __importDefault(require("../models/QualificationOnline"));
exports.createQualificationOnlineV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const CreateQualificationOnlineSchema = yup.object().shape({
        idTeacher: yup.string().required(),
        idSubject: yup.string().required(),
        learn: yup.boolean().required(),
        isEasy: yup.boolean().required(),
        answer: yup.boolean().required(),
        sentDocuments: yup.boolean().required(),
        madeVideocalls: yup.boolean().required(),
        dissapear: yup.boolean().required(),
        beFair: yup.boolean().required(),
        comment: yup.string().matches(/^[a-z 0-9 .,;\s]+$|^$/i, 'Comment can only contains letters, numbers and points')
    });
    CreateQualificationOnlineSchema.validateSync(req.body);
    yield generalFunctions_1.teacherExists(req.body.idTeacher);
    yield generalFunctions_1.subjectExists(req.body.idSubject);
    //Si el usuario ya calificó a este profe en esta materia
    const idUser = req.user._id;
    const { idTeacher, idSubject } = req.body;
    const q = yield QualificationOnline_1.default.find({ idUser, idTeacher, idSubject }).exec();
    if (q.length !== 0) {
        throw new ValidationError_1.default({ message: 'You already qualificate Teacher-Subject' });
    }
});
exports.addRankCommentV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rankSchema = yup.object().shape({
        rank: yup.number().integer().min(1).max(5).required()
    });
    rankSchema.validateSync(req.body);
    const { idComment } = req.params;
    yield generalFunctions_1.commentExists(idComment);
    const { idUser } = req.user._id;
    const rankComment = yield RankComment_1.default.findOne({ idComment, idUser }).exec();
    if (rankComment) {
        throw new ValidationError_1.default({ message: 'You already rank this comment' });
    }
});
