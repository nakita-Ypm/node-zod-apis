import express from 'express'
import { z } from 'zod'
import { postSchema } from '@packages/schemas'
import { PostService } from '@packages/service'
import { PostDomain } from '@packages/domain'
import { Post } from '@packages/prisma'

export class PostHandler {
  static apply(app: express.Application) {
    app.post('/posts', this.createPost.bind(this))
    app.get('/posts', this.getPostList.bind(this))
    app.put('/posts/:id', this.updatePost.bind(this))
    app.delete('/posts/:id', this.deletePost.bind(this))
  }

  static async createPost(req: express.Request, res: express.Response) {
    try {
      const body: { post: string } = req.body
      const valid = postSchema
        .pick({
          post: true,
        })
        .safeParse(body)
      if (!valid.success) return res.status(400).json({ message: 'Bad Request' })
      const post = valid.data.post
      await PostService.createPost(post)
      return res.sendStatus(201)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async getPostList(req: express.Request, res: express.Response) {
    try {
      const valid = z
        .object({
          page: z.string(),
          rows: z.string(),
        })
        .safeParse(req.query)
      if (!valid.success) return res.status(400).json({ message: 'Bad Request' })
      const { page, rows } = PostDomain.convertNumberQueryParams(valid.data)
      if (isNaN(page) || isNaN(rows) || page < 1 || rows < 1) {
        return res.status(400).json({ message: 'Bad Request' })
      }
      const limit = rows
      const offset = (page - 1) * rows
      const res_post: Post[] = await PostService.getPosts(limit, offset)
      return res.status(200).json(res_post)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async updatePost(req: express.Request, res: express.Response) {
    try {
      const param_valid = z.object({ id: z.string().uuid() }).safeParse(req.params)
      if (!param_valid.success) return res.status(400).json({ message: 'Bad Request' })
      const id = param_valid.data.id
      const body: { post: string } = req.body
      const valid = postSchema
        .pick({
          post: true,
        })
        .safeParse(body)
      if (!valid.success) return res.status(400).json({ message: 'Bad Request' })
      const post = valid.data.post
      await PostService.putPost(id, post)
      return res.sendStatus(204)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async deletePost(req: express.Request, res: express.Response) {
    try {
      const valid = z.object({ id: z.string().uuid() }).safeParse(req.params)
      if (!valid.success) return res.status(400).json({ message: 'Bad Request' })
      const id = valid.data.id
      await PostService.deletePost(id)
      return res.sendStatus(204)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
