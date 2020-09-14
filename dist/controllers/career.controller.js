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
exports.createRelCareerSchool = exports.getCareers = exports.deleteCareer = exports.updateCareer = exports.createCareer = void 0;
const Career_1 = __importDefault(require("../models/Career"));
const RelSchoolCareer_1 = __importDefault(require("../models/RelSchoolCareer"));
exports.createCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { careerName } = req.body;
    const career = new Career_1.default({ careerName });
    yield career.save();
    res.status(200).json({ status: 200, message: 'Career Saved' });
});
exports.updateCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { careerName } = req.body;
    const { idCareer } = req.params;
    const career = yield Career_1.default.findById(idCareer).exec();
    career.careerName = careerName;
    yield career.save();
    res.status(200).json({ status: 200, message: 'Career Updated' });
});
exports.deleteCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCareer } = req.params;
    yield Career_1.default.findByIdAndDelete(idCareer).exec();
    yield RelSchoolCareer_1.default.deleteMany({ idCareer });
    res.status(200).json({ status: 200, message: 'Career and its relatiosn were deleted' });
});
exports.getCareers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const careers = yield Career_1.default.find().sort('careerName').exec();
    res.status(200).json(careers);
});
exports.createRelCareerSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCareer } = req.params;
    const { idSchool } = req.body;
    const rel = new RelSchoolCareer_1.default({ idCareer, idSchool });
    yield rel.save();
    res.status(200).json({ status: 200, message: 'Career-School saved' });
});
