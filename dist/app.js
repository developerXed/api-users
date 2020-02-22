"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userController = __importStar(require("./controllers/user"));
const todoController = __importStar(require("./controllers/todo"));
const authorize = __importStar(require("./helpers/authHelper"));
const app = express_1.default();
const port = 3000;
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect("mongodb+srv://max:logitech12@cluster0-azt84.mongodb.net/todo-wien?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/get-users', authorize.VerifyToken, userController.getUsers);
app.post('/delete-user', authorize.VerifyToken, userController.deleteUser);
app.get('/get-todos/:userId', authorize.VerifyToken, todoController.getTodos);
app.post('/add-todo', authorize.VerifyToken, todoController.addTodo);
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map