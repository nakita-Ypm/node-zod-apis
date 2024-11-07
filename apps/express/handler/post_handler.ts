import express from 'express'
import { postSchema } from '@packages/schemas'
import { PostService } from '@packages/service'

export class PostHandler {
  static apply(app: express.Application) {
    app.post('/posts', this.createPost.bind(this))
    // app.get('/post', this.getPostList)
    // app.put('/post/:id', this.updatePost)
    // app.delete('/post/:id', this.deletePost)
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
      return res.status(201).send('201')
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

// this.createPost.bind(this)
