import { Hono } from 'hono'
import { errorHandler } from './middlewares'
import {router} from './routes'

const app = new Hono()
app.route('/', router)
app.onError(errorHandler)

export default app
