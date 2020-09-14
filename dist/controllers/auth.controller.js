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
exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const lockError_1 = __importDefault(require("../errors/lockError"));
function createJWT(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.JWT_SECRET, { expiresIn: 86400 });
}
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickName, idSchool, idCareer, email, password } = req.body;
    let newUser = new User_1.default({ nickName, idSchool, idCareer, email, password });
    yield newUser.save();
    return res.status(201).json({ status: 200, message: 'Register success' });
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let user = yield User_1.default.findOne({ email }).exec();
    const token = createJWT(user);
    if (user.lock)
        throw new lockError_1.default(user.nickName);
    return res.status(200).json({ status: 200, token });
});
