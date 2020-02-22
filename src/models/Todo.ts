import { Model, Document, model, Schema } from 'mongoose'

export interface ITodo extends Document {
    userId: string;
    text: string;
}

const todoSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true }
})
export const Todo: Model<ITodo> = model('Todo', todoSchema);