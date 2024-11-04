import type { Hono } from 'hono'

export class HonoHandler {
  static apply(app: Hono) {
    return app.get('/', (c) => {
      return c.json({ message: 'Hono🔥' })
    })
  }
}
