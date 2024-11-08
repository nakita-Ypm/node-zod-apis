import { createRoute, z } from '@hono/zod-openapi'
import { postSchema } from '@packages/schemas'

// 201 Created
const createdResponse = {
  201: {
    description: 'Created',
  },
}

// 204 No Content
const noContentResponse = {
  204: {
    description: 'No Content',
  },
}

// 400 Bad Request
const badRequestResponse = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: z.object({
          message: z.string().openapi({
            example: 'Bad Request',
          }),
        }),
      },
    },
  },
}

// 500 Internal Server Error
const internalServerErrorResponse = {
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: z.object({
          message: z.string().openapi({
            example: 'Internal Server Error',
          }),
        }),
      },
    },
  },
}

export const postRoutes = {
  // createPost
  createPost: createRoute({
    tags: ['Post'],
    method: 'post',
    path: '/posts',
    description: 'create a new post',
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: postSchema.pick({
              post: true,
            }),
          },
        },
      },
    },
    responses: {
      ...createdResponse,
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
  // getPostList
  getPostList: createRoute({
    tags: ['Post'],
    method: 'get',
    path: '/posts',
    description: 'get PostList posts with optional pagination',
    request: {
      query: z.object({
        page: z.string(),
        rows: z.string(),
      }),
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: z.array(postSchema),
          },
        },
      },
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
  // updatePost
  updatePost: createRoute({
    tags: ['Post'],
    method: 'put',
    path: '/posts/{id}',
    description: 'update Post',
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
      body: {
        required: true,
        content: {
          'application/json': {
            schema: postSchema.pick({ post: true }),
          },
        },
      },
    },
    responses: {
      ...noContentResponse,
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
  // deletePost
  deletePost: createRoute({
    tags: ['Post'],
    method: 'delete',
    path: '/posts/{id}',
    description: 'delete post',
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      ...noContentResponse,
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
}
