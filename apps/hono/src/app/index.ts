import * as dotenv from 'dotenv'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HonoHandler } from '../handler/hono_handler'
import { PostHandler } from '../handler/post_handler'

dotenv.config()

export class App {
  static init() {
    const app = new Hono()
    const defaultPort = 3001
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : defaultPort
    console.log(`Server is running on http://localhost:${port}`)
    serve({
      fetch: app.fetch,
      port,
    })
    app.use('*', logger())
    app.use('*', async (c, next) => {
      console.log(`  ::: ${c.req.method} ${c.req.url}`)
      await next()
    })
    return this.applyRoutes(app)
  }

  static applyRoutes(app: Hono) {
    return app.route('/', HonoHandler.apply(app)).route('/post', PostHandler.apply(app))
  }
}
