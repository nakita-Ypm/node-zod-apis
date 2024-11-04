import { OpenAPIHono } from '@hono/zod-openapi'
import { PostService } from '@packages/service'
import { PostDomain } from '@packages/domain'
import { Post } from '@packages/prisma'
import { routes } from '../openapi'

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
        } catch (e) {
          console.error(e)
          return c.json({ message: 'Internal Server Error' }, 500)
        }
      })
      .openapi(routes['getPostList'], async (c) => {
        try {
          const valid = c.req.valid('query')
          if (!valid) return c.json({ message: 'Bad Request' }, 400)
          const { page, limit } = PostDomain.convertNumberQueryParams(valid)
          if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return c.json({ message: 'Bad Request' }, 400)
          }
          const res: Post[] = await PostService.getPosts(page, limit)
          return c.json(res, 200)
        } catch (e) {
          console.error(e)
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
        } catch (e) {
          console.error(e)
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
        } catch (e) {
          console.error(e)
          return c.json({ message: 'Internal Server Error' }, 500)
        }
      })
  }
}
