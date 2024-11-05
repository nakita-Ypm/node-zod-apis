import { zValidator } from '@hono/zod-validator'
import { postSchema } from '@packages/schemas'
import { Hono } from 'hono'
import { z } from 'zod'
import { PostDomain } from '@packages/domain'
import { PostService } from '@packages/service'
import { Post } from '@packages/prisma'

export class PostHandler {
  static apply(app: Hono) {
    return app
      .post(
        '/posts',
        zValidator(
          'json',
          postSchema.pick({
            post: true,
          }),
        ),
        async (c) => {
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
        },
      )
      .get(
        '/posts',
        zValidator(
          'query',
          z.object({
            page: z.string(),
            rows: z.string(),
          }),
        ),
        async (c) => {
          try {
            const valid = c.req.valid('query')
            if (!valid) return c.json({ message: 'Bad Request' }, 400)
            const { page, rows } = PostDomain.convertNumberQueryParams(valid)
            if (isNaN(page) || isNaN(rows) || page < 1 || rows < 1) {
              return c.json({ message: 'Bad Request' }, 400)
            }
            const limit = rows
            const offset = (page - 1) * rows
            const res: Post[] = await PostService.getPosts(limit, offset)
            return c.json(res, 200)
          } catch (e) {
            console.error(e)
            return c.json({ message: 'Internal Server Error' }, 500)
          }
        },
      )
      .put(
        '/post/:id',
        zValidator('param', z.object({ id: z.string().uuid() })),
        zValidator('json', postSchema.pick({ post: true })),
        async (c) => {
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
        },
      )
      .delete(
        '/posts/:id',
        zValidator(
          'param',
          z.object({
            id: z.string().uuid(),
          }),
        ),
        async (c) => {
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
        },
      )
  }
}
