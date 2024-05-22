import { Context } from "hono";
import { Todo } from "../types/interface";
import { HTTPException } from "hono/http-exception";


let todos: Todo[] = []

export const createTodo = async (c: Context) => {
    const { task } = await c.req.json<{ task: string }>()
    const newTodo: Todo = {
        id: todos.length + 1,
        task,
        completed: false,
    }
    todos.push(newTodo)
    return c.json(newTodo, 201)
};

export const getTodos = async (c: Context) => {
    return c.json(todos)
};

export const updateTodo = async (c: Context) => {
    const { id } = c.req.param()
    const { task, completed } = await c.req.json<{ task?: string, completed?: boolean }>()

    const todo = todos.find(todo => todo.id === parseInt(id))
    if (!todo) {
        throw new HTTPException(404, { message: 'Todo not found' })
    }

    if (task !== undefined) {
        todo.task = task
    }
    if (completed !== undefined) {
        todo.completed = completed
    }

    return c.json(todo)
};

export const deleteTodo = async (c: Context) => {
    const { id } = c.req.param()
    todos = todos.filter(todo => todo.id !== parseInt(id))
    return c.json({ message: 'Todo deleted' })
};
