import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import * as userController from './controllers/user';
import * as todoController from './controllers/todo';
import * as authorize from './helpers/authHelper';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://max:logitech12@cluster0-azt84.mongodb.net/todo-wien?retryWrites=true&w=majority", {
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