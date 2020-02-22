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
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let checkForUser = yield User_1.User.findOne({ email: req.body.email });
        if (checkForUser) {
            return res.status(400).json({ message: 'That email is already registered' });
        }
        else {
            return bcrypt_1.default.hash(req.body.password, 12, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.status(400).json({
                        message: "error hashing  password"
                    });
                }
                checkForUser = new User_1.User({
                    email: req.body.email,
                    password: hash
                });
                yield checkForUser.save();
                return res.status(201).json({ message: 'registered' });
            }));
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'server error' });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }
        const matched = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!matched) {
            return res.status(400).json({ message: 'password incorect' });
        }
        const token = jsonwebtoken_1.default.sign({ data: user }, 'secret', {
            expiresIn: "1h"
        });
        return res.status(200).json({ message: 'Login Success', token, user });
    }
    catch (err) {
        return res.status(500).json({ message: 'server error' });
    }
});
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({});
        return res.status(200).json({ user: users });
    }
    catch (err) {
        return res.status(500).json({ message: 'server error' });
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.deleteOne({ _id: req.body.userId });
        return res.status(200).json({ user: users });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
//# sourceMappingURL=user.js.map