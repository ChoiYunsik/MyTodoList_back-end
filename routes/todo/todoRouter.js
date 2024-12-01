import express from 'express';
import { registerTodo, updateTodo, deleteTodo, getTodo, updateTodoTitle } from '../../controller/todo/todo.js';

const todoRouter = express.Router();

todoRouter.get("/get", getTodo);
todoRouter.post("/register", registerTodo);
todoRouter.put("/update", updateTodo);
todoRouter.put("/titleUpdate", updateTodoTitle);
todoRouter.delete("/delete", deleteTodo);

export default todoRouter;