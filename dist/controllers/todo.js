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
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../models/Todo");
exports.addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new Todo_1.Todo({
            userId: req.body.user,
            text: req.body.text
        });
        yield todo.save();
        return res.status(201).json({ message: 'created' });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Todo_1.Todo.find({ userId: req.params.userId });
        return res.status(200).json({ todos: data });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
//# sourceMappingURL=todo.js.map