"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const passport_2 = __importDefault(require("passport"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const school_routes_1 = __importDefault(require("./routes/school.routes"));
const qualification_routes_1 = __importDefault(require("./routes/qualification.routes"));
const roles_routes_1 = __importDefault(require("./routes/roles.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const gossip_routes_1 = __importDefault(require("./routes/gossip.routes"));
const app = express_1.default();
//SETTINGS
app.set('port', 8000);
//MIDDLEWARES
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_2.default.initialize());
passport_2.default.use(passport_1.default);
app.get('/api/gn2/v2', (req, res) => {
    res.send('Server started');
});
//ROUTES
app.use('/api/gn2/v2', auth_routes_1.default);
app.use('/api/gn2/v2', teacher_routes_1.default);
app.use('/api/gn2/v2', user_routes_1.default);
app.use('/api/gn2/v2', school_routes_1.default);
app.use('/api/gn2/v2', qualification_routes_1.default);
app.use('/api/gn2/v2', roles_routes_1.default);
app.use('/api/gn2/v2', subject_routes_1.default);
app.use('/api/gn2/v2', career_routes_1.default);
app.use('/api/gn2/v2', gossip_routes_1.default);
//ERROR MIDDLEWARE
app.use(errorMiddleware_1.default);
exports.default = app;
