"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
database_1.default();
const app_1 = __importDefault(require("./app"));
//START SERVER
app_1.default.listen(app_1.default.get('port'), () => {
    console.log(`--SERVER STARTED--`);
});
