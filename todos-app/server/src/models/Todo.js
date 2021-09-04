import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true });

const Todo = model('todos', TodoSchema);

export default Todo;