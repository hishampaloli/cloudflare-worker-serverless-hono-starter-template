import { Context, Next } from "hono";
import { env } from "hono/adapter";

const authMiddleware = async (c: Context, next: Next): Promise<void | Response> => {
    const { AUTH_TOKEN } = env<{ AUTH_TOKEN: string }>(c)
    if (c.req.header('hisham') === (AUTH_TOKEN || '123')) {
        await next();
        console.log('AUTH PASSED');
    } else {
        return c.json({ error: 'You are not authorised' }, 401);
    }
};

export { authMiddleware };
