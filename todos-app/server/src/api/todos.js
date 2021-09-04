import { Router } from "express";
// import Todo from '../models/Todo';
import { Todo } from '../models';

const todoRouter = Router();

todoRouter.get('/', async (req, res) => {
    try {
        // Get all todos from the DB
        let todos = await Todo.find();
        setTimeout(() =>{
            return res.status(200).json(todos);
        }, 3000)
    } catch (err) {
        console.log("TODOS_GET", err.message);
        return res.status(500).json({
            message: err.message,
        })
    }
});

todoRouter.post('/', async(req, res) => {
    try {
        let { body } = req;

        // let newTodo = new Todo(body);
        // let savedTodo = await newTodo.save();
        // return res.status(201).json(savedTodo);

        let newTodo = await Todo.create(body);
        return res.status(201).json(newTodo);
    } catch (err) {
        console.log("TODOS_POST", err.message);
        return res.status(500).json({
            message: err.message,
        })
    }
});

todoRouter.put('/:id', async(req, res) => {
    try {
        let {id} = req.params;
        // Find todo by that by id
        let todo = await Todo.findById(id);
        // if not exists then return 404
        if(!todo){
            return res.status(404).json({
                message: "Todo not found",
            });
        }
        // otherwise update and return the updated todo
        todo.completed = !todo.completed;
        let updatedTodo = await todo.save();
        return res.status(200).json(updatedTodo);
    } catch (err) {
        console.log("TODOS_PUT", err.message);
        return res.status(500).json({
            message: err.message,
        })
    }
});

todoRouter.delete('/:id', async(req, res) => {
    try {
        let {id} = req.params;
        // Find todo by that by id
        let todo = await Todo.findByIdAndDelete(id);
        // if not exists then return 404
        if(!todo){
            return res.status(404).json({
                message: "Todo not found",
            });
        }
        return res.status(200).json({
            message: "Todo deleted successfully.",
            todo
        });
    } catch (err) {
        console.log("TODOS_DELETE", err.message);
        return res.status(500).json({
            message: err.message,
        })
    }
});

export default todoRouter;