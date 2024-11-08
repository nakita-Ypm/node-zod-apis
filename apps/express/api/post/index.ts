import { makeApi } from '@zodios/core'
import { z } from 'zod'
import { postSchema } from '@packages/schemas'

const generateResponseSchema = (statusCode: number, description: string) => {
  return z.object({
    [statusCode]: z.object({
      description: z.literal(description),
      content: z.object({
        'application/json': z.object({
          schema: z.object({
            message: z.string(),
          }),
        }),
      }),
    }),
  })
}

// 201 Created
const createdResponseSchema = z.object({
  201: z.object({
    description: z.literal('Created'),
  }),
})

// 204 No Content
const noContentResponseSchema = z.object({
  204: z.object({
    description: z.literal('No Content'),
  }),
})

// 400 Bad Request
const badRequestResponseSchema = generateResponseSchema(400, 'Bad Request')

// 500 Internal Server Error
const internalServerErrorResponseSchema = generateResponseSchema(500, 'Internal Server Error')

export const createPost = makeApi([
  // createPost
  {
    method: 'post',
    path: '/posts',
    alias: 'createPost',
    description: 'create a new post',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        required: true,
        content: 'application/json',
        schema: postSchema.pick({
          post: true,
        }),
      },
    ],
    response: createdResponseSchema,
    errorResponse: [badRequestResponseSchema, internalServerErrorResponseSchema],
  },
])

export const getPostList = makeApi([
  {
    method: 'get',
    path: '/posts',
    alias: 'getPostList',
    description: 'get PostList posts with optional pagination',
    parameters: [
      {
        name: 'query',
        type: 'Query',
        required: false,
        schema: z.object({
          page: z.string(),
          rows: z.string(),
        }),
      },
    ],
    response: z.object({
      200: z.object({
        content: z.object({
          'application/json': z.object({
            schema: z.array(postSchema),
          }),
        }),
      }),
    }),
    errorResponse: [badRequestResponseSchema, internalServerErrorResponseSchema],
  },
])

// updatePost
export const updatePost = makeApi([
  {
    method: 'put',
    path: '/posts/:id',
    alias: 'updatePost',
    description: 'Update Post',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        required: true,
        schema: z.object({
          id: z.string().uuid(),
        }),
      },
      {
        name: 'body',
        type: 'Body',
        required: true,
        content: 'application/json',
        schema: postSchema.pick({
          post: true,
        }),
      },
    ],
    response: noContentResponseSchema,
    errorResponse: [badRequestResponseSchema, internalServerErrorResponseSchema],
  },
])

// deletePost
export const deletePost = makeApi([
  {
    method: 'delete',
    path: '/posts/:id',
    alias: 'deletePost',
    description: 'delete post',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        required: true,
        schema: z.string().uuid(),
      },
    ],
    response: noContentResponseSchema,
    errorResponse: [badRequestResponseSchema, internalServerErrorResponseSchema],
  },
])
