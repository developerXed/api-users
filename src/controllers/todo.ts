import { Todo } from '../models/Todo';
import { Request, Response, NextFunction } from "express";

export const addTodo = async (req: Request, res: Response) => {

    try {
        const todo = new Todo({
            userId: req.body.user,
            text: req.body.text
        })
        await todo.save()
        return res.status(201).json({ message: 'Created' })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const getTodos = async (req: Request, res: Response) => {

    try {
        const data = await Todo.find({ userId: req.params.userId });
        return res.status(200).json({ todos: data });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}