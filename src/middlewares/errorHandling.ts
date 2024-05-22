import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const errorHandler = async (err: Error, c: Context): Promise<Response> => {
    if (err instanceof HTTPException) {
        console.log('Http error', err);
        return c.json({
            status: err.status,
            reason: err.cause || 'no cause provided',
            message: err.message || 'no message provided'
        })
    }

    console.error('Unhandled error:', err);
    return c.json({
        status: 500,
        message: 'Internal Server Error'
    });
}

export { errorHandler }