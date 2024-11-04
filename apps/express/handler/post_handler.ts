import { OpenAPIHono } from '@hono/zod-openapi'
import { routes } from '../openapi'
import { PostService } from '../service/post_service'
// import { Post } from '@prisma/client'
// import { PostDomain } from '@packages/domain'

export class PostHandler {
  static apply(app: OpenAPIHono) {
    return app
      .openapi(routes['createPost'], async (c) => {
        try {
          const valid = c.req.valid('json')
          if (!valid) return c.json({ message: 'Bad Request' }, 400)
          const req = valid.post
          await PostService.createPost(req)
          return c.json(201)
        } catch {
          return c.json({ message: 'Internal Server Error' }, 500)
        }
      })
      .openapi(routes['getPostList'], async (c) => {
        try {
          const valid = c.req.valid('query')
          if (!valid) return c.json({ message: 'Bad Request' }, 400)
          const { page, limit } = PostDomain.convertNumber(valid)
          if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return c.json({ message: 'Bad Request' }, 400)
          }
          const res: Post[] = await PostService.getPosts(page, limit)
          return c.json(res, 200)
        } catch {
          return c.json({ message: 'Internal Server Error' }, 500)
        }
      })
      .openapi(routes['updatePost'], async (c) => {
        try {
          const param_valid = c.req.valid('param')
          if (!param_valid) return c.json({ message: 'Bad Request' }, 400)
          const id = param_valid.id
          const json_valid = c.req.valid('json')
          if (!json_valid) return c.json({ message: 'Bad Request' }, 400)
          const { post } = json_valid
          await PostService.putPost(id, post)
          return c.json(204)
        } catch {
          return c.json({ message: 'Internal Server Error' }, 500)
        }
      })
      .openapi(routes['deletePost'], async (c) => {
        try {
          const valid = c.req.valid('param')
          if (!valid) return c.json({ message: 'Bad Request' }, 400)
          const id = valid.id
          await PostService.deletePost(id)
          return c.json(204)
        } catch {
          return c.json({ message: 'Internal Server Error' }, 500)
        }
      })
  }
}