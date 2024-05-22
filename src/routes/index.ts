import {  Hono } from "hono";
import { authMiddleware, taskValidationMiddleware } from "../middlewares";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller";


const router = new Hono().basePath('/auth')

router.use('/todos/*', authMiddleware);


router.post('/todos', taskValidationMiddleware, createTodo);
router.get('/todos', getTodos);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export { router };
