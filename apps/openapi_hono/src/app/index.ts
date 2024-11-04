import * as dotenv from 'dotenv'
import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { OpenAPIHonoHandler } from '../handler/openapi_hono.ts'
import { serve } from '@hono/node-server'

dotenv.config()

export class App {
  static init() {
    const app = new OpenAPIHono()
    app.use('*', logger())
    app.use('*', (c, next) => {
      console.log(`  ::: ${c.req.method} ${c.req.url}`)
      return next()
    })
    const defaultPort = 3002
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : defaultPort
    console.log(`Server is running on http://localhost:${port}`)
    serve({
      fetch: app.fetch,
      port,
    })

    return this.applyRoutes(app)
  }

  static applyRoutes(app: OpenAPIHono) {
    return app.route('/', OpenAPIHonoHandler.apply(app))
  }
}
