import { OpenAPIHono } from '@hono/zod-openapi'
import { routes } from '../openapi/index.ts'

export class OpenAPIHonoHandler {
  static apply(app: OpenAPIHono) {
    return app.openapi(routes['Hono'], async (c) => {
      return c.json({ message: 'Hono🔥' })
    })
  }
}
