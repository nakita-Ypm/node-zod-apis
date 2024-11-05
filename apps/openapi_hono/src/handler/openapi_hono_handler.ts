import { OpenAPIHono } from '@hono/zod-openapi'
import { honoRoutes } from '../openapi'

export class OpenAPIHonoHandler {
  static apply(app: OpenAPIHono) {
    return app.openapi(honoRoutes['Hono'], async (c) => {
      return c.json({ message: 'OpenAPIHono🔥' })
    })
  }
}
