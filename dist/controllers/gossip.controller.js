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
exports.getGossips = exports.createGossip = void 0;
const Gossip_1 = __importDefault(require("../models/Gossip"));
const Teacher_1 = __importDefault(require("../models/Teacher"));
exports.createGossip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher, gossip } = req.body;
    const newGossip = new Gossip_1.default({ idTeacher, gossip });
    yield newGossip.save();
    res.status(200).json({ status: 200, message: 'Saved' });
});
exports.getGossips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gossips = yield Gossip_1.default.find().populate('idTeacher', 'teacherName').exec();
    const data = gossips.map((g) => {
        if (g.idTeacher instanceof Teacher_1.default) {
            return {
                _id: g._id,
                gossip: g.gossip,
                teacherName: g.idTeacher.teacherName
            };
        }
    });
    res.status(200).json(data);
});
