import { User } from '../models/User';
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {

    try {
        let checkForUser = await User.findOne({ email: req.body.email });
        if (checkForUser) {
            return res.status(400).json({ message: 'That email is already registered' });
        } else {
            return bcrypt.hash(req.body.password, 12, async (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error hashing  password"
                    })
                }
                checkForUser = new User({
                    email: req.body.email,
                    password: hash
                });
                await checkForUser.save();
                return res.status(201).json({ message: 'Registered' })
            })
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const login = async (req: Request, res: Response) => {

    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404).json({ message: 'Email not found' })
        }
        const matched = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!matched) {
            return res.status(400).json({ message: 'Password incorrect' })
        }
        const token = jwt.sign({ data: user },
            'secret', {
            expiresIn: "1h"
        });
        return res.status(200).json({ message: 'Login Success', token, user })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.find({});
        return res.status(200).json({ user: users })
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    try {
        const users = await User.deleteOne({ _id: req.body.userId });
        return res.status(200).json({ user: users })
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}

