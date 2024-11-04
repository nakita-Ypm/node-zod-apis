import { serve } from '@hono/node-server'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

export const honoSchema = z.object({
  message: z.string().openapi({
    example: 'Hono🔥',
  }),
})

const route = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: honoSchema,
        },
      },
      description: 'Hono🔥',
    },
  },
})

const app = new OpenAPIHono()

app.openapi(route, (c) => {
  return c.json({ message: 'Hono🔥' })
})

app.get('/ui', swaggerUI({ url: '/doc' }))

app.doc('/doc', {
  info: {
    title: 'Hono API',
    version: 'v1',
  },
  openapi: '3.1.0',
})

const port = 3003
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
