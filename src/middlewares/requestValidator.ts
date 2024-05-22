import { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"

const taskValidationMiddleware = async (c: Context, next: Next): Promise<void | HTTPException> => {
    const { task } = await c.req.json<{ task: string }>()
    if (!task || typeof task !== 'string' || task.trim() === '') {
        throw new HTTPException(400, { message: "Provide proper task" })
    }
    await next()
}

export { taskValidationMiddleware }