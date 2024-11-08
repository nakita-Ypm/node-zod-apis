import express from 'express'
import { zodiosApp } from '@zodios/express'
import { expressApi, postApi } from './api'
import { Zodios } from '@zodios/core'
import { postSchema } from '@packages/schemas'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { Post } from '@packages/prisma'
import { PostService } from '@packages/service'
import { PostDomain } from '@packages/domain'
import { z } from 'zod'

const app = zodiosApp()
const port = 3004
const expressRouter = zodiosApp(expressApi)

app.use(expressRouter)
app.get('/', (req, res) => {
  res.json({ message: 'Express' })
})

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

const wrap = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next)
  }
}

app.post(
  '/posts',
  wrap(async (req: express.Request, res: express.Response) => {
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
  }),
)

app.get(
    '/posts',
    wrap(async (req: express.Request, res: express.Response) => {
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
    })
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

const apiClient = new Zodios('http://localhost:3004', expressApi)
const postApiClient = new Zodios('http://localhost:3004', postApi)

const expressRes = await apiClient.express()
console.log(expressRes)

const createPostRes = await postApiClient.createPost({
  post: 'Express Zodios',
})
console.log(createPostRes)
