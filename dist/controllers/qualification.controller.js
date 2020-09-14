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
exports.addRankComment = exports.createQualificationOnline = void 0;
const QualificationOnline_1 = __importDefault(require("../models/QualificationOnline"));
const Comment_1 = __importDefault(require("../models/Comment"));
const RankComment_1 = __importDefault(require("../models/RankComment"));
//R
exports.createQualificationOnline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher, idSubject, learn, isEasy, answer, sentDocuments, madeVideocalls, dissapear, beFair, comment } = req.body;
    const idUser = req.user._id;
    const newQualificationOnline = new QualificationOnline_1.default({
        idUser,
        idTeacher,
        idSubject,
        learn,
        isEasy,
        answer,
        sentDocuments,
        madeVideocalls,
        dissapear,
        beFair
    });
    yield newQualificationOnline.save();
    let message = 'Qualification';
    if (comment) {
        const newComment = new Comment_1.default({
            idUser,
            idTeacher,
            idSubject,
            idQualificationOnline: newQualificationOnline._id,
            comment,
            online: true
        });
        yield newComment.save();
        newQualificationOnline.idComment = newComment._id;
        newQualificationOnline.save();
        message += ' Comment';
    }
    res.send({ message: message + ' created' });
});
//R
exports.addRankComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.user._id;
    const { idComment } = req.params;
    const { rank } = req.body;
    const newRankComment = new RankComment_1.default({ idUser, idComment, rank });
    yield newRankComment.save();
    res.status(200).json({ message: 'Rank Saved' });
});
