import { createRoute, z } from '@hono/zod-openapi'

export const honoSchema = z.object({
  message: z.string().openapi({
    example: 'Hono🔥',
  }),
})

export const honoRoutes = {
  Hono: createRoute({
    tags: ['Hono'],
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Hono🔥',
        content: {
          'application/json': {
            schema: honoSchema,
          },
        },
      },
    },
  }),
}
